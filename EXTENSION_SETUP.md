# VS Code Extension Setup Guide

## Overview

I've created a complete VS Code extension for the TypeScript Programming course with:

✅ **Interactive Walkthrough** — 7-step guided learning tour  
✅ **Code Playground** — Write and run TypeScript code in VS Code  
✅ **Module Explorer** — Browse all 11 course modules from the sidebar  
✅ **Quick Examples** — Pre-built code snippets for common patterns  
✅ **Theme Support** — Light/dark mode aware UI with SVG graphics

## What Was Created

### Extension Directory Structure

```
extension/
├── src/
│   ├── extension.ts           # Main extension initialization
│   ├── playgroundPanel.ts     # Interactive webview for code playground
│   └── moduleTreeProvider.ts  # Sidebar tree view with all 11 modules
├── webview-ui/
│   ├── playground.js          # Playground interactivity and event handling
│   └── playground.css         # Responsive, theme-aware styling
├── media/
│   ├── sidebar-icon.svg       # Activity bar icon (book/learning)
│   ├── step-setup.svg         # Walkthrough: Setup your environment
│   ├── step-fundamentals.svg  # Walkthrough: Fundamentals
│   ├── step-variables.svg     # Walkthrough: Variables & types
│   ├── step-oop.svg           # Walkthrough: OOP concepts
│   ├── step-inheritance.svg   # Walkthrough: Inheritance & polymorphism
│   ├── step-collections.svg   # Walkthrough: Collections & data structures
│   └── step-capstone.svg      # Walkthrough: Capstone project
├── package.json               # Extension manifest and config
├── tsconfig.json              # TypeScript compiler settings
├── .vscodeignore              # Files to exclude from package
├── .gitignore                 # Git ignore rules
├── README.md                  # User-facing documentation
├── QUICKSTART.md              # 1-minute setup guide
├── DEVELOPMENT.md             # Detailed development guide
└── EXTENSION_SETUP.md         # This file
```

## Features

### 1. Walkthrough (7 Steps)

Follows VS Code's UX guidelines with:
- ✅ Actionable steps with completion tracking
- ✅ Theme-aware SVG graphics for each step
- ✅ Progressive curriculum matching the 15-week course
- ✅ Clear learning objectives for each milestone

**Steps**:
1. Setup Your Environment (Node.js + tsx)
2. Learn the Fundamentals (Systems, design, algorithms)
3. Variables & Expressions (TypeScript types and conversions)
4. Object-Oriented Programming (Classes, UML, encapsulation)
5. Inheritance & Polymorphism (Advanced OOP)
6. Collections & Data Structures (Arrays, lists, maps)
7. Build Your Capstone Project (Integrate everything)

### 2. Interactive Playground

A webview-based code editor that allows users to:
- ✅ Write TypeScript code directly in VS Code
- ✅ Click quick-start examples (Hello World, Variables, Classes, Arrays)
- ✅ Run code with Ctrl+Enter or the "▶ Run Code" button
- ✅ See output in the integrated terminal
- ✅ Beautiful, responsive UI with light/dark theme support

### 3. Module Explorer

A sidebar tree view showing:
- ✅ All 11 course modules organized by week
- ✅ Topic breakdown for each module
- ✅ Click to open any module in the editor
- ✅ Progress indication (weeks 1-15)

### 4. Commands

Registered VS Code commands:

```
programacion-ts.openPlayground      Open the playground
programacion-ts.startWalkthrough    Begin the learning guide
programacion-ts.runExample          Execute TypeScript code
programacion-ts.openModule          Open a course module
```

## Installation & Development

### Quick Start (1 minute)

```bash
cd extension
npm install
npm run compile
# Press F5 in VS Code to start debugging
```

### Testing

In the debug window (opens automatically when you press F5):

1. Open Command Palette: **Ctrl+Shift+P** / **Cmd+Shift+P**
2. Run: `TypeScript Programming: Open Playground`
3. Try the examples or write your own code
4. Click "▶ Run Code" or press Ctrl+Enter

