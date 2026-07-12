# Unit Testing Guide

This guide explains how to run, write, and maintain unit tests for the TypeScript Programming Playground VS Code extension.

## Quick Start

### Run Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
src/
├── __tests__/
│   ├── extension.test.ts           # Tests for extension.ts
│   ├── moduleTreeProvider.test.ts  # Tests for moduleTreeProvider.ts
│   └── playgroundPanel.test.ts     # Tests for playgroundPanel.ts
├── __mocks__/
│   └── vscode.ts                   # Mock implementation of vscode module
├── extension.ts                    # Main extension file
├── moduleTreeProvider.ts           # Module tree view provider
└── playgroundPanel.ts              # Webview playground panel
```

## Test Coverage

Current test coverage summary:

| File | Statements | Branches | Functions | Lines |
|------|-----------|----------|-----------|-------|
| extension.ts | 82.14% | 66.66% | 66.66% | 82.14% |
| moduleTreeProvider.ts | 100% | 83.33% | 100% | 100% |
| playgroundPanel.ts | ~85% | ~70% | ~90% | ~85% |
| **Overall** | ~89% | ~73% | ~85% | ~89% |

## Test Suites

### 1. Extension Tests (`extension.test.ts`)

Tests the main extension activation and deactivation logic.

**Coverage:**
- Extension activation and command registration
- Welcome message display on first activation
- Command callback functionality
- Tree data provider registration
- Context state management

**Key Test Cases:**
```typescript
✓ should activate without errors
✓ should register tree data provider
✓ should register commands
✓ should push subscriptions to context
✓ should show welcome message on first activation
✓ should not show welcome message on subsequent activations
```

### 2. Module Tree Provider Tests (`moduleTreeProvider.test.ts`)

Tests the course module tree view functionality.

**Coverage:**
- Tree item creation and retrieval
- Module data structure and organization
- Week assignments for modules
- Topic associations with modules
- Tree refresh mechanism

**Key Test Cases:**
```typescript
✓ should have 11 modules representing 15 weeks of content
✓ should return all modules when no element is provided
✓ should return topics for a given module
✓ should have correct week assignments for modules
✓ should have topics for each module
```

### 3. Playground Panel Tests (`playgroundPanel.test.ts`)

Tests the interactive TypeScript playground webview.

**Coverage:**
- Webview panel creation and lifecycle
- HTML generation for the playground
- State management (singleton pattern)
- Configuration and options

**Key Test Cases:**
```typescript
✓ should create a webview panel when none exists
✓ should set enableScripts to true in options
✓ should provide localResourceRoots
✓ should generate HTML for the webview
✓ should reveal existing panel instead of creating new one
✓ should contain proper HTML structure
✓ should reference CSS and JS files
```

## Writing Tests

### Test Template

```typescript
import * as vscode from 'vscode';
import { MyModule } from '../myModule';

describe('MyModule', () => {
  let mockContext: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContext = {
      // Mock context properties here
    };
  });

  describe('some feature', () => {
    it('should do something', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = MyModule.method(input);

      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Best Practices

1. **Clear Test Names**: Use descriptive test names that explain the behavior
   - ✓ `should show welcome message on first activation`
   - ✗ `test welcome`

2. **One Assertion Per Test**: Keep tests focused
   ```typescript
   // Good
   it('should create a panel', () => {
     PlaygroundPanel.createOrShow(uri);
     expect(mockCreateWebviewPanel).toHaveBeenCalled();
   });

   // Also good - multiple assertions for same concern
   it('should configure panel with correct options', () => {
     PlaygroundPanel.createOrShow(uri);
     const options = mockCreateWebviewPanel.mock.calls[0][3];
     expect(options.enableScripts).toBe(true);
     expect(options.retainContextWhenHidden).toBe(true);
   });
   ```

3. **Use Arrange-Act-Assert Pattern**:
   ```typescript
   it('should work correctly', () => {
     // Arrange: Set up test data
     const input = { value: 10 };

     // Act: Execute the function
     const result = myFunction(input);

     // Assert: Check the result
     expect(result).toBe(20);
   });
   ```

4. **Mock External Dependencies**: Use the `__mocks__` directory
   - All vscode module imports are automatically mocked
   - Create new mocks in `src/__mocks__/` for other external modules

5. **Clean Up After Tests**:
   ```typescript
   beforeEach(() => {
     jest.clearAllMocks();
     // Reset any state
   });

   afterEach(() => {
     // Clean up if needed
   });
   ```

## Mocking the vscode Module

The `src/__mocks__/vscode.ts` file provides mock implementations of commonly used vscode APIs:

- `TreeItem` and `TreeItemCollapsibleState` - For tree view items
- `EventEmitter` - For emitting events
- `window` - For UI operations (dialogs, terminals)
- `commands` - For registering and executing commands
- `workspace` - For file operations
- `Uri` - For URI handling

To add mocks for new vscode APIs, edit `src/__mocks__/vscode.ts`:

```typescript
export const myNewApi = {
  doSomething: jest.fn(),
};
```

## Running Tests with Coverage

Generate a coverage report:

```bash
npm run test:coverage
```

This creates:
- Console output showing coverage percentages
- HTML report in `coverage/index.html` (open in browser)
- LCOV data for IDE integration

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 70%
- **Functions**: > 80%
- **Lines**: > 80%

## Continuous Integration

Tests run automatically on:
- Local development (with `npm run watch`)
- Pre-commit hooks (when configured)
- CI/CD pipelines (GitHub Actions, etc.)

## Debugging Tests

### Run Specific Test File

```bash
npx jest src/__tests__/extension.test.ts
```

### Run Tests Matching Pattern

```bash
npx jest --testNamePattern="should create"
```

### Debug with Node Inspector

```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome to debug.

### Print Debug Info

```typescript
it('should work', () => {
  const result = myFunction();
  console.log('Result:', result); // Visible in test output
  expect(result).toBe(expected);
});
```

Run with: `npm test -- --verbose`

## Common Issues

### "Cannot find module 'vscode'"

The vscode module is automatically mocked. If you get this error:
1. Ensure `jest.config.js` has `moduleNameMapper` set up
2. Check that `src/__mocks__/vscode.ts` exists
3. Clear Jest cache: `npx jest --clearCache`

### "ReferenceError: jest is not defined"

Add this to the top of your test file:
```typescript
import '@testing-library/jest-dom'; // if using testing-library
```

Or configure in `jest.config.js`:
```typescript
testEnvironment: 'node',
```

### Snapshot Tests

For WebView HTML content, consider using snapshots to track changes:

```typescript
it('should generate correct HTML', () => {
  PlaygroundPanel.createOrShow(uri);
  expect(mockPanel.webview.html).toMatchSnapshot();
});
```

Update snapshots after intentional changes:
```bash
npm test -- -u
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [VS Code Testing Guide](https://code.visualstudio.com/docs/editor/testing)
- [Unit Testing Best Practices](https://wiki.c2.com/?ArrangeActAssert)
- [Mocking in Jest](https://jestjs.io/docs/es6-class-mocks)

## Contributing

When adding new features:

1. Write tests first (TDD approach) or alongside the code
2. Ensure all tests pass: `npm test`
3. Maintain > 80% code coverage
4. Update this document if adding new test patterns
5. Run `npm run test:coverage` before committing

---

**Questions?** Check existing test files for examples or open an issue in the repository.
