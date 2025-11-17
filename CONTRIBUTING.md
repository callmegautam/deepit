# Contributing to deepit

Thank you for your interest in contributing to **deepit**.
This project values clarity, correctness, and predictability.
All contributions — whether bug reports, feature proposals, documentation updates, or code changes — are welcome.

This guide explains how to work with the repository and the expectations for contributions.

---

## Table of Contents

1. Code of Conduct
2. Ways to Contribute
3. Development Setup
4. Project Structure
5. Coding Guidelines
6. Testing
7. Pull Request Process
8. Reporting Issues
9. Feature Requests

---

## 1. Code of Conduct

By participating in this project, you agree to uphold respectful and professional behavior.
Discussion should remain constructive and focused on improving the library.

---

## 2. Ways to Contribute

You can contribute in multiple ways:

- Reporting bugs
- Proposing new features
- Improving documentation
- Writing or improving tests
- Fixing issues or performance bottlenecks
- Reviewing pull requests

If you're unsure whether your idea fits, open an issue to discuss it first.

---

## 3. Development Setup

Clone the repository:

```
git clone https://github.com/callmegautam/deepit.git
cd deepit
```

Install dependencies:

```
npm install
```

Commands:

```
npm run build     # build the library
npm test          # run test suite
npm run lint      # run ESLint on source files
npm run format    # format files using Prettier
npm run dev       # development build with watch mode
```

Node 16 or higher is recommended.

---

## 4. Project Structure

```
src/
  clone.ts         # main clone engine
  index.ts         # public API surface
  handlers/        # object, collection handlers
tests/
  clone.spec.ts    # vitest test suite
```

---

## 5. Coding Guidelines

To maintain consistency and reliability:

### TypeScript

- Strict typing is required.
- Avoid unnecessary `any`; use generics and accurate types.
- Keep public APIs strongly typed.

### Style

- Follow Prettier for formatting.
- Follow ESLint rules for consistency.
- Keep functions small and focused.

### Architecture

- Avoid adding new dependencies unless essential.
- Keep clone logic predictable and explicit.
- Use pure functions whenever possible.
- Avoid “magic” behavior or cloning that violates JavaScript semantics.

### Commits

- Use clear, descriptive messages.
- Example:

  - `fix: handle typed array cloning for Uint32Array`
  - `feat: add maxDepth option`
  - `test: add coverage for circular refs in Map`

---

## 6. Testing

Tests are written with Vitest.

To run tests:

```
npm test
```

Contributions must include corresponding tests when:

- Adding a new feature
- Changing existing behavior
- Fixing a bug

All tests must pass before a pull request is merged.

---

## 7. Pull Request Process

1. Fork the repository and create a new branch:

   ```
   git checkout -b feature/my-change
   ```

2. Make your changes following the guidelines above.

3. Add or update tests as needed.

4. Ensure the project builds and passes all checks:

   ```
   npm run lint
   npm test
   npm run build
   ```

5. Submit a pull request with a clear explanation of:

   - The problem
   - The solution
   - Any alternative approaches considered

6. Be open to code review. The goal is to maintain high reliability.

---

## 8. Reporting Issues

When reporting a bug:

- Include a clear description.
- Provide minimal reproduction code.
- Specify Node version.
- Mention if it involves specific types: Map, Set, Date, RegExp, arrays, etc.

Bug reports without reproduction steps are difficult to resolve.

---

## 9. Feature Requests

For new features:

- Open an issue first to discuss design.
- Explain the use case and why it belongs in deepit.
- Proposals should align with project principles:

  - predictability
  - correctness
  - type safety
  - no cloning of functions or closures

After discussion, you can submit a PR implementing the approved feature.
