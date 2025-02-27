
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Clock, Plus, Save, Trash2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

type Set = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

type Exercise = {
  id: string;
  name: string;
  sets: Set[];
  previousData?: {
    weight: string;
    reps: string;
    date: string;
  };
};

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [timer, setTimer] = useState("00:00");
  const [volume, setVolume] = useState(0);
  
  // Mock exercise data for the selected routine
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "e1",
      name: "Bench Press",
      previousData: {
        weight: "85",
        reps: "8",
        date: "Apr 15",
      },
      sets: [
        { id: "s1", weight: "", reps: "", completed: false },
        { id: "s2", weight: "", reps: "", completed: false },
        { id: "s3", weight: "", reps: "", completed: false },
      ],
    },
    {
      id: "e2",
      name: "Incline Dumbbell Press",
      previousData: {
        weight: "30",
        reps: "10",
        date: "Apr 15",
      },
      sets: [
        { id: "s4", weight: "", reps: "", completed: false },
        { id: "s5", weight: "", reps: "", completed: false },
        { id: "s6", weight: "", reps: "", completed: false },
      ],
    },
  ]);

  const handleSetChange = (
    exerciseIndex: number,
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(updatedExercises);
    
    // Update volume calculation
    calculateVolume();
  };

  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex].completed = 
      !updatedExercises[exerciseIndex].sets[setIndex].completed;
    setExercises(updatedExercises);
    
    // Update volume calculation
    calculateVolume();
  };

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const newSet = {
      id: `new-${Date.now()}`,
      weight: "",
      reps: "",
      completed: false,
    };
    updatedExercises[exerciseIndex].sets.push(newSet);
    setExercises(updatedExercises);
  };

  const calculateVolume = () => {
    let totalVolume = 0;
    
    exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          totalVolume += Number(set.weight) * Number(set.reps);
        }
      });
    });
    
    setVolume(totalVolume);
  };

  const handleFinishWorkout = () => {
    // Save workout data
    // For now just navigate back
    navigate("/workouts");
  };

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 glass py-4 px-4 border-b">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/workouts")}
          >
            <XCircle className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Active Workout</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleFinishWorkout}
          >
            <Save className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{timer}</span>
              </div>
              
              <div className="bg-primary/10 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Volume: {volume} kg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {exercises.map((exercise, exerciseIndex) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + exerciseIndex * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-medium">{exercise.name}</h3>
                  {exercise.previousData && (
                    <p className="text-xs text-muted-foreground">
                      Previous: {exercise.previousData.weight}kg × {exercise.previousData.reps} ({exercise.previousData.date})
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <div className="col-span-1">#</div>
                    <div className="col-span-4">Weight (kg)</div>
                    <div className="col-span-4">Reps</div>
                    <div className="col-span-3"></div>
                  </div>
                  
                  {exercise.sets.map((set, setIndex) => (
                    <div 
                      key={set.id} 
                      className={`grid grid-cols-12 gap-2 items-center ${
                        set.completed ? "opacity-70" : ""
                      }`}
                    >
                      <div className="col-span-1 text-sm font-medium">
                        {setIndex + 1}
                      </div>
                      <div className="col-span-4">
                        <Input
                          type="number"
                          placeholder="0"
                          value={set.weight}
                          onChange={(e) => 
                            handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)
                          }
                          className="h-10"
                          disabled={set.completed}
                        />
                      </div>
                      <div className="col-span-4">
                        <Input
                          type="number"
                          placeholder="0"
                          value={set.reps}
                          onChange={(e) => 
                            handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)
                          }
                          className="h-10"
                          disabled={set.completed}
                        />
                      </div>
                      <div className="col-span-3 flex justify-end space-x-2">
                        <Button
                          variant={set.completed ? "default" : "outline"}
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => toggleSetCompletion(exerciseIndex, setIndex)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center gap-1 mt-2"
                    onClick={() => addSet(exerciseIndex)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Set
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="pt-4 pb-10">
          <Button className="w-full h-12 rounded-full" onClick={handleFinishWorkout}>
            Finish Workout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ActiveWorkout;
