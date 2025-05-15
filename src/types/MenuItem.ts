export interface MenuItem {
  id: string;
  name: string;
  ingredients: {
    ingredientId: string;
    quantity: number;
  }[];
}