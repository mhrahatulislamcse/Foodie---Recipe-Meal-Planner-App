import { CategoryItem, Recipe } from '../types/recipe';

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All Recipes', icon: '🍽️' },
  { id: 'my-food', name: 'My Food', icon: '🍳', isSpecial: true },
  { id: 'Italian', name: 'Italian', icon: '🍝' },
  { id: 'Mexican', name: 'Mexican', icon: '🌮' },
  { id: 'Asian', name: 'Asian', icon: '🍜' },
  { id: 'Healthy', name: 'Healthy', icon: '🥗' },
  { id: 'Breakfast', name: 'Breakfast', icon: '🥞' },
  { id: 'Desserts', name: 'Desserts', icon: '🍰' },
  { id: 'Burgers', name: 'Burgers', icon: '🍔' },
  { id: 'Seafood', name: 'Seafood', icon: '🦐' },
  { id: 'Vegetarian', name: 'Vegetarian', icon: '🥑' },
  { id: 'Drinks', name: 'Drinks', icon: '🍹' },
  { id: 'BBQ', name: 'BBQ & Grill', icon: '🍖' },
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    name: 'Creamy Tuscan Garlic Chicken Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62817d2?auto=format&fit=crop&w=1000&q=80',
    category: 'Italian',
    prepTime: '25 mins',
    servings: 4,
    calories: 580,
    difficulty: 'Medium',
    ingredients: [
      '1 lb Fettuccine or Penne pasta',
      '2 large Chicken breasts, sliced into strips',
      '2 cups Fresh baby spinach',
      '1 cup Heavy cream',
      '1/2 cup Sun-dried tomatoes, drained and sliced',
      '4 cloves Garlic, finely minced',
      '1/2 cup Grated Parmesan cheese',
      '2 tbsp Extra virgin olive oil',
      '1 tsp Italian seasoning',
      'Salt and freshly cracked black pepper to taste'
    ],
    instructions: [
      'Cook pasta in a large pot of salted boiling water according to package directions until al dente. Drain and reserve 1/2 cup pasta water.',
      'Season chicken strips with Italian seasoning, salt, and black pepper.',
      'Heat olive oil in a large skillet over medium-high heat. Sear chicken until golden and cooked through (6-8 minutes). Transfer to a plate.',
      'In the same skillet, add minced garlic and sun-dried tomatoes. Sauté for 1 minute until fragrant.',
      'Pour in heavy cream and bring to a gentle simmer. Stir in grated Parmesan until smooth and melted.',
      'Toss in fresh baby spinach and allow it to wilt in the cream sauce for 2 minutes.',
      'Return chicken and drained pasta into the skillet, toss gently to coat, and serve hot with extra Parmesan.'
    ]
  },
  {
    id: 'rec-2',
    name: 'Authentic Street Tacos al Pastor',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80',
    category: 'Mexican',
    prepTime: '30 mins',
    servings: 6,
    calories: 420,
    difficulty: 'Medium',
    ingredients: [
      '1.5 lbs Pork shoulder, thinly sliced',
      '12 Mini corn tortillas',
      '1 cup Fresh pineapple, diced into small cubes',
      '1/2 medium White onion, finely chopped',
      '1/2 cup Fresh cilantro, chopped',
      '3 tbsp Achiote paste',
      '2 tbsp Apple cider vinegar',
      '2 cloves Garlic, crushed',
      '2 Fresh limes, cut into wedges',
      'Salsa verde for serving'
    ],
    instructions: [
      'Blend achiote paste, apple cider vinegar, crushed garlic, and a pinch of salt to form a smooth marinade.',
      'Coat pork slices with the marinade and let sit for 15-20 minutes.',
      'Heat a cast-iron skillet over high heat. Sear the marinated pork strips until slightly charred and cooked through (3-4 mins per side).',
      'In the same pan, briefly sear the diced pineapple chunks until caramelized edges form.',
      'Warm the corn tortillas on a dry skillet until pliable.',
      'Assemble tacos with charred pork, grilled pineapple, raw diced white onion, and chopped cilantro.',
      'Squeeze fresh lime juice over top and serve immediately with salsa verde.'
    ]
  },
  {
    id: 'rec-3',
    name: 'Traditional Tokyo Shoyu Ramen',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    category: 'Asian',
    prepTime: '40 mins',
    servings: 2,
    calories: 620,
    difficulty: 'Hard',
    ingredients: [
      '2 portions Fresh ramen noodles',
      '4 cups Rich chicken or dashi stock',
      '3 tbsp Japanese soy sauce (Shoyu)',
      '1 tbsp Mirin',
      '1 tsp Sesame oil',
      '2 soft-boiled marinated Ramen eggs (Ajitsuke Tamago), halved',
      '4 slices Chashu pork belly',
      '1 sheet Nori seaweed, cut into rectangles',
      '2 stalks Green onions, finely sliced',
      '1/4 cup Menma (seasoned bamboo shoots)'
    ],
    instructions: [
      'In a medium saucepot, combine chicken stock, soy sauce, mirin, and sesame oil. Simmer gently on low heat for 15 minutes to marry flavors.',
      'Bring another pot of water to a rolling boil and cook fresh ramen noodles for 90 seconds (firm bite). Drain thoroughly.',
      'Divide hot ramen noodles between two deep ramen bowls.',
      'Ladle piping hot Shoyu broth over the noodles.',
      'Carefully arrange chashu pork belly slices, marinated soft-boiled egg halves, bamboo shoots, and green onions on top.',
      'Tuck a crisp nori square into the side of the bowl and serve piping hot.'
    ]
  },
  {
    id: 'rec-4',
    name: 'Superfood Quinoa Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    category: 'Healthy',
    prepTime: '20 mins',
    servings: 2,
    calories: 390,
    difficulty: 'Easy',
    ingredients: [
      '1 cup Cooked tri-color quinoa',
      '1 ripe Avocado, sliced',
      '1 can (15 oz) Chickpeas, rinsed and roasted',
      '1 cup Cherry tomatoes, halved',
      '1 cup Shredded purple cabbage',
      '1 English cucumber, sliced',
      '2 tbsp Tahini',
      '1 tbsp Fresh lemon juice',
      '1 tbsp Maple syrup or warm water',
      '1 tbsp Toasted sesame seeds'
    ],
    instructions: [
      'Rinse chickpeas, pat dry, and toss with a drop of olive oil, cumin, and paprika. Roast at 400°F (200°C) for 15 minutes until crunchy.',
      'Whisk together tahini, lemon juice, maple syrup, warm water, and a pinch of sea salt in a small bowl until creamy.',
      'Divide warm quinoa between two bowls as the base.',
      'Arrange roasted chickpeas, avocado slices, purple cabbage, cherry tomatoes, and cucumber slices artfully on top.',
      'Drizzle generously with lemon-tahini dressing and sprinkle toasted sesame seeds.'
    ]
  },
  {
    id: 'rec-5',
    name: 'Fluffy Golden Buttermilk Pancakes',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1000&q=80',
    category: 'Breakfast',
    prepTime: '20 mins',
    servings: 4,
    calories: 460,
    difficulty: 'Easy',
    ingredients: [
      '2 cups All-purpose flour',
      '2 tbsp Granulated sugar',
      '2 tsp Baking powder',
      '1/2 tsp Baking soda',
      '1/2 tsp Fine salt',
      '2 cups Cultured buttermilk',
      '2 large Eggs',
      '1/4 cup Melted unsalted butter',
      '1 tsp Pure vanilla extract',
      'Pure maple syrup and fresh berries for topping'
    ],
    instructions: [
      'In a large mixing bowl, whisk together flour, sugar, baking powder, baking soda, and salt.',
      'In a separate bowl, whisk buttermilk, eggs, melted butter, and vanilla extract until uniform.',
      'Pour wet ingredients into dry ingredients. Fold gently with a spatula just until combined (do not overmix, small lumps are ideal).',
      'Preheat a griddle or nonstick skillet over medium-low heat with a brush of butter.',
      'Pour 1/3 cup of batter per pancake. Cook until bubbles surface and pop (about 2-3 mins).',
      'Flip carefully and cook the reverse side for 1-2 minutes until golden brown.',
      'Stack high, top with whipped butter, fresh berries, and warm maple syrup.'
    ]
  },
  {
    id: 'rec-6',
    name: 'Molten Belgian Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    category: 'Desserts',
    prepTime: '25 mins',
    servings: 2,
    calories: 510,
    difficulty: 'Medium',
    ingredients: [
      '1/2 cup (4 oz) Dark chocolate chips (70% cacao)',
      '1/2 cup Unsalted butter',
      '1 cup Powdered sugar',
      '2 large Eggs + 2 Egg yolks',
      '6 tbsp All-purpose flour',
      '1 tsp Vanilla extract',
      'Cocoa powder for ramekin dusting',
      'Vanilla bean ice cream for serving'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter two 6-oz ramekins and dust with cocoa powder.',
      'Melt dark chocolate and butter together in a heatproof bowl over a pot of simmering water (or microwave in 20-second bursts) until glossy.',
      'Whisk powdered sugar into melted chocolate until smooth.',
      'Whisk in eggs, egg yolks, and vanilla extract.',
      'Gently stir in flour just until incorporated without overbeating.',
      'Divide batter between prepared ramekins and bake for 12-14 minutes until sides are set but center remains soft.',
      'Let rest for 1 minute, invert onto dessert plates, dust with powdered sugar, and serve with vanilla ice cream.'
    ]
  },
  {
    id: 'rec-7',
    name: 'Gourmet Truffle Bacon Cheeseburger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    category: 'Burgers',
    prepTime: '20 mins',
    servings: 2,
    calories: 780,
    difficulty: 'Easy',
    ingredients: [
      '2/3 lb Ground Black Angus beef (80/20 blend)',
      '2 Brioche buns, buttered and toasted',
      '2 thick slices Sharp cheddar or Gruyère cheese',
      '4 slices Applewood smoked bacon, crisped',
      '1/2 Yellow onion, caramelized slowly',
      '2 tbsp Truffle mayonnaise or aioli',
      '1 cup Baby arugula',
      'Sea salt and coarse black pepper'
    ],
    instructions: [
      'Shape beef into two thick burger patties, depressing the center slightly with your thumb. Season both sides generously with salt and pepper.',
      'Heat a heavy cast-iron skillet until smoking hot. Sear patties for 3-4 minutes.',
      'Flip patties and immediately crown with cheese slices. Cover skillet with a lid for 2 minutes to melt cheese completely.',
      'Toast brioche buns in butter until golden and crisp.',
      'Spread truffle aioli on both the top and bottom bun halves.',
      'Build burgers: bottom bun, crisp arugula, cheesy beef patty, crispy bacon strips, caramelized onions, and top bun.'
    ]
  },
  {
    id: 'rec-8',
    name: 'Garlic Butter Pan-Seared Salmon',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    category: 'Seafood',
    prepTime: '20 mins',
    servings: 2,
    calories: 490,
    difficulty: 'Easy',
    ingredients: [
      '2 Fresh Atlantic salmon fillets (skin-on)',
      '3 tbsp Unsalted butter',
      '3 cloves Garlic, grated',
      '1 tbsp Fresh lemon juice + lemon slices',
      '1 tbsp Fresh dill, chopped',
      '1 tbsp Olive oil',
      'Sea salt and freshly cracked black pepper'
    ],
    instructions: [
      'Pat salmon fillets completely dry with paper towels. Season both sides with salt and pepper.',
      'Heat olive oil in a non-stick skillet over medium-high heat.',
      'Place salmon skin-side down and press gently with a spatula for 20 seconds. Sear undisturbed for 4-5 minutes until skin is crispy.',
      'Carefully flip fillets. Add butter, grated garlic, and lemon slices to the skillet.',
      'Baste salmon continuously with bubbling garlic-lemon butter for 3 minutes until cooked to medium doneness.',
      'Garnish with fresh chopped dill and serve with steamed asparagus or rice.'
    ]
  },
  {
    id: 'rec-9',
    name: 'Crispy Mediterranean Falafel Bowl',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    category: 'Vegetarian',
    prepTime: '35 mins',
    servings: 3,
    calories: 430,
    difficulty: 'Medium',
    ingredients: [
      '1.5 cups Dried chickpeas (soaked overnight, not canned)',
      '1/2 cup Fresh parsley and cilantro leaves',
      '1/2 small Onion and 3 cloves garlic',
      '1 tsp Ground cumin and coriander',
      '1/2 tsp Baking powder',
      '1 cup Hummus',
      '1 cup Diced cucumber and tomato salad',
      'Warm pita bread wedges',
      'Pickled turnips and tzatziki sauce'
    ],
    instructions: [
      'Pulse soaked chickpeas, herbs, onion, garlic, spices, and salt in a food processor until finely minced like coarse sand.',
      'Chill mixture in refrigerator for 30 minutes, then mix in baking powder.',
      'Scoop and compress into 1.5-inch falafel balls or patties.',
      'Fry in 375°F oil for 4 minutes until deep golden and crunchy (or air fry at 390°F for 14 minutes).',
      'Spread creamy hummus across serving bowls.',
      'Top with hot falafels, cucumber tomato salad, pickled turnips, and drizzle with tzatziki.'
    ]
  },
  {
    id: 'rec-10',
    name: 'Sparkling Passion Fruit Mango Mocktail',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    category: 'Drinks',
    prepTime: '10 mins',
    servings: 2,
    calories: 140,
    difficulty: 'Easy',
    ingredients: [
      '1/2 cup Fresh mango puree',
      '1/4 cup Passion fruit pulp',
      '1 cup Chilled sparkling water or club soda',
      '2 tbsp Fresh lime juice',
      '1 tbsp Agave nectar or simple syrup',
      'Fresh mint sprigs for garnish',
      'Crushed ice cubes'
    ],
    instructions: [
      'In a cocktail shaker or pitcher, mix mango puree, passion fruit pulp, lime juice, and agave nectar until well blended.',
      'Fill tall glasses to the brim with crushed ice.',
      'Pour fruit blend halfway into each glass.',
      'Top gently with chilled sparkling water to create a vibrant layered look.',
      'Stir lightly with a straw, slap fresh mint to release oils, and garnish top.'
    ]
  },
  {
    id: 'rec-11',
    name: 'Smoked Texas-Style BBQ Beef Ribs',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    category: 'BBQ',
    prepTime: '50 mins',
    servings: 4,
    calories: 820,
    difficulty: 'Hard',
    ingredients: [
      '1 full rack Beef back ribs (approx 3 lbs)',
      '2 tbsp Coarse kosher salt',
      '2 tbsp Coarse black pepper (16 mesh)',
      '1 tbsp Smoked paprika and garlic powder',
      '1/2 cup Homemade smoky barbecue glaze',
      '2 tbsp Apple cider vinegar spritz'
    ],
    instructions: [
      'Remove the tough membrane on the bone-side of the rib rack using a butter knife and paper towel.',
      'Coat evenly with kosher salt, coarse black pepper, smoked paprika, and garlic powder rub.',
      'Preheat smoker or oven to 275°F (135°C). Cook ribs with wood chunks for 3 hours, spritzing every 45 minutes with apple cider vinegar.',
      'Wrap ribs in butcher paper with a touch of butter and return for 1.5 hours until tender (probing at 203°F).',
      'Brush liberally with smoky barbecue glaze, let caramelize for 10 minutes, then rest for 15 minutes before slicing.'
    ]
  }
];

