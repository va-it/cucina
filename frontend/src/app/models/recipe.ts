export class Recipe {
  private _id: number | undefined;
  private _name: string | undefined;

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

  constructor(id: number | undefined, name: string | undefined) {
    this.id = id !== null ? id : undefined;
    this.name = name !== null ? name : undefined;
  }
}
