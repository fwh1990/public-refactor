export declare abstract class Demo {
    static readonly state: string;
    public/*protected*/ declare virtual1: string;
    public/*protected*/ declare virtual2: () => string;
    declare virtual3: string;
    public/*private*/ declare readonly virtual4: () => string;
    public/*private*/ readonly declare virtual5: { hello: number };
    public/*protected*/ static readonly state1: string;
    public/*private*/ static readonly state2: string;
    public static readonly /*private*/ state3: string;
    public/*protected*/ static hello: number;
    public static /*protected*/ hello6: number;
    public/*protected*/ static hello7?: number;
    public/*private*/ static hello1(): void;
    static hello23: number;
    public/*protected*/ static hello2: string;
    public static hello8: number;
    static hello9: any;
    props: number;
    props12: number;
    props345: number;
    public/*protected*/ props1: number;
    public/*protected*/ readonly props2: number;
    public/*protected*/ readonly props21?: number;
    public/*private*/ props3: string;
    props123: number;
    props3456: number;
    public/*private*/ props876: number;
    demo(): void;
    public/*protected*/ demo1(): void;
    public/*protected*/ demo2(): void;
    public/*private*/ demo3(): void;
    demo4(): void;
    public/*protected*/ abstract dem5(): void;
    public/*protected*/ demo7<T extends Function>(fn: T): T;

    public/*protected*/ demo8(): Promise<any>;
}
