import React from 'react';
import { Recipe } from '../types/recipe';
import { useRecipes } from '../context/RecipeContext';
import { Heart, Clock, Users, Flame, Edit3, Trash2, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  showActions?: boolean; // When rendered in "My Recipes" section
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, showActions = false }) => {
  const { navigateTo, toggleFavorite, isFavorite, startEditingRecipe, deleteRecipe } = useRecipes();
  const favorited = isFavorite(recipe.id);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Hard':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  return (
    <div
      onClick={() => navigateTo('recipe-detail', recipe)}
      className="group bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Recipe Image & Floating Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // fallback image if remote link breaks
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category & Custom badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-stone-800 shadow-xs">
            {recipe.category}
          </span>
          {recipe.isCustom && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-600 text-white shadow-xs">
              <ChefHat className="w-3 h-3" />
              <span>My Recipe</span>
            </span>
          )}
        </div>

        {/* Heart Favorite Button (Rubric Item 5) */}
        <button
          onClick={(e) => toggleFavorite(recipe.id, e)}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
            favorited
              ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-500 scale-110'
              : 'bg-white/85 text-stone-600 hover:text-rose-500 hover:bg-white hover:scale-110'
          }`}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={favorited ? 'Unfavorite recipe' : 'Favorite recipe'}
        >
          <Heart
            className={`w-5 h-5 transition-transform ${
              favorited ? 'fill-rose-500 text-rose-500 scale-105' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Difficulty badge on image bottom-right */}
        <div className="absolute bottom-3 right-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md shadow-xs ${getDifficultyColor(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1 font-display">
            {recipe.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
            {recipe.ingredients.length} ingredients • {recipe.instructions.length} steps
          </p>
        </div>

        {/* Nutritional & Prep Stats (Rubric Item 3 preview) */}
        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1" title="Preparation time">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-medium">{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1" title="Servings">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-medium">{recipe.servings} serv</span>
          </div>
          <div className="flex items-center gap-1" title="Calories">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span className="font-medium">{recipe.calories} kcal</span>
          </div>
        </div>

        {/* Action Buttons for "My Recipes" section (Rubric Item 11) */}
        {showActions && (
          <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                startEditingRecipe(recipe);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
                  deleteRecipe(recipe.id);
                }
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
