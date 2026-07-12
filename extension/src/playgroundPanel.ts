import * as vscode from "vscode";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export class PlaygroundPanel {
  public static currentPanel: PlaygroundPanel | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (PlaygroundPanel.currentPanel) {
      PlaygroundPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      "playgroundPanel",
      "TypeScript Playground",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "webview-ui"),
        ],
      }
    );

    PlaygroundPanel.currentPanel = new PlaygroundPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    PlaygroundPanel.currentPanel = new PlaygroundPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // this happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "alert":
            vscode.window.showInformationMessage(message.text);
            return;
      case "runCode":
        this._runTypeScriptCode(message.code);
        return;
      case "executeCode":
        const output = await this._executeCodeAndGetOutput(message.code);
        this._panel.webview.postMessage({
          command: "outputResult",
          text: output
        });
        return;
    }
      },
      null,
      this._disposables
    );
  }

  private async _executeCodeAndGetOutput(code: string): Promise<string> {
    const file = path.join(os.tmpdir(), "programacion-ts-playground.ts");
    fs.writeFileSync(file, code, "utf8");
    
    try {
      const result = await this._runCodeInTerminal(file);
      const cleanCode = code.replace(/`/g, "\\``").replace(/\\/g, "\\\\");
      return ````tsx\n${cleanCode}\n````\n\n**Output:**\n\n${result}`;
    } catch (error: any) {
      return ````tsx\n${code}\n````\n\n**Error:**\n\n${error.message}`;
    }
  }

  private async _runCodeInTerminal(filePath: string): Promise<string> {
    const terminal =
      vscode.window.activeTerminal ||
      vscode.window.createTerminal("TypeScript Playground");
    terminal.show();
    terminal.sendText(`tsx "${filePath}");
    
    // Wait for execution to complete and capture output
    await this._waitForTerminalOutput();
    return ""; // TODO: Capture actual output from terminal
  }

  private async _waitForTerminalOutput(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  public dispose() {
    PlaygroundPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "webview-ui", "playground.js")
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "webview-ui", "playground.css")
    );

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="${styleUri}" rel="stylesheet">
  <title>TypeScript Playground</title>
</head>
<body>
  <div class="container">
    <h1>TypeScript Programming Playground</h1>
    <p>Welcome to the interactive TypeScript playground. Write and execute TypeScript code here.</p>

    <div class="playground-section">
      <h2>Quick Start Examples</h2>
      <div class="examples">
        <button class="example-btn" data-example="hola">Hello World</button>
        <button class="example-btn" data-example="variables">Variables & Types</button>
        <button class="example-btn" data-example="classes">Classes & Objects</button>
        <button class="example-btn" data-example="arrays">Arrays & Collections</button>
      </div>
    </div>

    <div class="editor-section">
      <div class="editor-header">
        <h3>Code Editor</h3>
        <button id="runBtn" class="run-btn">▶ Run Code</button>
      </div>
      <textarea id="codeEditor" class="code-editor" placeholder="Write your TypeScript code here...">// Example: Hello World
console.log("Hello, TypeScript!");
</textarea>
    </div>

    <div class="output-section">
      <h3>Output</h3>
      <div id="output" class="output"></div>
    </div>

    <div class="guide-section">
      <h3>Learning Path</h3>
      <ol>
        <li><strong>Fundamentos:</strong> Understand programming basics and design</li>
        <li><strong>Variables:</strong> Learn types, variables, and expressions</li>
        <li><strong>TypeScript:</strong> Master the syntax and type system</li>
        <li><strong>OOP:</strong> Classes, objects, and encapsulation</li>
        <li><strong>Herencia:</strong> Inheritance and polymorphism</li>
        <li><strong>Colecciones:</strong> Arrays, lists, and data structures</li>
        <li><strong>Proyecto Integrador:</strong> Build a complete application</li>
      </ol>
    </div>
  </div>

  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }

  private _runTypeScriptCode(code: string) {
    // Quoting arbitrary code for the shell is not safe; write it to a
    // temp file and let tsx run the file instead.
    const file = path.join(os.tmpdir(), "programacion-ts-playground.ts");
    fs.writeFileSync(file, code, "utf8");

    const terminal =
      vscode.window.activeTerminal ||
      vscode.window.createTerminal("TypeScript Playground");
    terminal.show();
    terminal.sendText(`tsx "${file}");

    // Show results in the webview if it exists
    if (PlaygroundPanel.currentPanel) {
      PlaygroundPanel.currentPanel._panel.webview.postMessage({
        command: "showOutput",
        text: "Ejecutando código... Ver terminal para output completo"
      });
    }
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
