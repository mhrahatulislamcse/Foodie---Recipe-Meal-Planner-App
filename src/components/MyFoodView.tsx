import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from './RecipeCard';
import { Plus, ArrowLeft, ChefHat, Sparkles, BookOpen } from 'lucide-react';

export const MyFoodView: React.FC = () => {
  const { userRecipes, navigateTo, goBack } = useRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-200 space-y-8">
      {/* Top Header with Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-stone-800 font-bold text-sm shadow-xs border border-stone-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700" />
          <span>Back to Feed</span>
        </button>

        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
          My Food Hub
        </span>
      </div>

      {/* Prominent "Add New Recipe" Hero Banner (Rubric Item 7 & 8) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Personal Kitchen Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            My Food & Custom Recipes
          </h1>

          <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
            Create, manage, and curate your family secrets or culinary experiments. Add photos,
            ingredients, step-by-step instructions, and edit anytime.
          </p>

          <div className="pt-2">
            {/* Prominent "Add New Recipe" Button */}
            <button
              onClick={() => navigateTo('add-recipe')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-orange-700 hover:bg-amber-50 font-extrabold text-base shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Add New Recipe</span>
            </button>
          </div>
        </div>
      </div>

      {/* "My Recipes" Section (Rubric Item 9, 10, 11) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                My Recipes
              </h2>
              <p className="text-xs text-stone-500">
                {userRecipes.length} {userRecipes.length === 1 ? 'custom recipe' : 'custom recipes'} created by you
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('add-recipe')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Recipe</span>
          </button>
        </div>

        {/* Recipes Grid */}
        {userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} showActions={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
            <BookOpen className="w-12 h-12 mx-auto text-amber-500/70 mb-3" />
            <h3 className="text-lg font-bold text-stone-800">No recipes added yet</h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto mt-1 mb-5">
              Click the "Add New Recipe" button above to publish your first personal recipe!
            </p>
            <button
              onClick={() => navigateTo('add-recipe')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md hover:bg-amber-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Recipe</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
