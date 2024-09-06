export class Recipe {
  private _id: number | undefined;
  private _name: string | undefined;
  private _time: string | undefined;
  private _instructions: string | undefined;

  constructor(source: Partial<Recipe>) {
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

  public get time(): string | undefined {
    return this._time;
  }

  public set time(value: string | undefined) {
    this._time = value;
  }

  public get instructions(): string | undefined {
    return this._instructions;
  }

  public set instructions(value: string | undefined) {
    this._instructions = value;
  }
}
