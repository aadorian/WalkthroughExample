export class EventEmitter<T> {
  private listeners: ((e: T) => any)[] = [];

  get event() {
    return (listener: (e: T) => any) => {
      this.listeners.push(listener);
      return { dispose: () => {} };
    };
  }

  fire(data: T) {
    this.listeners.forEach(listener => listener(data));
  }
}

export enum TreeItemCollapsibleState {
  Collapsed = 1,
  Expanded = 2,
  None = 0,
}

export class TreeItem {
  label?: string;
  description?: string;
  tooltip?: string;
  iconPath?: ThemeIcon;
  command?: any;
  collapsibleState?: TreeItemCollapsibleState;
  contextValue?: string;

  constructor(label: string, collapsibleState: TreeItemCollapsibleState = TreeItemCollapsibleState.None) {
    this.label = label;
    this.collapsibleState = collapsibleState;
  }
}

export class ThemeIcon {
  constructor(public id: string) {}
}

export interface TreeDataProvider<T> {
  onDidChangeTreeData?: any;
  getTreeItem(element: T): TreeItem | Thenable<TreeItem>;
  getChildren(element?: T): any[] | Thenable<any[]>;
}

export const Uri = {
  joinPath: (base: any, ...pathSegments: string[]) => {
    const paths = [base.fsPath, ...pathSegments].join('/');
    return {
      fsPath: paths,
    };
  },
  file: (path: string) => ({
    fsPath: path,
  }),
};

export const window = {
  registerTreeDataProvider: jest.fn(),
  createTerminal: jest.fn(() => ({
    show: jest.fn(),
    sendText: jest.fn(),
    dispose: jest.fn(),
  })),
  showInformationMessage: jest.fn(),
  activeTerminal: null,
};

export const commands = {
  registerCommand: jest.fn((cmd, callback) => ({
    dispose: jest.fn(),
  })),
  executeCommand: jest.fn(),
};

export const workspace = {
  openTextDocument: jest.fn(),
  workspaceFolders: [{ uri: { fsPath: '/workspace' } }],
};
