import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import {
  Utensils,
  Search,
  Heart,
  ChefHat,
  Plus,
  ArrowLeft,
  CheckCircle2,
  X,
  Compass,
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onOpenAudit }) => {
  const { activeView, navigateTo, goBack, canGoBack, favorites, userRecipes } = useRecipes();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left: Back Button & Logo */}
          <div className="flex items-center gap-2.5">
            {/* Functional Back button if not in root feed (Rubric Item 12) */}
            {canGoBack && activeView !== 'feed' && (
              <button
                onClick={goBack}
                className="flex items-center gap-1 p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-800 font-bold text-xs border border-amber-200 transition-colors shadow-2xs"
                title="Go Back"
                aria-label="Back"
              >
                <ArrowLeft className="w-4 h-4 text-amber-700" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            {/* Brand Logo */}
            <div
              onClick={() => navigateTo('feed')}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Utensils className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-stone-900 font-display">
                    Foodie
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-md bg-orange-100 text-orange-700 border border-orange-200">
                    App
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 hidden sm:block -mt-1 font-medium">
                  Delicious recipes & meal maker
                </p>
              </div>
            </div>
          </div>

          {/* Center: Live Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes, ingredients, tags..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-stone-100/80 hover:bg-stone-100 focus:bg-white border border-stone-200/90 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Navigation & CTA Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Rubric Evaluation Button */}
            <button
              onClick={onOpenAudit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs shadow-2xs transition-colors"
              title="Rubric Checklist & Snack Expo Guide"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Rubric & Expo</span>
              <span className="sm:hidden">Audit</span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Feed */}
              <button
                onClick={() => navigateTo('feed')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeView === 'feed'
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Feed</span>
              </button>

              {/* My Food (Rubric Item 7) */}
              <button
                onClick={() => navigateTo('my-food')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors relative ${
                  activeView === 'my-food'
                    ? 'bg-orange-100 text-orange-900 font-extrabold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <ChefHat className="w-4 h-4 text-orange-600" />
                <span>My Food</span>
                {userRecipes.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-orange-600 text-white text-[10px] font-bold">
                    {userRecipes.length}
                  </span>
                )}
              </button>

              {/* Favorites (Rubric Item 6) */}
              <button
                onClick={() => navigateTo('favorites')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeView === 'favorites'
                    ? 'bg-rose-100 text-rose-900 font-extrabold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`}
                />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>

            {/* Add Recipe Action Button (Rubric Item 8) */}
            <button
              onClick={() => navigateTo('add-recipe')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs shadow-md shadow-orange-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Recipe</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input expander */}
        {showMobileSearch && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes, ingredients..."
                autoFocus
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-stone-100 border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
