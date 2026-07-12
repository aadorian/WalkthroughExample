import * as vscode from 'vscode';
import { ModuleTreeProvider } from '../moduleTreeProvider';

describe('ModuleTreeProvider', () => {
  let provider: ModuleTreeProvider;
  let mockContext: any;

  beforeEach(() => {
    mockContext = {
      globalState: {
        get: jest.fn(),
        update: jest.fn(),
      },
    };
    provider = new ModuleTreeProvider(mockContext);
  });

  describe('initialization', () => {
    it('should initialize with a context', () => {
      expect(provider).toBeDefined();
    });

    it('should have onDidChangeTreeData event', () => {
      expect(provider.onDidChangeTreeData).toBeDefined();
    });
  });

  describe('getTreeItem', () => {
    it('should return a tree item', () => {
      const mockItem = {
        label: 'Test Module',
        collapsibleState: 0,
        description: 'Week 1',
      };
      const result = provider.getTreeItem(mockItem as any);
      expect(result).toEqual(mockItem);
    });
  });

  describe('getChildren', () => {
    it('should return all modules when no element is provided', async () => {
      const children = await provider.getChildren();
      expect(children).toBeDefined();
      expect(Array.isArray(children)).toBe(true);
      expect(children.length).toBe(11); // 11 course modules
    });

    it('should return modules with correct properties', async () => {
      const children = await provider.getChildren();
      const firstModule = children[0];

      expect(firstModule.label).toContain('Fundamentos');
      expect(firstModule.description).toContain('1');
    });

    it('should return topics for a given module', async () => {
      const children = await provider.getChildren();
      const moduleItem = children[0];

      const topics = await provider.getChildren(moduleItem as any);
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should return empty array for non-existent modules', async () => {
      const mockItem = {
        filePath: 'non-existent.md',
        label: 'Non-existent',
        collapsibleState: 0,
      };

      const children = await provider.getChildren(mockItem as any);
      expect(children).toEqual([]);
    });
  });

  describe('refresh', () => {
    it('should call _onDidChangeTreeData.fire when refresh is called', () => {
      const fireSpy = jest.fn();
      (provider as any)._onDidChangeTreeData = {
        fire: fireSpy,
      };

      provider.refresh();
      expect(fireSpy).toHaveBeenCalled();
    });
  });

  describe('module data', () => {
    it('should have 11 modules representing 15 weeks of content', async () => {
      const modules = await provider.getChildren();
      expect(modules.length).toBe(11);
    });

    it('should have correct week assignments for modules', async () => {
      const modules = await provider.getChildren();

      expect(modules[0].description).toContain('1');      // Week 1
      expect(modules[3].description).toContain('4-5');    // Weeks 4-5
      expect(modules[10].description).toContain('14-15'); // Weeks 14-15
    });

    it('should have topics for each module', async () => {
      const modules = await provider.getChildren();

      for (const module of modules) {
        const topics = await provider.getChildren(module as any);
        expect(topics.length).toBeGreaterThan(0);
      }
    });
  });
});
