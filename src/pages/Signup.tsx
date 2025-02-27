
import SignupForm from "@/components/auth/SignupForm";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <SignupForm />
    </div>
  );
};

export default Signup;
