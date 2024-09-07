export class Ingredient {
  public id: number | undefined;
  public name: string | undefined;
  public quantity: string | undefined;

  constructor(source: Partial<Ingredient>) {
    Object.assign(this, source);
  }
}
