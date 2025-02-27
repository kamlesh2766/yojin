
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Award, Timer } from "lucide-react";

type FitnessCategory = "athletics" | "bodybuilding" | "calisthenics";

const FitnessSurvey = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<FitnessCategory | null>(null);

  const handleContinue = () => {
    // Save the selected category to localStorage for future use
    if (selectedCategory) {
      localStorage.setItem("fitnessCategory", selectedCategory);
      navigate("/dashboard");
    }
  };

  const categories = [
    { 
      id: "athletics", 
      title: "Athletics", 
      icon: <Timer className="h-8 w-8 mb-2" />,
      description: "Focus on cardiovascular endurance, speed, and agility training."
    },
    { 
      id: "bodybuilding", 
      title: "Body Building", 
      icon: <Dumbbell className="h-8 w-8 mb-2" />,
      description: "Emphasize muscle hypertrophy, strength, and aesthetic physique."
    },
    { 
      id: "calisthenics", 
      title: "Calisthenics", 
      icon: <Award className="h-8 w-8 mb-2" />,
      description: "Master bodyweight exercises, mobility, and functional strength."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto p-6 space-y-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold">What's your focus?</h1>
        <p className="text-muted-foreground">
          We'll customize your experience based on your fitness goals
        </p>
      </motion.div>

      <div className="grid gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card 
              className={`overflow-hidden transition-all duration-300 cursor-pointer ${
                selectedCategory === category.id
                  ? "ring-2 ring-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedCategory(category.id as FitnessCategory)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="text-muted-foreground mt-2">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-4"
      >
        <Button
          className="w-full h-12 rounded-full"
          disabled={!selectedCategory}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FitnessSurvey;
