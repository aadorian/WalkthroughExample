# TypeScript Programming Playground

## Overview

An interactive VS Code extension and learning platform for the **15-week TypeScript Programming course** based on the **Programación I** curriculum from ORT Universidad.

## Features

### 🚀 Interactive Walkthrough
A 7-step guided learning guide covering:

1. **Setup Your Environment** - Install Node.js and tsx
2. **Learn the Fundamentals** - Understand programming basics
3. **Variables and Expressions** - Master TypeScript types
4. **Object-Oriented Programming** - Classes and objects
5. **Inheritance and Polymorphism** - Advanced OOP concepts
6. **Collections and Data Structures** - Arrays, lists, and maps
7. **Build Your Capstone Project** - Apply everything you've learned

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

## Installation

### VS Code Extension

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

## Course Structure

The extension covers all 15 weeks of the TypeScript Programming course:

| Week | Module | Topics | Key Concepts |
|------|--------|--------|--------------|
| 1 | Fundamentos | Systems, software, lifecycle, pseudocode | Design thinking, algorithms |
| 2 | Variables | Data representation, types | Manual execution, expressions |
| 3 | TypeScript | Syntax, conversions, control | if/else, loops, functions |
| 4-5 | Clases | OOP, UML, encapsulation | Classes, constructors, getters/setters |
| 6-7 | Asociación | Class relationships, switch | Aggregation, dependencies |
| 8-9 | Herencia | Inheritance, abstract classes | Upcasting, polymorphism |
| 9-10 | Colecciones | Dynamic lists, aggregation | Array-based, generics |
| 11 | Arrays | Fixed-size arrays, iteration | Loops, index-based access |
| 12 | Caso integrador | Exceptions, search, sorting | Error handling, algorithms |
| 13 | Mapas | Maps, advanced sorting | Key-value pairs, comparators |
| 14-15 | Ejercicios integradores | Complete projects | Full design-to-implementation cycle |

## Development

### Running the Extension

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Compile TypeScript**
   ```bash
   npm run compile
   ```

3. **Watch for changes**
   ```bash
   npm run watch
   ```

4. **Start debugging**
   ```bash
   # Press F5 in VS Code
   # or: npm run esbuild-watch
   ```

### Running Code Examples

All TypeScript examples are executable. With Node.js installed:

```bash
npm install -g tsx
tsx example.ts
```

## Files Overview

| File | Description |
|------|-------------|
| `README.md` | Project overview and usage guide |
| `LICENSE` | MIT License for the project |
| `CODE_OF_CONDUCT.md` | Code of conduct for contributors |
| `CONTRIBUTING.md` | Guidelines for contributing to the project |
| `extension/README.md` | Extension-specific documentation |
| `CLAUDE.md` | Guide for Claude Code interactions with this project |

## Example Code Files

The `extension/src` directory contains the extension's TypeScript source code:

- `extension.ts` - Main extension initialization
- `playgroundPanel.ts` - Interactive webview for code playground
- `moduleTreeProvider.ts` - Sidebar tree view with all 11 modules

The `webview-ui` directory contains the web-facing part of the playground:

- `playground.js` - Playground interactivity and event handling
- `playground.css` - Responsive, theme-aware styling

The `extension/media` directory contains walkthrough images:

- `step-*.svg` - SVG graphics for each walkthrough step

## Contributing

We welcome contributions! Please:

1. **Check open issues** or create new ones
2. **Follow the code style** and conventions in the codebase
3. **Write clear commit messages** using conventional commits
4. **Test your changes** thoroughly
5. **Update documentation** as needed

See `CONTRIBUTING.md` for detailed contributing guidelines.

## License

This project is licensed under the MIT License. See `LICENSE.md` for details.

## Acknowledgements

This project is based on the "Programación desde cero con TypeScript" curriculum from ORT Universidad. All course material and examples were created from scratch to teach Object-Oriented Programming with TypeScript.

## Support

If you encounter issues or have questions:

1. **Check the documentation** in each module
2. **Run the examples** to understand the concepts
3. **Use the playground** to experiment with code
4. **Follow the walkthrough** step by step

> **Remember:** Programming is a skill best learned by doing! Use the playground to experiment with every concept before moving on. The best way to learn is to write code and see it work.

## Quick Links

- [TypeScript Programming Extension] - Install from marketplace
- [Playing with TypeScript] - Learn from interactive examples
- [Course Modules] - Browse all 11 modules
- [Learning Guide] - Step-by-step tutorial
- [GitHub Repository] - View source code and contribute

[TypeScript Programming Extension]: https://marketplace.visualstudio.com/items?itemName=ort-edu.programacion-ts-playground
[Playing with TypeScript]: https://marketplace.visualstudio.com/items?itemName=ort-edu.programacion-ts-playground
[Course Modules]: https://marketplace.visualstudio.com/items?itemName=ort-edu.programacion-ts-playground
[Learning Guide]: https://marketplace.visualstudio.com/items?itemName=ort-edu.programacion-ts-playground
[GitHub Repository]: https://github.com/aadorian/WalkthroughExample
