# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**Programación desde cero con TypeScript** — a 15-week Spanish-language course on Object-Oriented Programming with TypeScript (based on "Programación I" from ORT Universidad), delivered as a VS Code extension. The repo has two halves:

- **Course content**: `extension/modules/01-fundamentos.md` … `11-ejercicios-integradores.md` — Spanish markdown modules with embedded, runnable TypeScript examples.
- **The extension**: `extension/` — a VS Code extension (TypeScript) providing an interactive walkthrough, a code playground, and a module explorer.

All development commands run from `extension/`; the repo root only holds docs (README, CONTRIBUTING, EXTENSION_SETUP.md, SUMMARY.md).

## Commands

```bash
cd extension
npm install

# Tests (Jest + ts-jest; vscode API is mocked)
npm test                                   # all tests
npm run test:watch                         # watch mode
npm run test:coverage                      # coverage report → coverage/
npx jest src/__tests__/extension.test.ts   # single test file
npx jest -t "pattern"                      # tests matching a name

# Build
npm run compile        # tsc type-check + emit (tsconfig.json)
npm run watch          # tsc watch
npm run esbuild        # bundle src/extension.ts → dist/extension.js (sourcemap)
npm run esbuild-watch  # bundle in watch mode; then F5 in VS Code to debug

# Package
vsce package           # produces programacion-ts-playground-<version>.vsix
```

Course examples run with `tsx` (`npm install -g tsx`, then `tsx file.ts`).

## Extension Architecture

Three source files in `extension/src/`:

- **`extension.ts`** — `activate()` registers the tree provider and four commands (`openPlayground`, `startWalkthrough`, `runExample`, `openModule`). `openModule` accepts either an absolute path or a bundled filename, which it resolves against the extension's `modules/` directory.
- **`moduleTreeProvider.ts`** — sidebar tree view. Contains a hardcoded `MODULES` array (id, title, filename, topics, week) that mirrors the files in `extension/modules/`.
- **`playgroundPanel.ts`** — singleton webview panel (`PlaygroundPanel.currentPanel`). The webview posts messages (`runCode`, `alert`); code execution writes the code to a temp file and runs `tsx <file>` in the integrated terminal — never interpolate user code into a shell command. HTML is generated inline with a nonce-based CSP; assets load from `webview-ui/` (plain JS/CSS, no framework, theme-aware via VS Code CSS variables).

The walkthrough (7 steps) is declared in `extension/package.json` under `contributes.walkthroughs`, with theme-aware SVGs in `media/` and links into modules via `command:programacion-ts.openModule`.

**Keep in sync when modules change** — a module rename/addition touches three places: the file in `extension/modules/`, the `MODULES` array in `moduleTreeProvider.ts`, and the walkthrough step links in `package.json`.

**Testing setup**: Jest can't load the real `vscode` module; `jest.config.js` maps it to the mock in `src/__mocks__/vscode.ts`. Extend that mock when using new vscode APIs in source files.

## Course Content Conventions

- **Naming**: domain classes and methods in Spanish (`Persona`, `getCargo()`, `abrirCajon()`); language syntax stays English. This is deliberate — don't "translate" either direction.
- **Modules are cumulative** (Week 1 assumes nothing; Week 15 assumes everything prior). When editing a module, keep its week number and progression fixed; add new examples after existing ones rather than restructuring.
- **Every code block must be copy-paste runnable** with `tsx` — no pseudocode in executable sections. If an example needs a helper (like `io.ts` for input), it must be provided alongside.
- **Design-first**: UML diagrams appear before the code they describe. Exercises give the problem first, with solutions in a marked section below (use `<details><summary>` where supported).
- **Style**: `const` by default; type annotations at public API boundaries, inference for locals; `throw new Error()` over silent failures. Headings: H2 for module sections, H3 for subsections.

## Extension Changes

- Walkthrough steps must follow module order, and playground examples must each work independently.
- Test webview/walkthrough changes in both light and dark VS Code themes.
- Verify module explorer entries open the correct markdown files after any module change.
