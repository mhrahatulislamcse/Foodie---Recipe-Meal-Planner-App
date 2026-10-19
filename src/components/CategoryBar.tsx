import React, { useRef } from 'react';
import { CATEGORIES } from '../data/mockRecipes';
import { useRecipes } from '../context/RecipeContext';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { activeCategory, setActiveCategory, allRecipes, userRecipes, navigateTo } = useRecipes();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return allRecipes.length;
    if (catId === 'my-food') return userRecipes.length;
    return allRecipes.filter((r) => r.category.toLowerCase() === catId.toLowerCase()).length;
  };

  return (
    <div className="relative w-full border-b border-amber-200/60 bg-white/80 backdrop-blur-md sticky top-16 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-stone-700 shadow-xs border border-amber-200/80 shrink-0 transition-colors"
          title="Scroll categories left"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Horizontal Category Strip */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full"
        >
          {CATEGORIES.map((cat) => {
            const isMyFood = cat.id === 'my-food';
            const isActive = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0 select-none ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 scale-[1.02]'
                    : isMyFood
                    ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/20 text-orange-700 hover:bg-orange-100 border border-orange-300 font-bold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 border border-transparent'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : isMyFood
                      ? 'bg-orange-200/70 text-orange-800'
                      : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'
                  }`}
                >
                  {count}
                </span>
                {isMyFood && (
                  <span className="hidden sm:inline-flex items-center text-[11px] bg-orange-600 text-white px-1.5 py-0.5 rounded-md font-bold">
                    My Hub
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-stone-700 shadow-xs border border-amber-200/80 shrink-0 transition-colors"
          title="Scroll categories right"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Quick Add Recipe action right next to category bar */}
        <button
          onClick={() => navigateTo('add-recipe')}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 shadow-xs transition-colors ml-1"
          title="Add New Recipe"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Recipe</span>
        </button>
      </div>
    </div>
  );
};
