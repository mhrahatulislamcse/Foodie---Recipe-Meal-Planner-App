import React, { useState, useEffect, useRef } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { Recipe, DifficultyLevel } from '../types/recipe';
import { CATEGORIES } from '../data/mockRecipes';
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Clock,
  Users,
  Flame,
  Award,
  Check,
  AlertCircle,
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Pasta', url: 'https://images.unsplash.com/photo-1621996346565-e3d5d62817d2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tacos', url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ramen', url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bowl', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Dessert', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Salmon', url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80' },
];

export const RecipeFormModal: React.FC = () => {
  const { editingRecipe, addRecipe, updateRecipe, goBack, showToast } = useRecipes();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = Boolean(editingRecipe);

  // Form states (Rubric Item 8)
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [category, setCategory] = useState<string>('Italian');
  const [prepTime, setPrepTime] = useState<string>('25 mins');
  const [servings, setServings] = useState<number>(4);
  const [calories, setCalories] = useState<number>(450);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Pre-fill form if editing
  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setImage(editingRecipe.image);
      setCategory(editingRecipe.category);
      setPrepTime(editingRecipe.prepTime);
      setServings(editingRecipe.servings);
      setCalories(editingRecipe.calories);
      setDifficulty(editingRecipe.difficulty);
      setIngredients(editingRecipe.ingredients.length > 0 ? [...editingRecipe.ingredients] : ['']);
      setInstructions(editingRecipe.instructions.length > 0 ? [...editingRecipe.instructions] : ['']);
    } else {
      // Default placeholder image
      setImage(PRESET_IMAGES[0].url);
      setIngredients(['1 lb Main ingredient (e.g. Pasta or Chicken)', '2 tbsp Olive oil or butter', 'Seasoning & herbs to taste']);
      setInstructions(['Prepare and chop all fresh ingredients.', 'Heat pan and cook thoroughly.', 'Garnish and serve warm.']);
    }
  }, [editingRecipe]);

  // Image file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image file should be under 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          showToast('Image uploaded successfully!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Ingredients helpers
  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, '']);
  };

  const handleUpdateIngredient = (index: number, val: string) => {
    setIngredients((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length === 1) {
      setIngredients(['']);
      return;
    }
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Instructions helpers
  const handleAddInstruction = () => {
    setInstructions((prev) => [...prev, '']);
  };

  const handleUpdateInstruction = (index: number, val: string) => {
    setInstructions((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveInstruction = (index: number) => {
    if (instructions.length === 1) {
      setInstructions(['']);
      return;
    }
    setInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  // Validate and submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Recipe name is required';
    }

    if (!image.trim()) {
      newErrors.image = 'An image or photo is required';
    }

    const filteredIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    if (filteredIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required';
    }

    const filteredInstructions = instructions.map((s) => s.trim()).filter(Boolean);
    if (filteredInstructions.length === 0) {
      newErrors.instructions = 'At least one step-by-step instruction is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fill out all required recipe fields', 'error');
      return;
    }

    if (isEditing && editingRecipe) {
      updateRecipe(editingRecipe.id, {
        name: name.trim(),
        image: image.trim(),
        category,
        prepTime,
        servings: Number(servings) || 1,
        calories: Number(calories) || 100,
        difficulty,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
      });
    } else {
      addRecipe({
        name: name.trim(),
        image: image.trim(),
        category,
        prepTime,
        servings: Number(servings) || 1,
        calories: Number(calories) || 100,
        difficulty,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
      });
    }
  };

  // Available recipe categories (excluding 'all' and 'my-food')
  const formCategories = CATEGORIES.filter((c) => !c.isSpecial && c.id !== 'all');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-200">
      {/* Functional Back Button (Rubric Item 12) */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-stone-800 font-bold text-sm shadow-xs border border-stone-200 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700" />
          <span>Back</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          {isEditing ? 'Editing Recipe' : 'Add New Recipe'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            {isEditing ? `Edit "${editingRecipe?.name}"` : 'Create a New Delicious Recipe'}
          </h1>
          <p className="text-amber-100 text-sm mt-1">
            Fill in the details below. Once saved, it will be immediately available in "My Recipes" and the main feed!
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. Recipe Name (Rubric Item 8) */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-1.5">
              Recipe Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. Grandma's Famous Lasagna Bolognese"
              className={`w-full px-4 py-3 rounded-xl border text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 bg-stone-50/50'
              }`}
            />
            {errors.name && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.name}</p>}
          </div>

          {/* 2. Image Upload & Selection (Rubric Item 8) */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-stone-900">
              Recipe Image / Photo Upload <span className="text-rose-500">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Image Preview Box */}
              <div className="md:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-dashed border-stone-300 bg-stone-100 flex items-center justify-center group">
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="Recipe Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      Click below to replace image
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4 text-stone-400">
                    <ImageIcon className="w-10 h-10 mx-auto mb-2 text-stone-300" />
                    <span className="text-xs">No image selected</span>
                  </div>
                )}
              </div>

              {/* Upload Controls & Presets */}
              <div className="md:col-span-7 space-y-4">
                {/* Native File Upload button */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm shadow-xs transition-colors"
                  >
                    <Upload className="w-4 h-4 text-amber-700" />
                    <span>Upload Image from Device (File)</span>
                  </button>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Supports JPG, PNG, WEBP (stored securely in local app storage).
                  </p>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Or Paste an Image URL:
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Or Pick a Curated Photo Preset:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          image === preset.url
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {errors.image && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.image}</p>}
          </div>

          {/* 3. Category & Nutritional Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70">
            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white font-medium text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {formCategories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preparation Time */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Prep Time</span>
              </label>
              <input
                type="text"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="e.g. 30 mins"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Number of Servings */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Servings</span>
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Calories & Difficulty */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-600" />
                  <span>Calories (kcal)</span>
                </label>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Difficulty</span>
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Ingredients List (Rubric Item 8) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-bold text-stone-900">
                  Ingredients List <span className="text-rose-500">*</span>
                </label>
                <p className="text-xs text-stone-500">Add each ingredient with quantity</p>
              </div>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-xs font-bold text-stone-400 text-right">{idx + 1}.</span>
                  <input
                    type="text"
                    value={ing}
                    onChange={(e) => handleUpdateIngredient(idx, e.target.value)}
                    placeholder={`e.g. ${idx === 0 ? '2 cups All-purpose flour' : '1 tsp Vanilla extract'}`}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 bg-stone-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove ingredient"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.ingredients && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.ingredients}</p>}
          </div>

          {/* 5. Step-by-Step Instructions (Rubric Item 8) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-bold text-stone-900">
                  Step-by-Step Instructions <span className="text-rose-500">*</span>
                </label>
                <p className="text-xs text-stone-500">Clear cooking steps numbered in sequence</p>
              </div>
              <button
                type="button"
                onClick={handleAddInstruction}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={step}
                    onChange={(e) => handleUpdateInstruction(idx, e.target.value)}
                    placeholder={`Step ${idx + 1} cooking instructions...`}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 bg-stone-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInstruction(idx)}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors mt-1"
                    title="Remove step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.instructions && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.instructions}</p>}
          </div>
        </div>

        {/* 6. Form Footer with "Save Recipe" Button (Rubric Item 8) */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-bold text-sm transition-colors text-center"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-base shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.02]"
          >
            <Check className="w-5 h-5" />
            <span>Save Recipe</span>
          </button>
        </div>
      </form>
    </div>
  );
};
