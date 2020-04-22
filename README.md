# Installation

```bash
yarn add public-refactor --dev
```

# Usage

### Create source file `src/index.ts`

```typescript
export class Demo {
  public demo() {}

  public/*protected*/ demo1() {}

  public/*protected*/ demo2() {}

  public/*private*/ demo3() {}

}
```

### Compile to js
```bash
npx tsc --rootDir ./src --outDir ./build
```

You get 2 files in `./build` directory
```
- build
    - index.js
    - index.d.ts
```

### Transform
```bash
npx public-refactor --src ./src --dist ./build
```

### Final output to file `./build/index.d.ts`
```typescript
export declare class Demo {
    demo(): void;
    protected demo1(): void;
    protected demo2(): void;
    private demo3(): void;
    demo4(): void;
}

```
