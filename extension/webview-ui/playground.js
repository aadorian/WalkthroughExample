// Get the VS Code API
const vscode = acquireVsCodeApi();

// Examples for quick start
const examples = {
  hola: `// Hello World
console.log("Hola, mundo");`,

  variables: `// Variables and Types
const nombre: string = "Ana";
const edad: number = 25;
const activo: boolean = true;

console.log(\`Nombre: \${nombre}, Edad: \${edad}\`);`,

  classes: `// Simple Class Example
class Persona {
  constructor(private nombre: string, private edad: number) {}

  saludar(): void {
    console.log(\`Hola, me llamo \${this.nombre} y tengo \${this.edad} años\`);
  }
}

const p = new Persona("Juan", 30);
p.saludar();`,

  arrays: `// Arrays and Collections
const numeros: number[] = [1, 2, 3, 4, 5];
const suma = numeros.reduce((a, b) => a + b, 0);

console.log(\`Números: \${numeros.join(", ")}\`);
console.log(\`Suma: \${suma}\`);
console.log(\`Promedio: \${suma / numeros.length}\`);`,
};

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  const codeEditor = document.getElementById("codeEditor");
  const runBtn = document.getElementById("runBtn");
  const output = document.getElementById("output");

  // Example buttons
  document.querySelectorAll(".example-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const exampleKey = btn.dataset.example;
      if (examples[exampleKey]) {
        codeEditor.value = examples[exampleKey];
        codeEditor.focus();
      }
    });
  });

  // Run button
  runBtn.addEventListener("click", () => {
    const code = codeEditor.value;
    output.innerHTML = '<div class="output-running">Ejecutando...</div>';

    // Send the code to the extension
    vscode.postMessage({
      command: "runCode",
      code: code,
    });

    // For demo purposes, show output after a delay
    setTimeout(() => {
      output.innerHTML = `<div class="output-success">✓ Código ejecutado<br><small>Ver terminal para el output</small></div>`;
    }, 500);
  });

  // Keyboard shortcut: Ctrl+Enter to run
  codeEditor.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      runBtn.click();
    }
  });

  // Handle messages from the extension
  window.addEventListener("message", (event) => {
    const message = event.data;

    switch (message.command) {
      case "alert":
        output.innerHTML = `<div class="output-error">${message.text}</div>`;
        break;
    }
  });
});
