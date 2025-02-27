
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getExerciseById } from "@/data/exerciseDatabase";
import { ArrowLeft, Dumbbell, Info, LightbulbIcon, List, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exercise = getExerciseById(id || "");

  if (!exercise) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-center text-muted-foreground mb-4">Exercise not found</p>
        <Button onClick={() => navigate("/exercises")}>Back to Exercise Library</Button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 glass py-4 px-4 border-b">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold truncate">{exercise.name}</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/30 rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-end bg-gradient-to-t from-black/50 to-transparent p-4">
            <div>
              <h1 className="text-white text-2xl font-bold mb-1">{exercise.name}</h1>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-primary/90 text-white px-2 py-1 rounded-full capitalize">
                  {exercise.category}
                </span>
                <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full capitalize">
                  {exercise.equipment}
                </span>
                <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full capitalize">
                  {exercise.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Target Muscles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-medium">Primary</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {exercise.primaryMuscles.map(muscle => (
                    <span key={muscle} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              
              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium">Secondary</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exercise.secondaryMuscles.map(muscle => (
                      <span key={muscle} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full capitalize">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="instructions">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="instructions" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              Steps
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-1">
              <LightbulbIcon className="h-4 w-4" />
              Tips
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructions">
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-2 list-decimal pl-4">
                  {exercise.instructions.map((step, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-2"
                    >
                      {step}
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips">
            <Card>
              <CardContent className="pt-6">
                {exercise.tips && exercise.tips.length > 0 ? (
                  <ul className="space-y-2 list-disc pl-4">
                    {exercise.tips.map((tip, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-2"
                      >
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No tips available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Equipment Required</h3>
                  <p className="capitalize">{exercise.equipment}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Difficulty Level</h3>
                  <p className="capitalize">{exercise.level}</p>
                </div>
                
                {exercise.videoUrl && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Video Guide</h3>
                    <Button variant="outline" className="w-full gap-2" onClick={() => window.open(exercise.videoUrl, '_blank')}>
                      <Video className="h-4 w-4" />
                      Watch Tutorial
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="pt-4 pb-10">
          <Button 
            className="w-full rounded-full h-12"
            onClick={() => {
              // In a real app, this would add the exercise to the current workout
              navigate("/workout/new");
            }}
          >
            <Dumbbell className="mr-2 h-5 w-5" />
            Add to Workout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ExerciseDetail;
