
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, Star } from "lucide-react";
import RoutineList from "./RoutineList";

const WorkoutTab = () => {
  const navigate = useNavigate();
  const [fitnessCategory, setFitnessCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's fitness category from localStorage
    const savedCategory = localStorage.getItem("fitnessCategory");
    setFitnessCategory(savedCategory);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getCategoryWorkouts = () => {
    switch (fitnessCategory) {
      case "athletics":
        return [
          {
            id: "a1",
            title: "Speed & Agility",
            description: "High-intensity interval training focused on improving sprint performance and lateral movements.",
            duration: "45 min",
            level: "Intermediate"
          },
          {
            id: "a2",
            title: "Endurance Builder",
            description: "Long-distance running combined with core stability exercises for improved stamina.",
            duration: "60 min",
            level: "All levels"
          },
          {
            id: "a3",
            title: "Track & Field Prep",
            description: "Specialized drills for sprint mechanics, jumping technique, and explosive power.",
            duration: "50 min",
            level: "Advanced"
          }
        ];
      case "bodybuilding":
        return [
          {
            id: "b1",
            title: "Upper Body Hypertrophy",
            description: "Focus on chest, back, and arms with progressive overload techniques for maximum muscle growth.",
            duration: "60 min",
            level: "Intermediate"
          },
          {
            id: "b2",
            title: "Lower Body Power",
            description: "Leg-focused workout with compound movements and isolation exercises for balanced development.",
            duration: "55 min",
            level: "All levels"
          },
          {
            id: "b3",
            title: "Full Body Split",
            description: "Comprehensive full-body routine targeting all major muscle groups in one session.",
            duration: "70 min",
            level: "Advanced"
          }
        ];
      case "calisthenics":
        return [
          {
            id: "c1",
            title: "Bodyweight Basics",
            description: "Master fundamental movements like push-ups, pull-ups, and dips with proper progression.",
            duration: "45 min",
            level: "Beginner"
          },
          {
            id: "c2",
            title: "Advanced Calisthenics",
            description: "Technical skills training including muscle-ups, front levers, and handstand progressions.",
            duration: "60 min",
            level: "Advanced"
          },
          {
            id: "c3",
            title: "Skills & Strength",
            description: "Combined strength building and skill work focusing on controlled movement patterns.",
            duration: "50 min",
            level: "Intermediate"
          }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 glass py-4 px-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">Workouts</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Calendar className="h-5 w-5" />
        </Button>
      </header>

      <main className="p-4">
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="routines">My Routines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended" className="space-y-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="w-full">
                  <CardHeader>
                    <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 w-full bg-muted rounded animate-pulse" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button 
                    variant="default" 
                    className="w-full h-14 flex justify-center items-center gap-2 rounded-xl"
                    onClick={() => navigate("/workout/new")}
                  >
                    <Plus className="h-5 w-5" />
                    Start Empty Workout
                  </Button>
                </motion.div>

                <div className="my-6">
                  <h2 className="text-lg font-medium mb-4">Recommended for You</h2>
                  <div className="space-y-4">
                    {getCategoryWorkouts().map((workout, index) => (
                      <motion.div
                        key={workout.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Card className="overflow-hidden transition-all hover:border-primary/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between">
                              <span>{workout.title}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Star className="h-4 w-4" />
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">{workout.description}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{workout.duration}</span>
                            </div>
                            <div className="text-xs px-2 py-1 bg-secondary rounded-full">
                              {workout.level}
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="routines">
            <RoutineList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default WorkoutTab;
