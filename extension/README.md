# TypeScript Programming Playground

An interactive VS Code extension for learning Object-Oriented Programming with TypeScript. Features a comprehensive walkthrough and playground for the 15-week "Programación I" course.

## Features

### 🚀 Interactive Walkthrough
A step-by-step learning guide covering:
- **Setup Your Environment** - Install Node.js and tsx
- **Learn the Fundamentals** - Understand programming basics
- **Variables and Expressions** - Master TypeScript types
- **Object-Oriented Programming** - Classes and objects
- **Inheritance and Polymorphism** - Advanced OOP concepts
- **Collections and Data Structures** - Arrays, lists, and maps
- **Build Your Capstone Project** - Apply everything together

### 🎮 Interactive Playground
- Write and execute TypeScript code directly in VS Code
- Quick-start examples for common tasks
- Real-time feedback
- Integrated terminal execution

### 📚 Learning Module Explorer
- Browse all 11 course modules
- Quick access to each topic
- Organized by week/difficulty
- Direct links to module content

### 💡 Code Examples
Pre-built examples for:
- Hello World
- Variables & Types
- Classes & Objects
- Arrays & Collections

## Getting Started

### Prerequisites
- Node.js 16+ ([install](https://nodejs.org/))
- VS Code 1.75+

### Installation

1. Install the extension from the VS Code Marketplace
2. Open the extension (look for the TypeScript Programming icon in the sidebar)
3. Click "Start Learning" or use the command palette: `TypeScript Programming: Start Learning Guide`

### Quick Start

1. **Open the Playground**
   - Command: `TypeScript Programming: Open Playground`
   - Or click the Playground button in the sidebar

2. **Choose an Example**
   - Click any example button (Hello World, Variables, etc.)
   - The code loads into the editor

3. **Run Your Code**
   - Click the ▶ Run Code button
   - Or press Ctrl+Enter (Cmd+Enter on Mac)
   - Output appears in the integrated terminal

4. **Follow the Walkthrough**
   - Command: `TypeScript Programming: Start Learning Guide`
   - Complete each step to unlock the next level

## Commands

| Command | Shortcut | Purpose |
|---------|----------|---------|
| `programacion-ts.openPlayground` | - | Open the interactive playground |
| `programacion-ts.startWalkthrough` | - | Begin the learning guide |
| `programacion-ts.runExample` | Ctrl+Enter | Execute TypeScript code |
| `programacion-ts.openModule` | - | Open a course module |

## Course Structure

The extension covers 15 weeks of study:

1. **Fundamentos** (Week 1)
   - Systems, software, lifecycle, pseudocode

2. **Variables y Expresiones** (Week 2)
   - Variables, expressions, manual execution

3. **TypeScript Básico** (Week 3)
   - Types, conversions, operators, control structures

4. **Clases y Objetos** (Weeks 4-5)
   - OOP, UML, constructors, getters/setters

5. **Asociación y Switch** (Weeks 6-7)
   - Class relationships, switch statements

6. **Herencia y Polimorfismo** (Weeks 8-9)
   - Inheritance, upcasting, abstract classes

7. **Colecciones** (Weeks 9-10)
   - Dynamic lists, aggregation

8. **Arrays** (Week 11)
   - Fixed-size arrays, iteration

9. **Caso Integrador** (Week 12)
   - Exceptions, search, sorting, interfaces

10. **Mapas y Orden Avanzado** (Week 13)
    - Advanced sorting, Map, null handling

11. **Ejercicios Integradores** (Weeks 14-15)
    - Complete projects with solutions

## Tips for Success

> **Run examples regularly** — The best way to learn programming is by doing. Use the playground to experiment with every concept before moving on.

> **Follow the order** — Each module builds on the previous ones. Don't skip ahead; the fundamentals matter.

> **Solve exercises first** — Try to solve each exercise before looking at the solution. The struggle is where learning happens.

> **Use UML** — Draw class diagrams before writing code. It clarifies your design.

> **Test your assumptions** — Use the playground to verify how things work. Small experiments build intuition.

## Creating Custom Examples

To add your own examples, edit `webview-ui/playground.js` and add to the `examples` object:

```javascript
const examples = {
  miEjemplo: `// My custom example
console.log("Hello from my example");`,
};
```

Then add a button to trigger it:
```html
<button class="example-btn" data-example="miEjemplo">My Example</button>
```

## Keyboard Shortcuts

- **Ctrl+Enter** (Windows/Linux) or **Cmd+Enter** (Mac) — Run code in the playground
- **Ctrl+/** — Toggle comment in code editor

## Troubleshooting

**"tsx command not found"**
Install it globally:
```bash
npm install -g tsx
```

**Code won't run**
- Make sure Node.js 16+ is installed
- Check that tsx is in your PATH
- Try opening a new terminal in VS Code

**Walkthrough steps not completing**
- Complete the action specified in each step
- Steps complete when you run the corresponding command

## Contributing

Found a bug or have a suggestion? [Open an issue](https://github.com/ort-edu/programacion-ts-playground/issues)

## License

MIT License - See LICENSE.md for details

## Credits

Course material based on "Programación I" from ORT Universidad.

Extension developed with ❤️ for learners everywhere.

---

**Happy Learning!** 🎓

Start with the walkthrough and explore each module at your own pace. Remember: programming is a skill best learned by doing!
