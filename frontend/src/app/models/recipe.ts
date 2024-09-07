import { Ingredient } from 'models/ingredient';

export class Recipe {
  public id: number | undefined;
  public name: string | undefined;
  public instructions: string | undefined;
  public ingredients: Ingredient[] | undefined;

  constructor(source: Partial<Recipe> | null) {
    Object.assign(this, source);
  }
}
