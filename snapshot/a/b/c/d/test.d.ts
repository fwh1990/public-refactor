export declare abstract class Demo {
    protected static hello: number;
    protected virtual1: string;
    protected virtual2: () => string;
    virtual3: string;
    private readonly virtual4: () => string;
    private readonly virtual5: {
        hello: number;
    };
    private static hello1(): void;
    static hello23: number;
    protected static hello234?: number;
    protected static hello2: string;
    static hello8: number;
    static hello9: any;
    props: number;
    props12: number;
    protected props1234?: number;
    props345: number;
    protected props1: number;
    protected readonly props2: number;
    private props3: string;
    props123: number;
    props3456: number;
    private props876: number;
    demo(): void;
    demo1_1(demo1: number): void;
    demo1_2(demo1: string, demo2: number): void;
    protected demo1(): void;
    protected demo2(): void;
    private demo3(): void;
    demo4(): void;
    protected abstract dem5(): void;
    protected dem6: () => void;
    protected demo7<T extends Function>(fn: T): T;
    protected demo8(): Promise<any>;
}
