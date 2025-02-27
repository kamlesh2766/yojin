
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, Plus, Search, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const exerciseDatabase = [
  { id: "e1", name: "Bench Press", category: "chest" },
  { id: "e2", name: "Squat", category: "legs" },
  { id: "e3", name: "Deadlift", category: "back" },
  { id: "e4", name: "Pull-up", category: "back" },
  { id: "e5", name: "Shoulder Press", category: "shoulders" },
  { id: "e6", name: "Bicep Curl", category: "arms" },
  { id: "e7", name: "Tricep Extension", category: "arms" },
  { id: "e8", name: "Leg Press", category: "legs" },
  { id: "e9", name: "Lat Pulldown", category: "back" },
  { id: "e10", name: "Chest Fly", category: "chest" },
];

const RoutineCreator = () => {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  
  const filteredExercises = exerciseDatabase.filter(
    exercise => 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleExerciseToggle = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };
  
  const handleCreateRoutine = () => {
    // Here we would save the routine
    // For now, just navigate back
    navigate("/workouts");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 glass py-4 px-4 border-b">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/workouts")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Create Routine</h1>
          <Button
            variant="ghost"
            size="icon"
            disabled={!routineName || selectedExercises.length === 0}
            className="rounded-full"
            onClick={handleCreateRoutine}
          >
            <Check className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="p-4 space-y-6 pb-20">
        <Input
          placeholder="Routine Name"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          className="h-12"
        />
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-10"
          />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Selected Exercises ({selectedExercises.length})</h2>
          
          {selectedExercises.length > 0 ? (
            <div className="space-y-2">
              {selectedExercises.map(exerciseId => {
                const exercise = exerciseDatabase.find(e => e.id === exerciseId);
                if (!exercise) return null;
                
                return (
                  <motion.div
                    key={`selected-${exerciseId}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <Card className="bg-primary/5">
                      <CardContent className="p-4 flex justify-between items-center">
                        <span>{exercise.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleExerciseToggle(exerciseId)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No exercises selected yet</p>
                <p className="text-sm">Select exercises from the list below</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Exercise Library</h2>
          
          <div className="space-y-2">
            {filteredExercises.map(exercise => (
              <Card 
                key={exercise.id}
                className={`transition-all hover:border-primary/50 ${
                  selectedExercises.includes(exercise.id) ? "border-primary" : ""
                }`}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{exercise.name}</h3>
                    <span className="text-xs text-muted-foreground capitalize">{exercise.category}</span>
                  </div>
                  
                  <Checkbox
                    checked={selectedExercises.includes(exercise.id)}
                    onCheckedChange={() => handleExerciseToggle(exercise.id)}
                  />
                </CardContent>
              </Card>
            ))}
            
            {filteredExercises.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>No matching exercises found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div className="py-4">
          <Button className="w-full rounded-full h-12" onClick={handleCreateRoutine} disabled={!routineName || selectedExercises.length === 0}>
            Create Routine
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RoutineCreator;
