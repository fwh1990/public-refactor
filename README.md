# Installation

```bash
yarn add public-refactor --dev
```

# Usage

### Create source file `src/index.ts`

```typescript
export class Demo {
  public props: number = 3;
  public props12: number = 3;
  public props345 = 3;
  public/*protected*/ props1 = 3;
  public/*protected*/ readonly props2: number = 3;
  public/*private*/ props3 : string = '3';
  public props123: number = 3;
  public props3456: number = 3;

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
    props: number;
    props12: number;
    props345: number;
    protected props1: number;
    protected readonly props2: number;
    private props3: string;
    props123: number;
    props3456: number;
    demo(): void;
    protected demo1(): void;
    protected demo2(): void;
    private demo3(): void;
    demo4(): void;
}

```
