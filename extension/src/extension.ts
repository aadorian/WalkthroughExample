import * as vscode from "vscode";
import { PlaygroundPanel } from "./playgroundPanel";
import { ModuleTreeProvider } from "./moduleTreeProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log("TypeScript Programming extension is now active");

  // Create the tree provider for modules
  const moduleTreeProvider = new ModuleTreeProvider(context);
  vscode.window.registerTreeDataProvider(
    "programacionTsExplorer",
    moduleTreeProvider
  );

  // Command: Open Playground
  const openPlaygroundCommand = vscode.commands.registerCommand(
    "programacion-ts.openPlayground",
    () => {
      PlaygroundPanel.createOrShow(context.extensionUri);
    }
  );

  // Command: Start Walkthrough
  const startWalkthroughCommand = vscode.commands.registerCommand(
    "programacion-ts.startWalkthrough",
    () => {
      vscode.commands.executeCommand(
        "workbench.action.openWalkthrough",
        "ort-edu.programacion-ts-playground#programacion-ts.getting-started"
      );
    }
  );

  // Command: Run Example
  const runExampleCommand = vscode.commands.registerCommand(
    "programacion-ts.runExample",
    async (example?: string) => {
      const terminal =
        vscode.window.activeTerminal ||
        vscode.window.createTerminal("TypeScript Playground");
      terminal.show();

      if (example) {
        terminal.sendText(`tsx ${example}`);
      } else {
        terminal.sendText("tsx example.ts");
      }
    }
  );

  // Command: Open Module
  const openModuleCommand = vscode.commands.registerCommand(
    "programacion-ts.openModule",
    async (modulePath?: string) => {
      if (modulePath) {
        const doc = await vscode.workspace.openTextDocument(modulePath);
        await vscode.window.showTextDocument(doc);
      }
    }
  );

  context.subscriptions.push(
    openPlaygroundCommand,
    startWalkthroughCommand,
    runExampleCommand,
    openModuleCommand
  );

  // Show welcome message on first activation
  const hasShown = context.globalState.get(
    "programacion-ts.welcomeShown"
  );
  if (!hasShown) {
    context.globalState.update("programacion-ts.welcomeShown", true);
    vscode.window.showInformationMessage(
      "Welcome to TypeScript Programming! Start the learning guide to begin.",
      "Start Learning"
    );
  }
}

export function deactivate() {
  console.log("TypeScript Programming extension is now deactivated");
}
