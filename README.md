# deepit

**deepit** is a predictable, safe deep-clone utility for JavaScript and TypeScript.
It performs structural deep cloning of complex data types while preserving prototypes, property descriptors, circular references, Maps, Sets, Dates, RegExps, ArrayBuffers, typed arrays, and more.

The library intentionally does **not** attempt to clone functions or closures. Functions are always copied by reference, consistent with JavaScript semantics and the behavior of established libraries.

deepit is written in TypeScript, thoroughly tested, and built for real production workloads.

---

## Features

- Deep cloning of objects, arrays, and nested structures.
- Prototype preservation (supports classes and custom prototypes).
- Property descriptor preservation, including getters and setters.
- Circular reference handling.
- Full support for Map and Set.
- Full support for Date and RegExp.
- Support for ArrayBuffer and typed arrays.
- Typed, predictable API.
- Functions are never cloned; they are copied by reference.
- Zero dependencies.
- ESM and CJS output builds.

---

## Installation

```
npm install deepit
```

or

```
yarn add deepit
```

or

```
pnpm add deepit
```

---

## Quick Example

```ts
import { clone } from 'deepit';

const input = {
  value: 1,
  nested: { a: 2 },
  map: new Map([['k', { x: 10 }]]),
  date: new Date(),
};

const output = clone(input);
```

The resulting object is deeply cloned, structurally identical, prototype-safe, and independent.

---

## API

### `clone<T>(value: T, options?: CloneOptions): T`

Performs a deep, structural clone of the provided value.
Prototypes, descriptors, and supported built-in types are preserved.

#### Parameters

`value`
The input value to clone.

`options`
Optional configuration.

#### CloneOptions

```ts
interface CloneOptions {
  maxDepth?: number | null;
  skipKeys?: string[];
}
```

- `maxDepth`: Controls recursion depth.
  When `null` (default), there is no limit.
  When set to a number, the clone operation will throw if it exceeds that depth.
- `skipKeys`: An array of property names to omit from the cloned result.
  Useful for removing sensitive or unnecessary data while cloning deeply.

#### Return value

Returns a deep, independent copy of the input value, with the following rules:

- Objects and arrays are cloned deeply.
- Maps and Sets are cloned with their entries deeply cloned.
- Prototypes and property descriptors are preserved.
- Functions are copied by reference.
- WeakMap and WeakSet are not cloned (they are left as references).
- Circular references in the input are preserved.

---

## Supported Types

| Type        | Behavior                                      |
| ----------- | --------------------------------------------- |
| Object      | Cloned with prototype + descriptors preserved |
| Array       | Deep cloned                                   |
| Map         | Deep cloned (keys and values)                 |
| Set         | Deep cloned (values)                          |
| Date        | Cloned                                        |
| RegExp      | Cloned                                        |
| ArrayBuffer | Copied                                        |
| TypedArray  | Copied                                        |
| Error       | Cloned (name, message, stack)                 |
| Function    | Copied by reference                           |
| WeakMap     | Reference preserved                           |
| WeakSet     | Reference preserved                           |

---

## Design Principles

### Predictability

deepit avoids any behavior that could create ambiguous or incorrect clones, such as replicating closures or attempting to re-generate function internals.

### Structural fidelity

The clone matches the original object's shape, descriptors, and prototypes.

### Type safety

The implementation and API are written entirely in TypeScript and designed to maintain strong type guarantees.

### Zero dependencies

The implementation is self-contained to avoid dependency security risks and reduce bundle size.

---

## Limitations

These are intentional constraints that maintain correctness:

- Functions are not cloned; they are copied by reference.
- Closures cannot be cloned because JavaScript does not expose closure environments.
- WeakMap and WeakSet cannot be cloned because their contents are not observable.
- DOM nodes are not handled; deepit focuses on JavaScript data structures.

---

## Contributing

Contributions are welcome.
Please follow these steps:

1. Fork the repository.
2. Create a feature branch with a descriptive name.
3. Add or update tests for all behavior changes.
4. Ensure `npm test` and `npm run lint` pass.
5. Submit a pull request with a clear explanation of the changes.

Issues, feature requests, and bug reports should include reproducible examples where possible.

---

## Development

### Build

```
npm run build
```

### Test

```
npm test
```

### Lint and Format

```
npm run lint
npm run format
```

---

## Project Structure

```
src/
  index.ts
  clone.ts
  handlers/
    object.ts
    collection.ts
tests/
  clone.spec.ts
```

---

## Versioning

deepit follows semantic versioning (semver):

- Patch versions for fixes and safe refactors.
- Minor versions for new capabilities.
- Major versions for breaking changes.

---

## Author

deepit is developed and maintained by **Gautam Suthar**.
Focused on building reliable developer tooling, high-performance JavaScript utilities, and clean architectural patterns.

---

## License

MIT License.
See the `LICENSE` file for details.
