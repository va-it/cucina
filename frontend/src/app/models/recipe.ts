import { Ingredient } from 'models/ingredient';

export class Recipe {
  private _id: number | undefined;
  private _name: string | undefined;
  private _instructions: string | undefined;
  private _ingredients: Ingredient[] | undefined;

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

  public get instructions(): string | undefined {
    return this._instructions;
  }

  public set instructions(value: string | undefined) {
    this._instructions = value;
  }

  public get ingredients(): Ingredient[] | undefined {
    return this._ingredients;
  }

  public set ingredients(value: Ingredient[] | undefined) {
    this._ingredients = value;
  }
}
