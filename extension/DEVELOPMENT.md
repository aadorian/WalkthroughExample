# TypeScript Programming Playground - Development Guide

This guide explains how to build, develop, and publish the VS Code extension.

## Project Structure

```
extension/
├── src/
│   ├── extension.ts           # Main extension entry point
│   ├── playgroundPanel.ts     # Webview for the interactive playground
│   └── moduleTreeProvider.ts  # Tree view for course modules
├── modules/
│   ├── 01-fundamentos.md
│   ├── 02-variables-y-expresiones.md
│   ├── ...
│   └── 11-ejercicios-integradores.md
├── webview-ui/
│   ├── playground.js          # Webview script
│   └── playground.css         # Webview styles
├── media/
│   ├── sidebar-icon.svg       # Activity bar icon
│   ├── step-*.svg             # Walkthrough step graphics
│   └── icon.png               # Extension icon (marketplace)
├── package.json               # Extension manifest and dependencies
├── tsconfig.json              # TypeScript configuration
├── README.md                  # User-facing documentation
├── DEVELOPMENT.md             # This file
└── .vscodeignore              # Files to exclude from package
```

## Prerequisites

- **Node.js** 16+ ([download](https://nodejs.org/))
- **VS Code** 1.75+ ([download](https://code.visualstudio.com/))
- **TypeScript** knowledge (basic understanding)
- **VS Code Extension API** familiarity (optional but helpful)

## Setup

### 1. Install Dependencies

```bash
cd extension
npm install
```

### 2. Compile TypeScript

```bash
npm run compile
```

Or watch for changes:

```bash
npm run watch
```

## Development

### Running the Extension

1. Open the `extension` folder in VS Code
2. Press `F5` or go to **Run > Start Debugging**
3. A new VS Code window opens with the extension loaded
4. Test the extension in this debug window

### Testing Commands

In the debug window, open the Command Palette (Ctrl+Shift+P / Cmd+Shift+P) and run:

- `TypeScript Programming: Open Playground` — Launch the interactive playground
- `TypeScript Programming: Start Learning Guide` — Begin the walkthrough
- `TypeScript Programming: Run Example` — Execute TypeScript code
- `TypeScript Programming: Open Module` — Open a course module

### Hot Reload

To reload the extension after making changes:
1. Use **Ctrl+Shift+F5** in the debug window
2. Or manually restart: Run > Stop, then F5 again

## Making Changes

### Updating Walkthrough Steps

Edit `package.json` in the `contributes.walkthroughs` section:

```json
{
  "id": "programacion-ts.getting-started",
  "title": "TypeScript Programming - Getting Started",
  "steps": [
    {
      "id": "step-id",
      "title": "Step Title",
      "description": "What this step teaches",
      "media": {
        "image": "media/step-*.svg",
        "altText": "Description for accessibility"
      },
      "completionEvents": ["onCommand:programacion-ts.openPlayground"]
    }
  ]
}
```

### Updating Playground Examples

Edit `webview-ui/playground.js` and add to the `examples` object:

```javascript
const examples = {
  myExample: `// Your TypeScript code here
console.log("Hello");`,
};
```

Then add a button in the HTML:

```html
<button class="example-btn" data-example="myExample">My Example</button>
```

### Styling the Webview

Edit `webview-ui/playground.css` to modify the playground appearance. The CSS includes theme-aware variables:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  /* ... */
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1e1e1e;
    --text-primary: #e0e0e0;
  }
}
```

### Module List

The module list is defined in `moduleTreeProvider.ts`:

```typescript
const MODULES: Module[] = [
  {
    id: 1,
    title: "Fundamentos",
    filename: "01-fundamentos.md",
    topics: ["Systems", "Software", "Lifecycle"],
    week: "1",
  },
  // ... more modules
];
```

## Building for Release

### 1. Update Version

Edit `package.json`:

```json
{
  "version": "0.2.0"
}
```

Follow [Semantic Versioning](https://semver.org/).

### 2. Compile and Package

```bash
npm run vscode:prepublish
```

This creates optimized, minified code in `dist/`.

### 3. Create VSIX Package

```bash
npm install -g vsce
vsce package
```

This generates `programacion-ts-playground-0.2.0.vsix`.

### 4. Install and Test Locally

- In VS Code: **Extensions > ... > Install from VSIX...**
- Select the `.vsix` file
- Test all functionality

## Publishing to Marketplace

### Prerequisites

- [Create a publisher account](https://marketplace.visualstudio.com/manage)
- [Generate a Personal Access Token (PAT)](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)

### Publish

```bash
vsce publish --pat <your-token>
```

Or use a stored token:

```bash
vsce login ort-edu
vsce publish
```

## Continuous Integration

### GitHub Actions Setup

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Extension

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run compile
      - run: npm install -g vsce
      - run: vsce publish --pat ${{ secrets.VSCODE_TOKEN }}
```

## Debugging Tips

### Enable Debug Logging

Set environment variable:

```bash
DEBUG=* code
```

### Check Extension Logs

In the debug window:
1. Open **Output** panel (Ctrl+Shift+U / Cmd+Shift+U)
2. Select "TypeScript Programming" from dropdown

### Common Issues

**"Cannot find module 'vscode'"**
```bash
npm install
```

**Walkthrough not showing**
- Reload extension (Ctrl+Shift+F5)
- Check `package.json` for syntax errors
- Verify step IDs are unique

**Playground code won't run**
- Check terminal has tsx installed: `npm install -g tsx`
- Ensure Node.js 16+ is installed

## Code Quality

### Format Code

```bash
npm install -g prettier
prettier --write src/ webview-ui/
```

### Type Check

```bash
npm run compile
```

TypeScript will report type errors.

### Best Practices

- Keep webview scripts simple and self-contained
- Use theme variables for colors
- Test in both light and dark themes
- Provide meaningful error messages
- Validate user input in webviews

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Webview API Guide](https://code.visualstudio.com/api/extension-guides/webview)
- [Walkthrough UX Guidelines](https://code.visualstudio.com/api/ux-guidelines/walkthroughs)
- [Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Support

For questions or issues:
1. Check [VS Code Extension Issues](https://github.com/microsoft/vscode/issues)
2. Review [API Documentation](https://code.visualstudio.com/api)
3. Open an issue in this repository

---

Happy developing! 🚀
