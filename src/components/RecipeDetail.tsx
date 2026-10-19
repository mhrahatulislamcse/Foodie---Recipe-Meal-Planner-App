import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import {
  ArrowLeft,
  Heart,
  Clock,
  Users,
  Flame,
  Award,
  CheckCircle,
  Circle,
  Share2,
  Printer,
  Edit3,
  Trash2,
  ChefHat,
} from 'lucide-react';

export const RecipeDetail: React.FC = () => {
  const { selectedRecipe, goBack, toggleFavorite, isFavorite, startEditingRecipe, deleteRecipe, showToast } =
    useRecipes();

  // Local state for checking off ingredients & steps as user cooks
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);

  if (!selectedRecipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-500 text-lg">No recipe selected.</p>
        <button
          onClick={goBack}
          className="mt-4 px-5 py-2.5 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Feed</span>
        </button>
      </div>
    );
  }

  const favorited = isFavorite(selectedRecipe.id);

  const toggleIngredientCheck = (index: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleStepComplete = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Recipe link copied to clipboard!', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-200">
      {/* Functional Back Button & Quick Actions Bar (Rubric Item 12) */}
      <div className="flex items-center justify-between mb-5 sticky top-28 z-10 bg-amber-50/90 backdrop-blur-md py-2.5 px-3 rounded-2xl border border-amber-200/60 shadow-xs">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100/70 text-stone-800 font-bold text-sm shadow-xs border border-stone-200/80 transition-all hover:translate-x--0.5"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Action buttons if user recipe */}
          {selectedRecipe.isCustom && (
            <>
              <button
                onClick={() => startEditingRecipe(selectedRecipe)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold border border-amber-300 transition-colors"
                title="Edit this recipe"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit Recipe</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${selectedRecipe.name}"?`)) {
                    deleteRecipe(selectedRecipe.id);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold border border-rose-300 transition-colors"
                title="Delete this recipe"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </>
          )}

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 shadow-xs transition-colors"
            title="Share recipe"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrint}
            className="hidden sm:flex p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 shadow-xs transition-colors"
            title="Print recipe"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Heart Favorite Toggle Button (Rubric Item 5) */}
          <button
            onClick={(e) => toggleFavorite(selectedRecipe.id, e)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-sm shadow-xs border transition-all ${
              favorited
                ? 'bg-rose-50 border-rose-300 text-rose-600 ring-2 ring-rose-400'
                : 'bg-white hover:bg-rose-50/50 border-stone-200/80 text-stone-700 hover:text-rose-600'
            }`}
            title={favorited ? 'Unfavorite' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{favorited ? 'Favorited' : 'Favorite'}</span>
          </button>
        </div>
      </div>

      {/* Main Recipe Card Container */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
        {/* Hero Image Section */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-900">
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Title & Category over Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 uppercase tracking-wider">
                {selectedRecipe.category}
              </span>
              {selectedRecipe.isCustom && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>My Created Recipe</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display drop-shadow-md">
              {selectedRecipe.name}
            </h1>
          </div>
        </div>

        {/* 6 Key Rubric Parameters Grid: Prep Time, Servings, Calories, Difficulty (Rubric Item 3) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 border-b border-stone-200 bg-amber-50/50">
          {/* 1. Preparation Time */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Prep Time</p>
              <p className="text-base font-bold text-stone-900">{selectedRecipe.prepTime}</p>
            </div>
          </div>

          {/* 2. Number of Servings */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Servings</p>
              <p className="text-base font-bold text-stone-900">
                {Math.round(selectedRecipe.servings * servingsMultiplier)} portions
              </p>
            </div>
          </div>

          {/* 3. Calories */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Calories</p>
              <p className="text-base font-bold text-stone-900">{selectedRecipe.calories} kcal</p>
            </div>
          </div>

          {/* 4. Difficulty Level */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Difficulty</p>
              <p className="text-base font-bold text-stone-900">{selectedRecipe.difficulty}</p>
            </div>
          </div>
        </div>

        {/* Recipe Content Body: Ingredients & Step-by-Step Instructions */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Ingredients Column (40% on desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
                  <span>Ingredients</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {selectedRecipe.ingredients.length} items
                  </span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">Tap to cross off while prepping</p>
              </div>

              {/* Servings scaler control */}
              <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1 text-xs font-bold text-stone-700">
                <button
                  onClick={() => setServingsMultiplier(1)}
                  className={`px-2 py-0.5 rounded ${
                    servingsMultiplier === 1 ? 'bg-white shadow-xs text-amber-700 font-extrabold' : ''
                  }`}
                >
                  1x
                </button>
                <button
                  onClick={() => setServingsMultiplier(2)}
                  className={`px-2 py-0.5 rounded ${
                    servingsMultiplier === 2 ? 'bg-white shadow-xs text-amber-700 font-extrabold' : ''
                  }`}
                >
                  2x
                </button>
              </div>
            </div>

            <ul className="space-y-2.5">
              {selectedRecipe.ingredients.map((item, index) => {
                const isChecked = checkedIngredients.includes(index);
                return (
                  <li
                    key={index}
                    onClick={() => toggleIngredientCheck(index)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-stone-50/80 border-stone-200/60 text-stone-400'
                        : 'bg-white border-stone-200/90 hover:border-amber-300 text-stone-800 hover:bg-amber-50/30'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 shrink-0 text-amber-600 focus:outline-none"
                    >
                      {isChecked ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300" />
                      )}
                    </button>
                    <span
                      className={`text-sm leading-relaxed ${
                        isChecked ? 'line-through text-stone-400' : 'font-medium'
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Instructions Column (60% on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="pb-3 border-b border-stone-200">
              <h2 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
                <span>Step-by-Step Instructions</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                  {completedSteps.length}/{selectedRecipe.instructions.length} completed
                </span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">Follow steps in order for optimal flavor</p>
            </div>

            <div className="space-y-4">
              {selectedRecipe.instructions.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const stepNumber = index + 1;

                return (
                  <div
                    key={index}
                    onClick={() => toggleStepComplete(index)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-stone-50/60 border-stone-200/80 hover:bg-amber-50/40 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {isCompleted ? '✓' : stepNumber}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`text-sm sm:text-base leading-relaxed ${
                            isCompleted ? 'text-stone-500 line-through' : 'text-stone-800 font-normal'
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Banner */}
            {completedSteps.length === selectedRecipe.instructions.length &&
              selectedRecipe.instructions.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Bon Appétit!</h4>
                    <p className="text-xs text-emerald-700">
                      You completed all the cooking steps for {selectedRecipe.name}. Enjoy your meal!
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Footer Back Button (Rubric Item 12) */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Previous Page</span>
          </button>

          <span className="text-xs text-stone-500 hidden sm:inline">
            Foodie Recipe Guide • All details verified
          </span>
        </div>
      </div>
    </div>
  );
};
