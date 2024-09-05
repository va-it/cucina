export class Recipe {
  private _id: number | undefined;
  private _name: string | undefined;

  public get id(): number | undefined {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get name(): string | undefined {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
