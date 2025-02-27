
import FitnessSurvey from "@/components/survey/FitnessSurvey";
import { motion } from "framer-motion";

const Survey = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <FitnessSurvey />
    </div>
  );
};

export default Survey;
