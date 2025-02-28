
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-subtle"></div>
            <div className="absolute inset-2 rounded-full bg-primary/30"></div>
            <div className="absolute inset-4 rounded-full bg-primary/60 flex items-center justify-center">
              <span className="text-2xl font-bold text-white font-yojin">YJ</span>
            </div>
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl font-bold tracking-tight font-yojin"
        >
          YOJIN
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-muted-foreground mx-auto max-w-sm"
        >
          Your personal fitness journey, optimized and connected.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-6 space-y-4"
        >
          <Button 
            size="lg" 
            className="w-full transition-all rounded-full h-14"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full rounded-full h-14"
            onClick={() => navigate("/login")}
          >
            I already have an account
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
