import * as vscode from "vscode";

interface Module {
  id: number;
  title: string;
  filename: string;
  topics: string[];
  week: string;
}

const MODULES: Module[] = [
  {
    id: 1,
    title: "Fundamentos",
    filename: "01-fundamentos.md",
    topics: ["Sistemas", "Software", "Ciclo de vida", "Seudocódigo"],
    week: "1",
  },
  {
    id: 2,
    title: "Variables y expresiones",
    filename: "02-variables-y-expresiones.md",
    topics: ["Variables", "Corrida a mano", "Expresiones"],
    week: "2",
  },
  {
    id: 3,
    title: "TypeScript básico",
    filename: "03-typescript-basico.md",
    topics: ["Tipos", "Conversiones", "Operadores", "Control"],
    week: "3",
  },
  {
    id: 4,
    title: "Clases y objetos",
    filename: "04-clases-y-objetos.md",
    topics: ["POO", "UML", "Constructores", "Getters/Setters"],
    week: "4-5",
  },
  {
    id: 5,
    title: "Asociación y switch",
    filename: "05-asociacion-y-switch.md",
    topics: ["Relaciones", "Switch", "Ejemplos"],
    week: "6-7",
  },
  {
    id: 6,
    title: "Herencia y polimorfismo",
    filename: "06-herencia-y-polimorfismo.md",
    topics: ["Herencia", "Upcast", "Clases abstractas"],
    week: "8-9",
  },
  {
    id: 7,
    title: "Colecciones",
    filename: "07-colecciones.md",
    topics: ["Listas", "Agregación", "Caso Banco"],
    week: "9-10",
  },
  {
    id: 8,
    title: "Arrays",
    filename: "08-arrays.md",
    topics: ["Arrays", "Recorridas", "Entrada"],
    week: "11",
  },
  {
    id: 9,
    title: "Caso integrador",
    filename: "09-caso-integrador.md",
    topics: ["Excepciones", "Búsqueda", "Ordenación", "Interfaces"],
    week: "12",
  },
  {
    id: 10,
    title: "Mapas y orden avanzado",
    filename: "10-mapas-y-orden.md",
    topics: ["Orden avanzado", "Map", "null/undefined"],
    week: "13",
  },
  {
    id: 11,
    title: "Ejercicios integradores",
    filename: "11-ejercicios-integradores.md",
    topics: ["Casos completos", "Soluciones"],
    week: "14-15",
  },
];

export class ModuleTreeProvider
  implements vscode.TreeDataProvider<ModuleItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    ModuleItem | undefined | null | void
  > = new vscode.EventEmitter<ModuleItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    ModuleItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  constructor(private context: vscode.ExtensionContext) {}

  getTreeItem(element: ModuleItem): vscode.TreeItem {
    return element;
  }

  getChildren(
    element?: ModuleItem
  ): Thenable<ModuleItem[]> {
    if (!element) {
      // Root level: return modules
      return Promise.resolve(
        MODULES.map(
          (m) =>
            new ModuleItem(
              m.title,
              m.filename,
              vscode.TreeItemCollapsibleState.Collapsed,
              m.week,
              "module"
            )
        )
      );
    }

    // Child level: return topics for the module
    const module = MODULES.find((m) => m.filename === element.filePath);
    if (module) {
      return Promise.resolve(
        module.topics.map(
          (topic) =>
            new ModuleItem(
              topic,
              module.filename,
              vscode.TreeItemCollapsibleState.None,
              "",
              "topic"
            )
        )
      );
    }

    return Promise.resolve([]);
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class ModuleItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly filePath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly week: string,
    public readonly type: "module" | "topic"
  ) {
    super(label, collapsibleState);

    if (type === "module") {
      this.description = `Week ${week}`;
      this.tooltip = `${label} (${filePath})`;
      this.iconPath = new vscode.ThemeIcon("book");
      this.command = {
        command: "programacion-ts.openModule",
        title: "Open Module",
        arguments: [filePath],
      };
    } else {
      this.iconPath = new vscode.ThemeIcon("circle-outline");
      this.description = label;
    }

    this.contextValue = type;
  }
}
