export class Ingredient {
  public name: string | undefined;
  public quantity: string | undefined;

  constructor(source: Partial<Ingredient> | null) {
    Object.assign(this, source);
  }
}
