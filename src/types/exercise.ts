
export type MuscleGroup = 
  | "chest" 
  | "back" 
  | "shoulders" 
  | "arms" 
  | "legs" 
  | "abs" 
  | "calves" 
  | "cardio";

export type ExerciseLevel = "beginner" | "intermediate" | "advanced";

export type EquipmentType = 
  | "barbell" 
  | "dumbbell" 
  | "machine" 
  | "cable" 
  | "bodyweight" 
  | "kettlebell" 
  | "bands" 
  | "other";

export interface Exercise {
  id: string;
  name: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  instructions: string[];
  tips?: string[];
  level: ExerciseLevel;
  equipment: EquipmentType;
  image?: string;
  videoUrl?: string;
  category: MuscleGroup;
}
