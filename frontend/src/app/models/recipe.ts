export class Recipe {
  private _id: number | undefined;
  private _name: string | undefined;
  private _description: string | undefined;
  private _difficulty: number | undefined;
  private _cooking_time: string | undefined;
  private _preparation_time: string | undefined;
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

  public get description(): string | undefined {
    return this._description;
  }

  public set description(value: string | undefined) {
    this._description = value;
  }

  public get difficulty(): number | undefined {
    return this._difficulty;
  }

  public set difficulty(value: number | undefined) {
    this._difficulty = value;
  }

  public get cooking_time(): string | undefined {
    return this._cooking_time;
  }

  public set cooking_time(value: string | undefined) {
    this._cooking_time = value;
  }

  public get preparation_time(): string | undefined {
    return this._preparation_time;
  }

  public set preparation_time(value: string | undefined) {
    this._preparation_time = value;
  }

  public get instructions(): string | undefined {
    return this._instructions;
  }

  public set instructions(value: string | undefined) {
    this._instructions = value;
  }
}
