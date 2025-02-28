
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ChefHat, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Mock data for recipes - this should match the data in FuelTab
const mockRecipes = [
  {
    id: 1,
    name: "High-Protein Breakfast Bowl",
    image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Eggs", "Spinach", "Sweet Potatoes", "Avocado"],
    macros: { protein: 30, carbs: 25, fat: 15 },
    calories: 350,
    prepTime: "15 min",
    mealType: "Breakfast",
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Dice sweet potatoes into small cubes and toss with olive oil, salt and pepper.",
      "Roast sweet potatoes for 20 minutes until tender.",
      "In a pan, sauté spinach with a little olive oil until wilted.",
      "Fry or poach eggs to your preference.",
      "Assemble bowl with sweet potatoes at the base, spinach on one side, sliced avocado on the other, and eggs on top.",
      "Season with salt, pepper, and any preferred herbs."
    ],
    servings: 2,
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Post-Workout Protein Smoothie",
    image: "https://images.unsplash.com/photo-1557707586-2aba954a5dc4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Bananas", "Berries", "Greek Yogurt", "Whey Protein", "Almond Milk"],
    macros: { protein: 35, carbs: 30, fat: 5 },
    calories: 310,
    prepTime: "5 min",
    mealType: "Post-Workout",
    instructions: [
      "Add 1 cup of almond milk to blender.",
      "Add 1 frozen banana, broken into chunks.",
      "Add 1/2 cup mixed berries (fresh or frozen).",
      "Add 1/2 cup Greek yogurt.",
      "Add 1 scoop of whey protein powder.",
      "Blend until smooth, adding more almond milk if needed for desired consistency.",
      "Pour into a glass and enjoy immediately after your workout."
    ],
    servings: 1,
    difficulty: "Easy"
  },
  {
    id: 3,
    name: "Lean Chicken & Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Chicken", "Quinoa", "Bell Peppers", "Broccoli", "Avocado"],
    macros: { protein: 40, carbs: 35, fat: 12 },
    calories: 410,
    prepTime: "25 min",
    mealType: "Lunch",
    instructions: [
      "Rinse 1 cup of quinoa and cook according to package instructions.",
      "Season chicken breast with salt, pepper, and preferred spices.",
      "Grill or pan-sear chicken until internal temperature reaches 165°F (74°C).",
      "Chop bell peppers and steam broccoli until tender-crisp.",
      "Slice the cooked chicken breast.",
      "Assemble the bowl with quinoa as the base, topped with sliced chicken, bell peppers, broccoli, and sliced avocado.",
      "Drizzle with olive oil and lemon juice if desired."
    ],
    servings: 2,
    difficulty: "Medium"
  },
  {
    id: 4,
    name: "Salmon & Sweet Potato",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Salmon", "Sweet Potatoes", "Spinach", "Lemon"],
    macros: { protein: 35, carbs: 30, fat: 18 },
    calories: 420,
    prepTime: "30 min",
    mealType: "Dinner",
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Cut sweet potatoes into wedges, toss with olive oil, salt and pepper.",
      "Roast sweet potatoes for 25-30 minutes until golden and tender.",
      "Season salmon fillets with salt, pepper, and a drizzle of olive oil.",
      "Place salmon skin-side down on a baking sheet lined with parchment paper.",
      "Bake salmon for 12-15 minutes until it flakes easily with a fork.",
      "Sauté spinach with garlic until wilted.",
      "Serve salmon with sweet potato wedges and spinach, garnished with lemon wedges."
    ],
    servings: 2,
    difficulty: "Medium"
  },
  {
    id: 5,
    name: "Protein Overnight Oats",
    image: "https://images.unsplash.com/photo-1504855101244-34edfbd4b861?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Oats", "Greek Yogurt", "Berries", "Almond Milk", "Chia Seeds"],
    macros: { protein: 25, carbs: 40, fat: 8 },
    calories: 340,
    prepTime: "5 min + overnight",
    mealType: "Breakfast",
    instructions: [
      "In a jar or container, combine 1/2 cup rolled oats with 1/2 cup almond milk.",
      "Add 1/4 cup Greek yogurt and stir to combine.",
      "Add 1 tablespoon chia seeds and a drizzle of honey if desired.",
      "Cover and refrigerate overnight (or at least 4 hours).",
      "In the morning, top with fresh berries and additional yogurt if desired.",
      "Can be stored in the refrigerator for up to 3 days."
    ],
    servings: 1,
    difficulty: "Easy"
  },
  {
    id: 6,
    name: "Mediterranean Tuna Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Tuna", "Bell Peppers", "Onions", "Olives", "Lemon"],
    macros: { protein: 28, carbs: 12, fat: 10 },
    calories: 280,
    prepTime: "10 min",
    mealType: "Lunch",
    instructions: [
      "Drain 1 can of tuna and place in a bowl.",
      "Dice 1/2 red bell pepper and 1/4 red onion.",
      "Slice 10-12 olives (kalamata or black olives work well).",
      "Combine tuna, bell peppers, onions, and olives in the bowl.",
      "Squeeze juice from half a lemon over the mixture.",
      "Drizzle with 1 tablespoon olive oil and season with salt and pepper.",
      "Mix gently and serve on its own or over leafy greens."
    ],
    servings: 2,
    difficulty: "Easy"
  },
  {
    id: 7,
    name: "Beef & Broccoli Stir-Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Beef", "Broccoli", "Brown Rice", "Carrots", "Onions"],
    macros: { protein: 32, carbs: 45, fat: 12 },
    calories: 420,
    prepTime: "20 min",
    mealType: "Dinner",
    instructions: [
      "Cook brown rice according to package instructions.",
      "Slice 8 oz lean beef (flank or sirloin) into thin strips against the grain.",
      "Cut broccoli into florets and slice carrots and onions.",
      "In a wok or large pan, heat 1 tablespoon oil over high heat.",
      "Stir-fry beef for 2-3 minutes until browned, then remove from pan.",
      "Add vegetables to the pan and stir-fry for 4-5 minutes until tender-crisp.",
      "Return beef to the pan, add 2 tablespoons low-sodium soy sauce and 1 tablespoon minced ginger.",
      "Stir to combine and cook for another minute.",
      "Serve over brown rice."
    ],
    servings: 2,
    difficulty: "Medium"
  },
  {
    id: 8,
    name: "Greek Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Greek Yogurt", "Berries", "Honey", "Almonds", "Chia Seeds"],
    macros: { protein: 20, carbs: 30, fat: 8 },
    calories: 275,
    prepTime: "5 min",
    mealType: "Breakfast",
    instructions: [
      "In a glass or jar, add a layer of Greek yogurt (about 1/2 cup).",
      "Add a layer of mixed berries.",
      "Sprinkle with 1 teaspoon chia seeds.",
      "Add another layer of Greek yogurt.",
      "Top with more berries, a sprinkle of sliced almonds, and a drizzle of honey.",
      "Enjoy immediately or refrigerate for up to 24 hours."
    ],
    servings: 1,
    difficulty: "Easy"
  },
  {
    id: 9,
    name: "Tofu & Vegetable Curry",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Tofu", "Bell Peppers", "Spinach", "Coconut Milk", "Quinoa"],
    macros: { protein: 22, carbs: 35, fat: 15 },
    calories: 380,
    prepTime: "30 min",
    mealType: "Dinner",
    instructions: [
      "Rinse and cook 1 cup quinoa according to package instructions.",
      "Press and cube 14 oz firm tofu.",
      "In a large pan, heat 1 tablespoon oil and sauté tofu until golden on all sides.",
      "Add diced bell peppers and cook for 3-4 minutes.",
      "Stir in 2 tablespoons curry paste and cook for 1 minute until fragrant.",
      "Pour in 1 can coconut milk and bring to a simmer.",
      "Add spinach and cook until wilted.",
      "Season with salt and pepper to taste.",
      "Serve over cooked quinoa."
    ],
    servings: 3,
    difficulty: "Medium"
  },
  {
    id: 10,
    name: "Turkey & Avocado Wrap",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Turkey", "Avocado", "Whole Wheat Bread", "Spinach", "Tomatoes"],
    macros: { protein: 25, carbs: 28, fat: 12 },
    calories: 330,
    prepTime: "10 min",
    mealType: "Lunch",
    instructions: [
      "Lay out a whole wheat wrap or large tortilla.",
      "Spread 1/4 mashed avocado over the wrap.",
      "Layer 3-4 slices of turkey breast.",
      "Add a handful of spinach leaves and 2-3 slices of tomato.",
      "Season with salt, pepper, and a squeeze of lemon juice if desired.",
      "Roll the wrap tightly, tucking in the sides as you go.",
      "Cut in half diagonally and serve."
    ],
    servings: 1,
    difficulty: "Easy"
  },
  {
    id: 11,
    name: "Shrimp & Zucchini Noodles",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Shrimp", "Zucchini", "Garlic", "Lemon", "Olive Oil"],
    macros: { protein: 28, carbs: 15, fat: 9 },
    calories: 260,
    prepTime: "15 min",
    mealType: "Dinner",
    instructions: [
      "Using a spiralizer or vegetable peeler, create zucchini noodles from 2 medium zucchinis.",
      "Pat dry 8 oz of peeled and deveined shrimp.",
      "Heat 1 tablespoon olive oil in a large pan over medium-high heat.",
      "Add 2 minced garlic cloves and cook for 30 seconds until fragrant.",
      "Add shrimp and cook for 2 minutes per side until pink and opaque.",
      "Remove shrimp and set aside.",
      "In the same pan, add zucchini noodles and cook for 2-3 minutes until slightly softened.",
      "Return shrimp to the pan, add juice from half a lemon, and toss to combine.",
      "Season with salt, pepper, and red pepper flakes if desired.",
      "Garnish with fresh herbs before serving."
    ],
    servings: 2,
    difficulty: "Medium"
  },
  {
    id: 12,
    name: "Lentil & Vegetable Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Lentils", "Carrots", "Onions", "Tomatoes", "Spinach"],
    macros: { protein: 18, carbs: 40, fat: 3 },
    calories: 280,
    prepTime: "35 min",
    mealType: "Lunch",
    instructions: [
      "Rinse 1 cup of dried lentils.",
      "Dice 1 onion, 2 carrots, and 2 tomatoes.",
      "In a large pot, heat 1 tablespoon olive oil over medium heat.",
      "Add onions and cook until translucent, about 3-4 minutes.",
      "Add carrots and cook for another 3-4 minutes.",
      "Add tomatoes, 1 teaspoon cumin, 1/2 teaspoon turmeric, and cook for 2 minutes.",
      "Add lentils and 4 cups vegetable broth.",
      "Bring to a boil, then reduce heat and simmer for 20-25 minutes until lentils are tender.",
      "Stir in 2 cups of spinach and cook until wilted.",
      "Season with salt and pepper to taste.",
      "Serve hot, garnished with fresh herbs if desired."
    ],
    servings: 4,
    difficulty: "Easy"
  }
];

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the recipe based on the id parameter
  const recipe = mockRecipes.find(r => r.id === Number(id));
  
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
        <Button onClick={() => navigate("/fuel")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to recipes
        </Button>
      </div>
    );
  }
  
  return (
    <div className="pb-20">
      <div className="relative h-64 sm:h-80">
        <Button 
          variant="outline" 
          size="icon"
          className="absolute top-4 left-4 z-10 bg-white/90 rounded-full h-10 w-10"
          onClick={() => navigate("/fuel")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-white text-2xl font-bold">{recipe.name}</h1>
          <p className="text-white/90">{recipe.mealType} • {recipe.calories} cal</p>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="flex gap-3 justify-between">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-1">
            <Utensils className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Serves {recipe.servings}</span>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Nutrition Information</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <span className="block text-xs text-muted-foreground">Protein</span>
              <span className="text-lg font-medium text-primary">{recipe.macros.protein}g</span>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <span className="block text-xs text-muted-foreground">Carbs</span>
              <span className="text-lg font-medium text-primary">{recipe.macros.carbs}g</span>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <span className="block text-xs text-muted-foreground">Fat</span>
              <span className="text-lg font-medium text-primary">{recipe.macros.fat}g</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Ingredients</h2>
          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients.map(ingredient => (
              <Badge key={ingredient} className="text-sm py-1 px-2">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-lg font-medium mb-3">Instructions</h2>
          <ol className="space-y-3 pl-5 list-decimal">
            {recipe.instructions.map((step, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-muted-foreground"
              >
                {step}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
