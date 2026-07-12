import * as vscode from 'vscode';
import { activate, deactivate } from '../extension';

describe('Extension', () => {
  let mockContext: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContext = {
      globalState: {
        get: jest.fn(() => false),
        update: jest.fn(),
      },
      subscriptions: {
        push: jest.fn(),
      },
      extensionUri: { fsPath: '/test' },
    };
  });

  describe('activate', () => {
    it('should activate without errors', () => {
      expect(() => {
        activate(mockContext);
      }).not.toThrow();
    });

    it('should register tree data provider', () => {
      activate(mockContext);
      expect(vscode.window.registerTreeDataProvider).toHaveBeenCalledWith(
        'programacionTsExplorer',
        expect.any(Object)
      );
    });

    it('should register commands', () => {
      activate(mockContext);
      expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        'programacion-ts.openPlayground',
        expect.any(Function)
      );
      expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        'programacion-ts.startWalkthrough',
        expect.any(Function)
      );
      expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        'programacion-ts.runExample',
        expect.any(Function)
      );
      expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        'programacion-ts.openModule',
        expect.any(Function)
      );
    });

    it('should push subscriptions to context', () => {
      activate(mockContext);
      expect(mockContext.subscriptions.push).toHaveBeenCalled();
    });

    it('should show welcome message on first activation', () => {
      activate(mockContext);
      expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        expect.stringContaining('Welcome'),
        expect.any(String)
      );
    });

    it('should not show welcome message on subsequent activations', () => {
      mockContext.globalState.get.mockReturnValue(true);
      jest.clearAllMocks();

      activate(mockContext);
      expect(vscode.window.showInformationMessage).not.toHaveBeenCalled();
    });

    it('should update globalState when showing welcome message', () => {
      activate(mockContext);
      expect(mockContext.globalState.update).toHaveBeenCalledWith(
        'programacion-ts.welcomeShown',
        true
      );
    });
  });

  describe('command callbacks', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('openPlayground command should be registered', () => {
      activate(mockContext);
      const calls = (vscode.commands.registerCommand as jest.Mock).mock.calls;
      const playgroundCommand = calls.find((c) => c[0] === 'programacion-ts.openPlayground');
      expect(playgroundCommand).toBeDefined();
    });

    it('startWalkthrough command should execute correct command', () => {
      activate(mockContext);
      const calls = (vscode.commands.registerCommand as jest.Mock).mock.calls;
      const walkthroughCommand = calls.find((c) => c[0] === 'programacion-ts.startWalkthrough');

      if (walkthroughCommand) {
        walkthroughCommand[1](); // Execute callback
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith(
          'workbench.action.openWalkthrough',
          expect.stringContaining('programacion-ts')
        );
      }
    });

    it('runExample command should create terminal and send text', () => {
      activate(mockContext);
      const calls = (vscode.commands.registerCommand as jest.Mock).mock.calls;
      const runCommand = calls.find((c) => c[0] === 'programacion-ts.runExample');

      if (runCommand) {
        runCommand[1]('example.ts'); // Execute callback with example
        const terminal = (vscode.window.createTerminal as jest.Mock).mock.results[0]?.value;
        expect(terminal?.sendText).toHaveBeenCalledWith('tsx example.ts');
      }
    });
  });

  describe('deactivate', () => {
    it('should deactivate without errors', () => {
      expect(() => {
        deactivate();
      }).not.toThrow();
    });
  });
});
