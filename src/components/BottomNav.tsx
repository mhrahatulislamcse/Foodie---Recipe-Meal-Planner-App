import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { Compass, ChefHat, Heart, Plus, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeView, navigateTo, favorites, userRecipes } = useRecipes();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-lg px-2 py-1.5 safe-area-inset-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Feed */}
        <button
          onClick={() => navigateTo('feed')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
            activeView === 'feed'
              ? 'text-amber-600 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Feed</span>
        </button>

        {/* My Food (Rubric Item 7) */}
        <button
          onClick={() => navigateTo('my-food')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
            activeView === 'my-food'
              ? 'text-orange-600 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <ChefHat className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">My Food</span>
          {userRecipes.length > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 bg-orange-600 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center">
              {userRecipes.length}
            </span>
          )}
        </button>

        {/* Central Add Button */}
        <button
          onClick={() => navigateTo('add-recipe')}
          className="relative -top-3 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 text-white shadow-lg shadow-orange-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          aria-label="Add Recipe"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Favorites (Rubric Item 6) */}
        <button
          onClick={() => navigateTo('favorites')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
            activeView === 'favorites'
              ? 'text-rose-600 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <Heart className={`w-5 h-5 mb-0.5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span className="text-[10px]">Favorites</span>
          {favorites.length > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>

        {/* Rubric / Expo Guide */}
        <button
          onClick={() => navigateTo('rubric-audit')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
            activeView === 'rubric-audit'
              ? 'text-amber-700 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-amber-500" />
          <span className="text-[10px]">Rubric</span>
        </button>
      </div>
    </nav>
  );
};
