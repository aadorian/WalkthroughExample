import * as vscode from 'vscode';

// Create mocks before importing PlaygroundPanel
const mockCreateWebviewPanel = jest.fn();
const mockAsWebviewUri = jest.fn((uri: any) => {
  // Return an object that converts to string with the expected path
  const path = uri.fsPath || '';
  let filename = 'unknown';
  if (path.includes('playground.js')) {
    filename = 'playground.js';
  } else if (path.includes('playground.css')) {
    filename = 'playground.css';
  }
  return {
    toString() {
      return `vscode-webview://xyz/${filename}`;
    },
  };
});

jest.mock('vscode', () => ({
  ViewColumn: {
    One: 1,
    Two: 2,
  },
  window: {
    activeTextEditor: null,
    createWebviewPanel: mockCreateWebviewPanel,
    createTerminal: jest.fn(() => ({
      show: jest.fn(),
      sendText: jest.fn(),
    })),
  },
  Uri: {
    joinPath: jest.fn((base: any, ...paths: string[]) => ({
      fsPath: `/test/${paths.join('/')}`,
    })),
  },
}));

import { PlaygroundPanel } from '../playgroundPanel';

describe('PlaygroundPanel', () => {
  let mockPanel: any;
  let mockExtensionUri: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a new mock panel for each test
    mockPanel = {
      webview: {
        asWebviewUri: mockAsWebviewUri,
        html: '',
        onDidReceiveMessage: jest.fn((callback) => {
          return { dispose: jest.fn() };
        }),
      },
      onDidDispose: jest.fn((callback) => {
        return { dispose: jest.fn() };
      }),
      reveal: jest.fn(),
      dispose: jest.fn(),
    };

    mockExtensionUri = { fsPath: '/test/extension' };
    mockCreateWebviewPanel.mockReturnValue(mockPanel);

    // Reset the static currentPanel
    (PlaygroundPanel as any).currentPanel = undefined;
  });

  describe('createOrShow', () => {
    it('should create a webview panel when none exists', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockCreateWebviewPanel).toHaveBeenCalled();
    });

    it('should pass correct view type to createWebviewPanel', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);

      const args = mockCreateWebviewPanel.mock.calls[0];
      expect(args[0]).toBe('playgroundPanel');
    });

    it('should pass correct title to createWebviewPanel', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);

      const args = mockCreateWebviewPanel.mock.calls[0];
      expect(args[1]).toBe('TypeScript Playground');
    });

    it('should set enableScripts to true in options', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);

      const args = mockCreateWebviewPanel.mock.calls[0];
      const options = args[3];
      expect(options.enableScripts).toBe(true);
    });

    it('should set retainContextWhenHidden to true', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);

      const args = mockCreateWebviewPanel.mock.calls[0];
      const options = args[3];
      expect(options.retainContextWhenHidden).toBe(true);
    });

    it('should provide localResourceRoots', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);

      const args = mockCreateWebviewPanel.mock.calls[0];
      const options = args[3];
      expect(options.localResourceRoots).toBeDefined();
      expect(Array.isArray(options.localResourceRoots)).toBe(true);
      expect(options.localResourceRoots.length).toBe(2);
    });

    it('should set currentPanel after creation', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect((PlaygroundPanel as any).currentPanel).toBeDefined();
    });

    it('should attach onDidDispose listener', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.onDidDispose).toHaveBeenCalled();
    });

    it('should attach onDidReceiveMessage listener', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.webview.onDidReceiveMessage).toHaveBeenCalled();
    });

    it('should generate HTML for the webview', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.webview.html.length).toBeGreaterThan(0);
    });
  });

  describe('HTML generation', () => {
    it('should contain DOCTYPE', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.webview.html).toContain('<!DOCTYPE html>');
    });

    it('should contain proper HTML structure', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      const html = mockPanel.webview.html;
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
      expect(html).toContain('<head>');
      expect(html).toContain('</head>');
      expect(html).toContain('<body>');
      expect(html).toContain('</body>');
    });

    it('should reference CSS file', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.webview.html).toContain('playground.css');
    });

    it('should reference JS file', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.webview.html).toContain('playground.js');
    });

    it('should include playground title', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.webview.html).toContain('TypeScript Programming Playground');
    });

    it('should include example buttons', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      const html = mockPanel.webview.html;
      expect(html).toContain('example-btn');
      expect(html).toContain('data-example');
    });

    it('should include code editor', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      expect(mockPanel.webview.html).toContain('codeEditor');
      expect(mockPanel.webview.html).toContain('textarea');
    });
  });

  describe('state management', () => {
    it('should reveal existing panel instead of creating new one', () => {
      PlaygroundPanel.createOrShow(mockExtensionUri);
      jest.clearAllMocks();
      mockCreateWebviewPanel.mockReturnValue(mockPanel);

      PlaygroundPanel.createOrShow(mockExtensionUri);

      expect(mockCreateWebviewPanel).not.toHaveBeenCalled();
      expect(mockPanel.reveal).toHaveBeenCalled();
    });
  });
});
