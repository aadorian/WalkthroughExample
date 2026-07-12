# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is **Programación desde cero con TypeScript** — a comprehensive, original 15-week study guide for learning Object-Oriented Programming (OOP) using TypeScript. The material covers the curriculum of "Programación I" from ORT Universidad, with all examples written from scratch in executable TypeScript.

### Key Details

- **Language**: Spanish course content with TypeScript code examples
- **Audience**: Complete beginners to intermediate programmers
- **Scope**: 15-week progressive curriculum from fundamentals to advanced OOP
- **Format**: Markdown modules with embedded, runnable TypeScript examples
- **Runtime**: Node.js + tsx (TypeScript executor)

## Project Structure

```
.
├── 01-fundamentos.md                  # Week 1: Systems, algorithms, design
├── 02-variables-y-expresiones.md      # Week 2: Variables, types, expressions
├── 03-typescript-basico.md            # Week 3: TypeScript syntax and types
├── 04-clases-y-objetos.md             # Weeks 4-5: OOP, classes, UML
├── 05-asociacion-y-switch.md          # Weeks 6-7: Class relationships
├── 06-herencia-y-polimorfismo.md      # Weeks 8-9: Inheritance, polymorphism
├── 07-colecciones.md                  # Weeks 9-10: Lists, arrays, aggregation
├── 08-arrays.md                       # Week 11: Fixed-size arrays
├── 09-caso-integrador.md              # Week 12: Exceptions, search, sorting
├── 10-mapas-y-orden.md                # Week 13: Maps, advanced sorting
├── 11-ejercicios-integradores.md      # Weeks 14-15: Complete projects
├── README.md                           # User guide and module index
├── files.code-workspace                # VS Code workspace configuration
├── extension/                          # VS Code Extension (Walkthrough + Playground)
└── programacion-1-ts.zip              # Complete course archive
```

## Running Code Examples

All TypeScript examples in the modules are executable. Install dependencies once:

```bash
# Install the TypeScript executor globally
npm install -g tsx

# Run any .ts file from the examples
tsx 01-fundamentos.ts
```

**In VS Code**: Use the TypeScript Programming extension (see below) for an interactive playground.

## Curriculum Overview

| Week | Module | Topics | Key Concepts |
|------|--------|--------|--------------|
| 1 | Fundamentos | Systems, lifecycle, algorithms | Design thinking, pseudocode |
| 2 | Variables | Data representation, types | Manual execution, expressions |
| 3 | TypeScript | Syntax, conversions, control | if/else, loops, functions |
| 4-5 | Clases | OOP, UML, encapsulation | Classes, constructors, getters/setters |
| 6-7 | Asociación | Class relationships, switch | Aggregation, dependencies |
| 8-9 | Herencia | Inheritance, abstract classes | Upcasting, polymorphism |
| 9-10 | Colecciones | Dynamic lists, aggregation | Array-based, generics |
| 11 | Arrays | Fixed-size arrays, iteration | Loops, index-based access |
| 12 | Caso integrador | Exceptions, search, sorting | Error handling, algorithms |
| 13 | Mapas | Maps, advanced sorting | Key-value pairs, comparators |
| 14-15 | Ejercicios | Complete applications | Full design-to-implementation cycle |

## Naming Conventions

- **Domain classes** (model code): Spanish names — `Persona`, `Camion`, `RegistroGastos`
- **Language syntax** (TypeScript keywords): English — `let`, `class`, `interface`, `async`
- **Method names**: Follow the domain language — `getCargo()`, `abrirCajon()`, `saludar()`

This mirrors real-world practice: domain experts speak Spanish; code syntax is English.

## Code Patterns & Conventions

### TypeScript Specifics

- **Type annotations**: Always required at public API boundaries. Use inference (`let x = 5`) for locals.
- **Async I/O**: Input examples use a simple `io.ts` helper; see 03-typescript-basico.md for details.
- **Error handling**: Prefer `throw new Error()` over silent failures. Use `try`/`catch` in callers.
- **Immutability**: Use `const` by default; promote `let` only when reassignment is necessary.

### OOP Design Patterns Used

1. **Encapsulation** (Weeks 4-5): Private fields, public methods, getters/setters.
2. **Inheritance** (Weeks 8-9): Extends abstract base classes; demonstrate polymorphism via method override.
3. **Aggregation** (Weeks 9-10): Composition over inheritance; containers (Banco) hold components (Cuenta).
4. **Delegation** (Week 12+): Objects delegate to collaborators rather than exposing internals.

### Exercise Structure

- **Conceptual exercises**: "Trace this code by hand" — no execution, builds understanding.
- **Implementation exercises**: Write a full class or method — solutions follow after examples.
- **Debugging exercises** (Week 12+): Find and fix intentional bugs.
- **Design exercises**: Sketch UML before coding; prevents over-engineering.

