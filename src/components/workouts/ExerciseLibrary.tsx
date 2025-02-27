
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dumbbell, 
  Search, 
  ChevronRight, 
  Filter, 
  X, 
  BarChart
} from "lucide-react";
import { 
  exerciseDatabase, 
  getExercisesByMuscleGroup, 
  searchExercises 
} from "@/data/exerciseDatabase";
import { Exercise, MuscleGroup } from "@/types/exercise";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const muscleGroups: { id: MuscleGroup; name: string; icon?: React.ReactNode }[] = [
  { id: "chest", name: "Chest", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v18M18 3v18"></path><path d="M3 6h18M3 18h18"></path></svg> },
  { id: "back", name: "Back", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 01-6 6h0a6 6 0 01-6-6h0a6 6 0 016-6h0a6 6 0 016 6h0z"></path><path d="M12 20v-6"></path></svg> },
  { id: "shoulders", name: "Shoulders", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v12"></path><path d="M6 12h12"></path></svg> },
  { id: "arms", name: "Arms", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12"></path><path d="M6 12l-4 4"></path><path d="M18 12l4 4"></path></svg> },
  { id: "legs", name: "Legs", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M4 12h16"></path></svg> },
  { id: "abs", name: "Abs", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12"></path><path d="M8 18h8"></path><path d="M8 6h8"></path></svg> },
  { id: "calves", name: "Calves", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-6.5"></path><path d="M10 13l4 3"></path><path d="M10 18l4-3"></path></svg> },
  { id: "cardio", name: "Cardio", icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> }
];

const equipmentTypes = [
  { id: "barbell", name: "Barbell" },
  { id: "dumbbell", name: "Dumbbell" },
  { id: "machine", name: "Machine" },
  { id: "cable", name: "Cable" },
  { id: "bodyweight", name: "Bodyweight" },
  { id: "kettlebell", name: "Kettlebell" },
  { id: "bands", name: "Bands" },
  { id: "other", name: "Other" }
];

const difficultyLevels = [
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" }
];

const ExerciseLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exerciseDatabase);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let results = exerciseDatabase;
    
    // Apply muscle group filter
    if (selectedMuscleGroup) {
      results = getExercisesByMuscleGroup(selectedMuscleGroup);
    }
    
    // Apply search query
    if (searchQuery) {
      results = searchExercises(searchQuery);
    }
    
    // Apply equipment filter
    if (selectedEquipment.length > 0) {
      results = results.filter(exercise => 
        selectedEquipment.includes(exercise.equipment)
      );
    }
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      results = results.filter(exercise => 
        selectedLevels.includes(exercise.level)
      );
    }
    
    setFilteredExercises(results);
  }, [searchQuery, selectedMuscleGroup, selectedEquipment, selectedLevels]);

  const handleMuscleGroupSelect = (muscleGroup: string) => {
    setSelectedMuscleGroup(muscleGroup === selectedMuscleGroup ? null : muscleGroup);
  };

  const handleEquipmentToggle = (equipment: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipment)
        ? prev.filter(e => e !== equipment)
        : [...prev, equipment]
    );
  };

  const handleLevelToggle = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const resetFilters = () => {
    setSelectedEquipment([]);
    setSelectedLevels([]);
    setSelectedMuscleGroup(null);
    setSearchQuery("");
  };

  const navigateToExerciseDetail = (exerciseId: string) => {
    navigate(`/exercise/${exerciseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-20 -mx-4 px-4 pt-1 pb-4 bg-background">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-10 pr-12"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-10 w-10"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-lg font-medium">Exercise Library</h2>
          <Drawer open={showFilters} onOpenChange={setShowFilters}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
                {(selectedEquipment.length > 0 || selectedLevels.length > 0) && (
                  <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {selectedEquipment.length + selectedLevels.length}
                  </span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter Exercises</DrawerTitle>
                <DrawerDescription>
                  Narrow down exercises based on your preferences
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-2">
                <h3 className="font-medium mb-2">Equipment</h3>
                <div className="grid grid-cols-2 gap-2">
                  {equipmentTypes.map((equipment) => (
                    <Button
                      key={equipment.id}
                      variant={selectedEquipment.includes(equipment.id) ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => handleEquipmentToggle(equipment.id)}
                    >
                      {equipment.name}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Difficulty Level</h3>
                  <div className="flex gap-2">
                    {difficultyLevels.map((level) => (
                      <Button
                        key={level.id}
                        variant={selectedLevels.includes(level.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleLevelToggle(level.id)}
                      >
                        {level.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <DrawerFooter className="flex-row justify-between gap-2">
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
                <DrawerClose asChild>
                  <Button>Apply Filters</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        
        <div className="mt-4 overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-2">
            <Button
              variant={selectedMuscleGroup === null ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedMuscleGroup(null)}
            >
              All Exercises
            </Button>
            {muscleGroups.map((group) => (
              <Button
                key={group.id}
                variant={selectedMuscleGroup === group.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => handleMuscleGroupSelect(group.id)}
              >
                {group.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-16">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigateToExerciseDetail(exercise.id)}
            >
              <Card className="overflow-hidden cursor-pointer hover:border-primary/50 transition-all">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-1/3 bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center h-24">
                      <Dumbbell className="h-8 w-8 text-primary/50" />
                    </div>
                    <div className="w-2/3 p-3">
                      <h3 className="font-medium text-base mb-1">{exercise.name}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-full capitalize">
                          {exercise.category}
                        </span>
                        <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-full capitalize">
                          {exercise.equipment}
                        </span>
                        <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-full capitalize">
                          {exercise.level}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Targets: {exercise.primaryMuscles.join(', ')}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
            <p className="text-muted-foreground">No exercises found</p>
            <Button variant="link" onClick={resetFilters}>
              Reset all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
