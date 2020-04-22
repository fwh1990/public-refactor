export abstract class Demo {
  public props: number = 3;

  public props12: number = 3;
  public props345: number = 3;

  public/*protected*/ props1 = 3;
  public/*protected*/ props2: number = 3;
  public/*private*/ props3 : string = '3';

  public props123: number = 3;
  public props3456: number = 3;

  public demo() {}

  public/*protected*/ demo1() {}

  public/*protected*/ demo2() {}

  public/*private*/ demo3() {}

  public demo4() {}

  public/*protected*/ abstract dem5(): void;
}
