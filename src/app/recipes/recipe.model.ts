import { Ingredient } from "../shared/ingrdient.model";

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) { }
}