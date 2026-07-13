import * as vscode from "vscode";
import * as path from "path";
import { ModuleTreeProvider } from "./moduleTreeProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log("TypeScript Programming extension is now active");

  // Create the tree provider for modules
  const moduleTreeProvider = new ModuleTreeProvider(context);
  vscode.window.registerTreeDataProvider(
    "programacionTsExplorer",
    moduleTreeProvider
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
  // Accepts either a bundled module filename (e.g. "01-fundamentos.md")
  // or an absolute path; bundled names resolve inside the extension.
  const openModuleCommand = vscode.commands.registerCommand(
    "programacion-ts.openModule",
    async (modulePath?: string) => {
      if (!modulePath) {
        return;
      }
      const uri = path.isAbsolute(modulePath)
        ? vscode.Uri.file(modulePath)
        : vscode.Uri.joinPath(context.extensionUri, "modules", modulePath);
      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc);
    }
  );

  context.subscriptions.push(
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
    Promise.resolve(
      vscode.window.showInformationMessage(
        "Welcome to TypeScript Programming! Start the learning guide to begin.",
        "Start Learning"
      )
    ).then((selection) => {
      if (selection === "Start Learning") {
        vscode.commands.executeCommand("programacion-ts.startWalkthrough");
      }
    });
  }
}

export function deactivate() {
  console.log("TypeScript Programming extension is now deactivated");
}
