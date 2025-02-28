
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CookingPot, Dumbbell, Home, User } from "lucide-react";

const tabs = [
  { path: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Home" },
  { path: "/fuel", icon: <CookingPot className="h-5 w-5" />, label: "Fuel" },
  { path: "/workouts", icon: <Dumbbell className="h-5 w-5" />, label: "Workout" },
  { path: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
];

const TabBar = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t"
    >
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div className="relative flex flex-col items-center">
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 -top-3 bg-primary/10 rounded-full -z-10"
                    style={{ width: "100%", height: "200%" }}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className={`${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {tab.icon}
                </span>
                <span className={`text-xs mt-1 ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default TabBar;
