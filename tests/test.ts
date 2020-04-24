export abstract class Demo {
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
