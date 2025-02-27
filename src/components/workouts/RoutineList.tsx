
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const RoutineList = () => {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([
    {
      id: "r1",
      name: "Push Day",
      exercises: [
        { name: "Bench Press", sets: 4 },
        { name: "Shoulder Press", sets: 3 },
        { name: "Tricep Extensions", sets: 3 },
      ],
      lastCompleted: "3 days ago"
    },
    {
      id: "r2",
      name: "Pull Day",
      exercises: [
        { name: "Pull-ups", sets: 4 },
        { name: "Barbell Rows", sets: 3 },
        { name: "Bicep Curls", sets: 3 },
      ],
      lastCompleted: "5 days ago"
    }
  ]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          variant="outline"
          className="w-full h-14 flex justify-center items-center gap-2 border-dashed rounded-xl"
          onClick={() => navigate("/routines/new")}
        >
          <Plus className="h-5 w-5" />
          New Routine
        </Button>
      </motion.div>

      <div className="space-y-4">
        {routines.map((routine, index) => (
          <motion.div
            key={routine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="overflow-hidden transition-all hover:border-primary/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between">
                  <span>{routine.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    {routine.lastCompleted}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 mb-4">
                  {routine.exercises.map((exercise, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{exercise.name}</span>
                      <span className="text-muted-foreground">{exercise.sets} sets</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full flex items-center justify-center gap-2 h-10"
                  onClick={() => navigate(`/workout/${routine.id}`)}
                >
                  <Play className="h-4 w-4" />
                  Start Routine
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {routines.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No routines yet</p>
          <Button 
            variant="link" 
            className="mt-2"
            onClick={() => navigate("/routines/new")}
          >
            Create your first routine <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoutineList;
