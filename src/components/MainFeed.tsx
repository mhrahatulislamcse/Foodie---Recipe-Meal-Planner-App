import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { CategoryBar } from './CategoryBar';
import { RecipeCard } from './RecipeCard';
import { CATEGORIES } from '../data/mockRecipes';
import { Sparkles, Utensils, Filter, Plus } from 'lucide-react';

interface MainFeedProps {
  searchQuery: string;
}

export const MainFeed: React.FC<MainFeedProps> = ({ searchQuery }) => {
  const { allRecipes, activeCategory, setActiveCategory, navigateTo } = useRecipes();

  // Filter recipes based on active category (Rubric Item 4) and optional search query
  const filteredRecipes = allRecipes.filter((recipe) => {
    // Category match
    const matchesCategory =
      activeCategory === 'all' ||
      recipe.category.toLowerCase() === activeCategory.toLowerCase();

    // Search query match
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const matchesName = recipe.name.toLowerCase().includes(q);
    const matchesIngredient = recipe.ingredients.some((ing) => ing.toLowerCase().includes(q));
    const matchesCat = recipe.category.toLowerCase().includes(q);

    return matchesName || matchesIngredient || matchesCat;
  });

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="space-y-6 pb-20">
      {/* Horizontal Categories Bar (Rubric Item 2 & 7) */}
      <CategoryBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Feed Header / Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore Top Handcrafted Recipes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display flex items-center gap-2">
              <span>{activeCategory === 'all' ? 'Featured Recipes' : `${activeCategoryObj?.name || activeCategory} Recipes`}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-sans font-bold">
                {filteredRecipes.length}
              </span>
            </h1>
          </div>

          {/* Quick Filter Info or Reset */}
          <div className="flex items-center gap-2">
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200/80 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-colors"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Show All Recipes</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('add-recipe')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Recipe</span>
            </button>
          </div>
        </div>

        {/* Recipe Cards Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} showActions={recipe.isCustom} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-4">
            <Utensils className="w-12 h-12 mx-auto text-amber-500/60" />
            <h3 className="text-lg font-bold text-stone-800">
              No recipes found for "{activeCategoryObj?.name || searchQuery}"
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto">
              Try choosing another category or create a custom recipe for this category right now!
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveCategory('all')}
                className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
              >
                Clear Category Filter
              </button>
              <button
                onClick={() => navigateTo('add-recipe')}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
              >
                Create New Recipe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
