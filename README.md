# public-refactor

Refactor public modifier to protected or private in "*.d.ts" files after run tsc.

# Installation

```bash
yarn add public-refactor --dev
```

# Usage

### Create source file `src/index.ts`

```typescript
export class Demo {
  static readonly state: string;
  public/*protected*/ static readonly state1: string;
  public/*private*/ static readonly state2: string;
  public/*protected*/ static hello: number = 1;
  public/*private*/ static hello1(): void {};
  public static hello23: number = 2;
  public/*protected*/ static hello2: string = '2';
  public static hello8 = 3;
  public static hello9;

  public props: number = 3;
  public props12: number = 3;
  public props345 = 3;
  public/*protected*/ props1 = 3;
  public/*protected*/ readonly props2: number = 3;
  public/*private*/ props3 : string = '3';
  public props123: number = 3;
  public props3456: number = 3;
  public/*private*/ props876!: number;

  public demo() {}
  public/*protected*/ demo1() {}
  public/*protected*/ demo2() {}
  public/*private*/ demo3() {}
  public demo4() {}
  public/*protected*/ abstract dem5(): void;
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
    static readonly state: string;
    protected static readonly state1: string;
    private static readonly state2: string;
    protected static hello: number;
    private static hello1(): void;
    static hello23: number;
    protected static hello2: string;
    static hello8: number;
    static hello9: any;

    props: number;
    props12: number;
    props345: number;
    protected props1: number;
    protected readonly props2: number;
    private props3: string;
    props123: number;
    props3456: number;
    private props876: number;

    demo(): void;
    protected demo1(): void;
    protected demo2(): void;
    private demo3(): void;
    demo4(): void;
    protected abstract dem5(): void;
}

```