export const SAMPLE_USER_RECIPES: Recipe[] = [
  {
    id: 'user-rec-1',
    name: "Chef Rahatul's Special Spiced Biryani",
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    category: 'Asian',
    prepTime: '45 mins',
    servings: 4,
    calories: 650,
    difficulty: 'Medium',
    ingredients: [
      '2 cups Aged Basmati Rice, washed and soaked',
      '1 lb Chicken thighs or bone-in pieces',
      '1 cup Plain yogurt',
      '2 large Onions, thinly sliced and fried crisp (Birista)',
      '2 tbsp Biryani masala blend',
      '1 tsp Saffron threads soaked in 2 tbsp warm milk',
      'Fresh mint and cilantro leaves',
      '3 tbsp Ghee'
    ],
    instructions: [
      'Marinate chicken in yogurt, biryani spices, half the fried onions, minced ginger garlic, and salt for 30 minutes.',
      'Parboil soaked basmati rice in whole-spice infused water until 70% cooked (about 5 mins). Drain.',
      'In a heavy-bottomed pot, sear marinated chicken until lightly browned.',
      'Layer parboiled rice over chicken, drizzle saffron milk, ghee, and garnish with remaining fried onions and fresh mint.',
      'Seal tightly with foil and a heavy lid. Cook on gentle low heat (Dum) for 25 minutes.',
      'Fluff gently with a fork and serve with cucumber raita.'
    ],
    isCustom: true,
    createdAt: Date.now() - 3600000
  }
];
