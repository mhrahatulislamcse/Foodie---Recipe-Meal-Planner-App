import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from './RecipeCard';
import { Heart, ArrowLeft, UtensilsCrossed } from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const { allRecipes, favorites, goBack, navigateTo } = useRecipes();

  const favoriteRecipes = allRecipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-200 space-y-6">
      {/* Top Header with Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-stone-800 font-bold text-sm shadow-xs border border-stone-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700" />
          <span>Back</span>
        </button>

        <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>{favoriteRecipes.length} Saved</span>
        </span>
      </div>

      <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-xs">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            Favorites & Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Your personal collection of must-make dishes and saved inspirations.
          </p>
        </div>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} showActions={recipe.isCustom} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
          <UtensilsCrossed className="w-14 h-14 mx-auto text-stone-300 mb-3" />
          <h3 className="text-lg font-bold text-stone-800">No favorite recipes yet</h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mt-1 mb-6">
            Click the heart icon on any recipe in the feed to save it here for quick access!
          </p>
          <button
            onClick={() => navigateTo('feed')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md hover:bg-amber-700 transition-colors"
          >
            <span>Explore Recipes</span>
          </button>
        </div>
      )}
    </div>
  );
};
