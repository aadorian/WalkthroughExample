# Quick Start - Building & Running the Extension

Get the TypeScript Programming Playground extension up and running in minutes.

## One-Minute Setup

```bash
# 1. Navigate to extension directory
cd extension

# 2. Install dependencies
npm install

# 3. Compile TypeScript
npm run compile

# 4. Start debugging
# Press F5 in VS Code, or:
# Run > Start Debugging from the menu
```

A new VS Code window opens with the extension active. You're done! 🎉

## Testing the Extension

In the debug window's Command Palette (Ctrl+Shift+P / Cmd+Shift+P):

```
TypeScript Programming: Open Playground
```

This should open the interactive playground where you can:
- Click quick-start examples
- Write and run TypeScript code
- See output in the integrated terminal

## What to Try First

1. **Open the Playground**
   - Command: `Open Playground`
   - Or click the blue icon in the sidebar

2. **Click "Hello World"**
   - Code appears in the editor
   - Click "▶ Run Code"
   - Output shows in terminal

3. **Start the Walkthrough**
   - Command: `Start Learning Guide`
   - Click through each step

4. **View Course Modules**
   - Look for the sidebar icon (book)
   - Browse the 11-week curriculum

## Common First-Time Issues

### "tsx: command not found"

The playground needs `tsx` installed globally:

```bash
npm install -g tsx
```

Then reload the extension (Ctrl+Shift+F5).

### Extension doesn't appear in sidebar

Press F5 to start debugging. If using an installed version:

```bash
# Reinstall from development build
vsce package
# Then install from VSIX file
```

### Code editor appears blank

This is normal. Click an example button or paste code directly.

## File Structure Quick Reference

| File | Purpose |
|------|---------|
| `src/extension.ts` | Main extension code |
| `src/playgroundPanel.ts` | Interactive playground webview |
| `src/moduleTreeProvider.ts` | Course modules sidebar |
| `webview-ui/playground.js` | Playground interactivity |
| `webview-ui/playground.css` | Playground styling |
| `media/step-*.svg` | Walkthrough graphics |
| `package.json` | Extension config & manifest |

## Development Workflow

```bash
# Terminal 1: Watch for TypeScript changes
npm run watch

# Terminal 2: Start debugging
# Press F5 or Run > Start Debugging

# After making changes:
# Ctrl+Shift+F5 to reload extension
```

## Adding Custom Examples

Edit `webview-ui/playground.js`:

```javascript
const examples = {
  hello: `console.log("Hello World");`,
  variables: `let name = "Ana";
console.log(name);`,
  // Add your example:
  myExample: `// Your code here
console.log("Works!");`,
};
```

Add a button in the HTML (in `playgroundPanel.ts`):

```html
<button class="example-btn" data-example="myExample">My Example</button>
```

Reload (Ctrl+Shift+F5) and test!

## Package and Distribute

When ready to package:

```bash
# Install vsce if not already installed
npm install -g vsce

# Create deployment build
npm run vscode:prepublish

# Package as .vsix
vsce package

# Result: programacion-ts-playground-VERSION.vsix
```

Share the `.vsix` file or upload to [VS Code Marketplace](https://marketplace.visualstudio.com).

## Next Steps

- Read [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guide
- Check [README.md](./README.md) for user documentation
- Review [VS Code Extension API](https://code.visualstudio.com/api) for advanced features

## Tips

- **Hot Reload**: Ctrl+Shift+F5 reloads the extension
- **Inspect Webview**: Right-click in playground → "Inspect Element"
- **Terminal Shortcuts**: The embedded terminal respects VS Code key bindings
- **Theme Testing**: Change VS Code theme to see light/dark styling

---

💡 **Pro Tip**: Open two VS Code windows side-by-side:
1. Development window (with the code)
2. Debug window (with the extension running)

This makes development much faster!

Happy coding! 🚀
