export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string; // e.g. 'Italian', 'Mexican', etc.
  prepTime: string; // e.g. '25 mins'
  servings: number; // e.g. 4
  calories: number; // e.g. 450
  difficulty: DifficultyLevel;
  ingredients: string[];
  instructions: string[];
  isCustom?: boolean; // created by user in "My Recipes"
  createdAt?: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  isSpecial?: boolean;
}

export type ActiveView = 
  | 'feed' 
  | 'recipe-detail' 
  | 'my-food' 
  | 'favorites' 
  | 'add-recipe' 
  | 'edit-recipe'
  | 'rubric-audit';
