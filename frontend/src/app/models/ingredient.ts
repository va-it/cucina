export class Ingredient {
  private _id: number | undefined;
  private _name: string | undefined;
  private _quantity: string | undefined;

  constructor(source: Partial<Ingredient>) {
    Object.assign(this, source);
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(value: number | undefined) {
    this._id = value;
  }

  public get name(): string | undefined {
    return this._name;
  }

  public set name(value: string | undefined) {
    this._name = value;
  }

  public get quantity(): string | undefined {
    return this._quantity;
  }

  public set quantity(value: string | undefined) {
    this._quantity = value;
  }
}