## Common Development Tasks

### Extract a Code Example from a Module

1. Locate the `\`\`\`ts` block in the module.
2. Copy it to a new file: `examples/week-X-example.ts`.
3. Run with `tsx examples/week-X-example.ts`.
4. Modify and re-run to experiment.

### Add a New Exercise

1. Add the exercise description in the appropriate module (numbered sections).
2. Provide a code skeleton or starting point if non-trivial.
3. Place the full solution in a clearly marked "Solution" section below the exercise.
4. Use spoiler-friendly formatting: `<details><summary>Solution</summary>...</details>` in markdown viewers that support it.

### Verify a Concept Across Modules

Search the modules for that concept:

```bash
grep -r "class Persona" *.md       # Find all Persona definitions
grep -r "interface" 09-caso-integrador.md  # Check where interfaces appear
```

### Create a Custom Learning Path

The modules are cumulative, but themes cut across weeks:

- **OOP fundamentals** (Weeks 4-5, 8-9) → Read 04-clases and 06-herencia together for a deep dive.
- **Collections** (Weeks 9-11) → Read 07-colecciones, 08-arrays, then 10-mapas for complete coverage.
- **Design process** (All weeks, especially 12-15) → Re-read the design sections in each module for iterative refinement.

## VS Code Extension: TypeScript Programming Playground

The `extension/` directory contains a complete VS Code extension featuring:

- **Interactive Walkthrough**: A 7-step guided tour covering all major concepts.
- **Playground**: Write and run TypeScript code without leaving VS Code.
- **Module Explorer**: Browse and jump to any of the 11 course modules.
- **Quick Examples**: Pre-built code snippets for immediate experimentation.

### Extension Development

See `extension/QUICKSTART.md` for a 1-minute setup, or `extension/DEVELOPMENT.md` for detailed guidance.

**Quick start**:

```bash
cd extension
npm install
npm run watch
# Then F5 in VS Code to start debugging
```

The walkthrough follows VS Code's UX guidelines (theme-aware SVGs, actionable steps, visual clarity).

## Testing & Verification

### Verify Examples Run

All code examples should be self-contained and executable:

```bash
tsx 03-typescript-basico.md  # Extract and run any .ts block
```

If an example references external files (like `io.ts` for input), check that helper exists or is provided in the same directory.

### Check Grammar & Clarity

- Module headings use H2 (`##`); sections use H3 (`###`).
- Code examples show context: imports, full class, not just fragments.
- Spanish explanations are clear; avoid idioms that won't survive translation.

### Validate Pedagogy

- Progressive complexity: Week 1 assumes zero background; Week 15 assumes all prior weeks.
- Exercises respect the "learn by doing" principle: think, code, compare-to-solution.
- UML diagrams appear *before* code; design-first mentality.

## Common Pitfalls to Avoid

1. **Implicit knowledge**: Don't assume readers know design patterns or advanced TypeScript. Explain once, reference later.
2. **Incomplete examples**: Every code block should be copy-paste runnable. No pseudocode in executable sections.
3. **Scope creep**: Modules cover their topic; tangential CS concepts go in later weeks' "advanced" sections.
4. **Silent errors**: Always show error cases and exception handling when relevant (especially Week 12+).
5. **Spanish in code**: Keep domain names (class, method names) Spanish for immersion; keep syntax English.

## Guidelines for Contributors

### Adding a Module

1. Start with a one-page design in UML if introducing classes.
2. Show the problem first, then the solution.
3. Include 3-5 worked examples and 2-3 exercises.
4. End with a "further reading" pointer to the next module.

### Updating an Existing Module

- Keep the week number and progression fixed.
- Improve clarity or fix bugs; don't restructure.
- Add new examples after existing ones; mark clearly.
- If a change spans multiple modules, coordinate across all affected modules.

### Extension Changes

- Walkthrough steps must follow the module order.
- Playground examples should all work independently.
- Test in both light and dark VS Code themes.
- Verify that the module explorer links to the correct markdown files.

## References & Resources

- [VS Code Extension API](https://code.visualstudio.com/api) — Building the walkthrough/playground.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) — Language reference.
- [ORT Programming I Syllabus](https://ort.edu.uy/) — Original course material (in Spanish).

## Contact & Support

For questions about the course content, examples, or extension:

1. Check the **README.md** for user-facing FAQs.
2. Review existing modules for similar patterns.
3. Open an issue with context: "Module X, Week Y, attempting Z."

---

**Philosophy**: This course teaches OOP from first principles, using TypeScript's strong type system to reinforce design discipline. Each module is self-contained yet builds toward complete, real-world applications in Weeks 14-15.

Good luck, and happy learning! 🎓
