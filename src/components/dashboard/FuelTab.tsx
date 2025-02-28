
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CookingPot, List, Search, X } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for ingredients
const ingredientCategories = [
  {
    name: "Proteins",
    items: ["Chicken", "Beef", "Salmon", "Tuna", "Eggs", "Tofu", "Turkey", "Shrimp", "Lentils", "Greek Yogurt"]
  },
  {
    name: "Vegetables",
    items: ["Spinach", "Broccoli", "Bell Peppers", "Onions", "Carrots", "Tomatoes", "Kale", "Sweet Potatoes", "Zucchini", "Mushrooms"]
  },
  {
    name: "Fruits",
    items: ["Bananas", "Apples", "Berries", "Oranges", "Avocado", "Kiwi", "Pineapple", "Grapes", "Mango", "Lemons"]
  },
  {
    name: "Grains",
    items: ["Brown Rice", "Quinoa", "Oats", "Whole Wheat Bread", "Pasta", "Barley", "Bulgur", "Couscous", "Farro", "Corn Tortillas"]
  },
  {
    name: "Dairy",
    items: ["Milk", "Cheese", "Cottage Cheese", "Greek Yogurt", "Butter", "Cream Cheese", "Sour Cream", "Whey Protein", "Kefir", "Almond Milk"]
  },
  {
    name: "Nuts & Seeds",
    items: ["Almonds", "Walnuts", "Chia Seeds", "Flax Seeds", "Peanuts", "Cashews", "Sunflower Seeds", "Pumpkin Seeds", "Pistachios", "Hemp Seeds"]
  }
];

// Mock data for recipes
const mockRecipes = [
  {
    id: 1,
    name: "High-Protein Breakfast Bowl",
    image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Eggs", "Spinach", "Sweet Potatoes", "Avocado"],
    macros: { protein: 30, carbs: 25, fat: 15 },
    calories: 350,
    prepTime: "15 min",
    mealType: "Breakfast"
  },
  {
    id: 2,
    name: "Post-Workout Protein Smoothie",
    image: "https://images.unsplash.com/photo-1557707586-2aba954a5dc4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Bananas", "Berries", "Greek Yogurt", "Whey Protein", "Almond Milk"],
    macros: { protein: 35, carbs: 30, fat: 5 },
    calories: 310,
    prepTime: "5 min",
    mealType: "Post-Workout"
  },
  {
    id: 3,
    name: "Lean Chicken & Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Chicken", "Quinoa", "Bell Peppers", "Broccoli", "Avocado"],
    macros: { protein: 40, carbs: 35, fat: 12 },
    calories: 410,
    prepTime: "25 min",
    mealType: "Lunch"
  },
  {
    id: 4,
    name: "Salmon & Sweet Potato",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Salmon", "Sweet Potatoes", "Spinach", "Lemon"],
    macros: { protein: 35, carbs: 30, fat: 18 },
    calories: 420,
    prepTime: "30 min",
    mealType: "Dinner"
  },
  {
    id: 5,
    name: "Protein Overnight Oats",
    image: "https://images.unsplash.com/photo-1504855101244-34edfbd4b861?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ingredients: ["Oats", "Greek Yogurt", "Berries", "Almond Milk", "Chia Seeds"],
    macros: { protein: 25, carbs: 40, fat: 8 },
    calories: 340,
    prepTime: "5 min + overnight",
    mealType: "Breakfast"
  }
];

const FuelTab = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedRecipes, setMatchedRecipes] = useState<typeof mockRecipes>([]);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [loading, setLoading] = useState(false);

  // Filter ingredients based on search query
  const filteredIngredients = ingredientCategories.map(category => ({
    name: category.name,
    items: category.items.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  // Handle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Find recipes based on selected ingredients
  useEffect(() => {
    if (selectedIngredients.length === 0) {
      setMatchedRecipes([]);
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockRecipes.filter(recipe => 
        selectedIngredients.some(ingredient => 
          recipe.ingredients.includes(ingredient)
        )
      ).sort((a, b) => {
        // Sort by how many ingredients match (most matches first)
        const aMatches = a.ingredients.filter(i => selectedIngredients.includes(i)).length;
        const bMatches = b.ingredients.filter(i => selectedIngredients.includes(i)).length;
        return bMatches - aMatches;
      });
      
      setMatchedRecipes(results);
      setLoading(false);
      
      if (results.length > 0) {
        setActiveTab("recipes");
      }
    }, 800);
  }, [selectedIngredients]);

  // Clear all selected ingredients
  const clearAllIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 glass py-4 px-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">Fuel</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <List className="h-5 w-5" />
        </Button>
      </header>

      <main className="p-4 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex justify-between items-center">
              Find Recipes with Your Ingredients
              <CookingPot className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Select ingredients you have, and we'll find healthy recipes for your fitness goals.
            </p>
            
            {selectedIngredients.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Your Ingredients</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllIngredients}
                    className="h-7 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIngredients.map(ingredient => (
                    <Badge 
                      key={ingredient} 
                      variant="secondary"
                      className="pl-2 pr-1 py-1 flex items-center gap-1"
                    >
                      {ingredient}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full ml-1"
                        onClick={() => toggleIngredient(ingredient)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ingredients">
              Ingredients
              {selectedIngredients.length > 0 && (
                <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {selectedIngredients.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="recipes" disabled={matchedRecipes.length === 0}>
              Recipes
              {matchedRecipes.length > 0 && (
                <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {matchedRecipes.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="space-y-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-10"
              />
            </div>
            
            <div className="space-y-6">
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((category, idx) => (
                  <div key={category.name}>
                    <h3 className="text-sm font-medium mb-2">{category.name}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.map(item => (
                        <div 
                          key={item} 
                          className="flex items-center space-x-2"
                        >
                          <Checkbox 
                            id={item} 
                            checked={selectedIngredients.includes(item)}
                            onCheckedChange={() => toggleIngredient(item)}
                          />
                          <label 
                            htmlFor={item}
                            className="text-sm cursor-pointer"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                    {idx < filteredIngredients.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No ingredients match your search</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recipes" className="space-y-4 mt-4">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="w-full overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 w-1/2 bg-muted rounded animate-pulse mb-3" />
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="h-5 w-16 bg-muted rounded-full animate-pulse" />
                      ))}
                    </div>
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))
            ) : matchedRecipes.length > 0 ? (
              matchedRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {recipe.prepTime}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-medium text-lg">{recipe.name}</h3>
                        <p className="text-white/80 text-sm">{recipe.mealType} • {recipe.calories} cal</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-3">
                        <div className="flex gap-2">
                          <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            P: {recipe.macros.protein}g
                          </div>
                          <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            C: {recipe.macros.carbs}g
                          </div>
                          <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            F: {recipe.macros.fat}g
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map(ingredient => (
                            <Badge 
                              key={ingredient}
                              variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
                              className="text-xs"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">View Recipe</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <CookingPot className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-3" />
                <p className="text-muted-foreground">Select ingredients to find matching recipes</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FuelTab;