### Development Workflow

```bash
# Terminal 1: Watch TypeScript files
npm run watch

# Terminal 2: Start debugging
# Press F5 in VS Code

# After making changes:
# Reload with Ctrl+Shift+F5
```

## Publishing to VS Code Marketplace

### Prerequisites

1. Create a [publisher account](https://marketplace.visualstudio.com/manage)
2. Generate a [Personal Access Token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)

### Steps

```bash
# Install packaging tool
npm install -g vsce

# Create optimized build
npm run vscode:prepublish

# Package extension
vsce package

# Publish to marketplace
vsce publish --pat <your-token>
```

This creates `programacion-ts-playground-0.1.0.vsix` and publishes it.

## Customization

### Adding New Examples to Playground

Edit `webview-ui/playground.js`:

```javascript
const examples = {
  hola: `console.log("Hola, mundo");`,
  // Add your example:
  miEjemplo: `const x = 42;
console.log(x);`,
};
```

Add button in `playgroundPanel.ts` HTML:

```html
<button class="example-btn" data-example="miEjemplo">Mi Ejemplo</button>
```

### Customizing Walkthrough

Edit `package.json` under `contributes.walkthroughs`. Add step:

```json
{
  "id": "my-step",
  "title": "My Step Title",
  "description": "What this step teaches",
  "media": {
    "image": "media/step-custom.svg",
    "altText": "Description"
  },
  "completionEvents": ["onCommand:programacion-ts.openPlayground"]
}
```

### Styling

Theme-aware CSS in `webview-ui/playground.css`:

```css
:root {
  --bg-primary: #ffffff;
  --accent-color: #0078d4;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1e1e1e;
    --accent-color: #0098ff;
  }
}
```

## Architecture

### Extension Flow

```
User Opens VS Code
    ↓
extension.ts loads
    ↓
Commands registered + Tree provider initialized
    ↓
User clicks sidebar icon or runs command
    ↓
Opens Playground (PlaygroundPanel) or Module (ModuleTreeProvider)
```

### Playground Communication

```
User types code in editor
    ↓
Clicks "Run Code"
    ↓
Webview sends message to extension
    ↓
Extension creates terminal and runs: tsx code.ts
    ↓
Output appears in terminal
```

## Files Overview

| File | Purpose | Key Points |
|------|---------|-----------|
| `extension.ts` | Main entry point | Registers commands, tree provider, messages |
| `playgroundPanel.ts` | Webview manager | Creates/shows playground, handles messages |
| `moduleTreeProvider.ts` | Sidebar tree | Lists 11 modules, provides quick access |
| `playground.js` | Webview script | Event listeners, example loading, execution |
| `playground.css` | Webview styles | Responsive design, light/dark theme |
| `package.json` | Extension manifest | Contributes walkthroughs, commands, views |
| `tsconfig.json` | TypeScript config | Compilation settings |

## Troubleshooting

### Extension won't load
```bash
npm install
npm run compile
```

### F5 doesn't start debugging
- Check VS Code has the Extension Development Kit installed
- Go to **Run > Start Debugging** instead

### Playground code won't run
```bash
npm install -g tsx
```
Then reload: Ctrl+Shift+F5

### Walkthrough steps not completing
- Verify each step's `completionEvents` command exists
- Check the command is registered in `extension.ts`

### SVG graphics not showing
- Ensure `media/step-*.svg` files exist
- Check paths in `package.json` are correct

## Next Steps

1. **Test it**: F5 → Open Playground → Try examples
2. **Customize**: Add your own examples and styling
3. **Package**: `vsce package` → Share the `.vsix` file
4. **Publish**: `vsce publish --pat <token>` → List on marketplace

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Walkthrough Guidelines](https://code.visualstudio.com/api/ux-guidelines/walkthroughs)
- [Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Support

See `extension/QUICKSTART.md` for quick help, or `extension/DEVELOPMENT.md` for detailed guidance.

---

**Status**: ✅ Ready to use  
**Next**: F5 to start debugging!
