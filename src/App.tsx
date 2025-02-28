
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Survey from "./pages/Survey";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import WorkoutDetail from "./pages/WorkoutDetail";
import RoutineCreator from "./pages/RoutineCreator";
import ExerciseDetail from "./pages/ExerciseDetail";
import RecipeDetail from "./pages/RecipeDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="strength-ring-theme">
      <TooltipProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/fuel" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workout/:id" element={<WorkoutDetail />} />
              <Route path="/workout/new" element={<WorkoutDetail />} />
              <Route path="/routines/new" element={<RoutineCreator />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
