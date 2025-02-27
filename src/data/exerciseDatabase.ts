
import { Exercise } from "@/types/exercise";

export const exerciseDatabase: Exercise[] = [
  {
    id: "e1",
    name: "Bench Press",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "arms"],
    level: "intermediate",
    equipment: "barbell",
    category: "chest",
    instructions: [
      "Lie on your back on a flat bench",
      "Grip the barbell with hands slightly wider than shoulder-width apart",
      "Lift the bar off the rack and hold it above your chest with arms fully extended",
      "Lower the bar slowly until it touches your mid-chest",
      "Push the bar back to the starting position, fully extending your arms"
    ],
    tips: [
      "Keep your feet flat on the ground",
      "Maintain a slight arch in your lower back",
      "Keep your wrists straight and elbows at a 45-degree angle from your body"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070"
  },
  {
    id: "e2",
    name: "Squat",
    primaryMuscles: ["legs"],
    secondaryMuscles: ["abs", "calves"],
    level: "intermediate",
    equipment: "barbell",
    category: "legs",
    instructions: [
      "Stand with your feet shoulder-width apart",
      "Position the barbell on your upper back",
      "Bend your knees and lower your hips as if sitting in a chair",
      "Lower until your thighs are parallel to the ground",
      "Push through your heels to return to the starting position"
    ],
    tips: [
      "Keep your chest up and back straight",
      "Ensure your knees track over your toes",
      "Breathe in as you descend and out as you rise"
    ],
    image: "https://images.unsplash.com/photo-1566241142248-11108c522a21?q=80&w=2070"
  },
  {
    id: "e3",
    name: "Deadlift",
    primaryMuscles: ["back"],
    secondaryMuscles: ["legs", "arms"],
    level: "advanced",
    equipment: "barbell",
    category: "back",
    instructions: [
      "Stand with feet hip-width apart, the barbell over your mid-foot",
      "Bend at the hips and knees to grip the bar at shoulder-width",
      "Keeping your back straight, lift the bar by extending your hips and knees",
      "Pull your shoulders back at the top of the movement",
      "Return the weight to the ground by bending at the hips and knees"
    ],
    tips: [
      "Keep the bar close to your body throughout the movement",
      "Maintain a neutral spine position",
      "Engage your core before lifting"
    ],
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2787"
  },
  {
    id: "e4",
    name: "Pull-up",
    primaryMuscles: ["back"],
    secondaryMuscles: ["arms", "shoulders"],
    level: "intermediate",
    equipment: "bodyweight",
    category: "back",
    instructions: [
      "Grip a pull-up bar with hands wider than shoulder-width apart",
      "Hang with arms fully extended",
      "Pull yourself up until your chin clears the bar",
      "Lower yourself back down with control"
    ],
    tips: [
      "Keep your core engaged throughout the movement",
      "Avoid swinging or kipping",
      "Focus on squeezing your back muscles"
    ],
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=2787"
  },
  {
    id: "e5",
    name: "Shoulder Press",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["arms"],
    level: "intermediate",
    equipment: "dumbbell",
    category: "shoulders",
    instructions: [
      "Sit on a bench with back support",
      "Hold a dumbbell in each hand at shoulder height",
      "Press the weights up until your arms are fully extended",
      "Lower the weights back to shoulder level with control"
    ],
    tips: [
      "Keep your core engaged and avoid arching your back",
      "Don't lock out your elbows at the top",
      "Lower the weights slowly to increase time under tension"
    ],
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070"
  },
  {
    id: "e6",
    name: "Bicep Curl",
    primaryMuscles: ["arms"],
    level: "beginner",
    equipment: "dumbbell",
    category: "arms",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides",
      "Keep your elbows close to your torso",
      "Curl the weights up to shoulder level while contracting your biceps",
      "Lower the weights back down with control"
    ],
    tips: [
      "Avoid swinging your body to lift the weights",
      "Maintain a slight bend in the knees",
      "Focus on squeezing the biceps at the top of the movement"
    ],
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2070"
  },
  {
    id: "e7",
    name: "Tricep Extension",
    primaryMuscles: ["arms"],
    level: "beginner",
    equipment: "cable",
    category: "arms",
    instructions: [
      "Attach a rope to a high pulley cable",
      "Stand facing the cable machine with feet shoulder-width apart",
      "Grip the rope with your palms facing each other",
      "Keep your upper arms close to your head and extend your forearms down",
      "Return to the starting position with control"
    ],
    tips: [
      "Keep your upper arms stationary throughout the movement",
      "Maintain a slight bend in the knees",
      "Focus on the mind-muscle connection with your triceps"
    ],
    image: "https://images.unsplash.com/photo-1595078475845-89b5ad4e85e9?q=80&w=2069"
  },
  {
    id: "e8",
    name: "Leg Press",
    primaryMuscles: ["legs"],
    secondaryMuscles: ["calves"],
    level: "beginner",
    equipment: "machine",
    category: "legs",
    instructions: [
      "Sit on the leg press machine with your back against the pad",
      "Place your feet on the platform at shoulder-width apart",
      "Release the safety handles and lower the platform until your knees form a 90-degree angle",
      "Push through your heels to extend your legs without locking your knees",
      "Return to the starting position with control"
    ],
    tips: [
      "Don't allow your knees to cave inward",
      "Keep your lower back pressed against the pad",
      "Avoid placing your hands on your knees"
    ],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070"
  },
  {
    id: "e9",
    name: "Lat Pulldown",
    primaryMuscles: ["back"],
    secondaryMuscles: ["arms"],
    level: "beginner",
    equipment: "cable",
    category: "back",
    instructions: [
      "Sit at a lat pulldown machine with your thighs secured under the pads",
      "Grasp the bar with a wide grip, palms facing forward",
      "Pull the bar down to your upper chest while squeezing your shoulder blades together",
      "Slowly return to the starting position, fully extending your arms"
    ],
    tips: [
      "Maintain an upright posture throughout the exercise",
      "Avoid leaning back excessively",
      "Focus on pulling with your back, not your arms"
    ],
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069"
  },
  {
    id: "e10",
    name: "Chest Fly",
    primaryMuscles: ["chest"],
    level: "beginner",
    equipment: "dumbbell",
    category: "chest",
    instructions: [
      "Lie on a flat bench holding dumbbells directly above your chest",
      "With a slight bend in your elbows, lower the dumbbells out to the sides",
      "Lower until you feel a stretch in your chest",
      "Bring the dumbbells back together using your chest muscles"
    ],
    tips: [
      "Maintain the bend in your elbows throughout the movement",
      "Focus on using your chest muscles, not your shoulders",
      "Control the movement both down and up"
    ],
    image: "https://images.unsplash.com/photo-1597076545197-530e8a383732?q=80&w=2070"
  },
  {
    id: "e11",
    name: "Plank",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["shoulders"],
    level: "beginner",
    equipment: "bodyweight",
    category: "abs",
    instructions: [
      "Start in a push-up position with your forearms on the ground",
      "Keep your elbows directly beneath your shoulders",
      "Keep your body in a straight line from head to heels",
      "Hold the position for the desired time"
    ],
    tips: [
      "Don't let your hips sag or pike up",
      "Keep your neck in a neutral position",
      "Breathe regularly throughout the hold"
    ],
    image: "https://images.unsplash.com/photo-1566241142248-11108c522a21?q=80&w=2070"
  },
  {
    id: "e12",
    name: "Russian Twist",
    primaryMuscles: ["abs"],
    level: "intermediate",
    equipment: "bodyweight",
    category: "abs",
    instructions: [
      "Sit on the floor with your knees bent",
      "Lean back slightly, keeping your back straight",
      "Lift your feet slightly off the ground",
      "Clasp your hands together and twist your torso to the right, then to the left"
    ],
    tips: [
      "The further you lean back, the more challenging it becomes",
      "Add weight for increased difficulty",
      "Keep your movements controlled and deliberate"
    ],
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2787"
  },
  {
    id: "e13",
    name: "Calf Raise",
    primaryMuscles: ["calves"],
    level: "beginner",
    equipment: "bodyweight",
    category: "calves",
    instructions: [
      "Stand with your feet hip-width apart",
      "Rise up onto the balls of your feet, lifting your heels off the ground",
      "Pause briefly at the top",
      "Lower your heels back to the ground with control"
    ],
    tips: [
      "Stand near a wall or sturdy object for balance if needed",
      "For added resistance, hold dumbbells or stand on an elevated surface",
      "Focus on a full range of motion"
    ],
    image: "https://images.unsplash.com/photo-1602614023135-58368e78d8d1?q=80&w=2787"
  },
  {
    id: "e14",
    name: "Mountain Climber",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["shoulders", "cardio"],
    level: "beginner",
    equipment: "bodyweight",
    category: "cardio",
    instructions: [
      "Start in a push-up position with your arms straight",
      "Bring your right knee toward your chest",
      "Quickly switch, extending the right leg back while bringing the left knee toward your chest",
      "Continue alternating legs at a fast pace"
    ],
    tips: [
      "Keep your hips down and core engaged",
      "Maintain a steady rhythm",
      "Breathe regularly throughout the exercise"
    ],
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=2069"
  },
  {
    id: "e15",
    name: "Face Pull",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["back"],
    level: "intermediate",
    equipment: "cable",
    category: "shoulders",
    instructions: [
      "Attach a rope to a cable machine at head height",
      "Grasp the ends of the rope with both hands, palms facing each other",
      "Step back to create tension in the cable",
      "Pull the rope towards your face, flaring your elbows out",
      "Squeeze your shoulder blades together at the end of the movement",
      "Return to the starting position with control"
    ],
    tips: [
      "Focus on pulling with your rear deltoids, not your arms",
      "Keep your chest up and maintain good posture",
      "Use a lighter weight to ensure proper form"
    ],
    image: "https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=2070"
  }
];

export const getExercisesByMuscleGroup = (muscleGroup: string) => {
  return exerciseDatabase.filter(exercise => 
    exercise.category === muscleGroup || 
    exercise.primaryMuscles.includes(muscleGroup as any) ||
    (exercise.secondaryMuscles && exercise.secondaryMuscles.includes(muscleGroup as any))
  );
};

export const getExercisesByEquipment = (equipment: string) => {
  return exerciseDatabase.filter(exercise => exercise.equipment === equipment);
};

export const getExercisesByLevel = (level: string) => {
  return exerciseDatabase.filter(exercise => exercise.level === level);
};

export const getExerciseById = (id: string) => {
  return exerciseDatabase.find(exercise => exercise.id === id);
};

export const searchExercises = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return exerciseDatabase.filter(exercise => 
    exercise.name.toLowerCase().includes(lowerCaseQuery) ||
    exercise.category.toLowerCase().includes(lowerCaseQuery) ||
    exercise.equipment.toLowerCase().includes(lowerCaseQuery) ||
    exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(lowerCaseQuery)) ||
    (exercise.secondaryMuscles && exercise.secondaryMuscles.some(muscle => muscle.toLowerCase().includes(lowerCaseQuery)))
  );
};
