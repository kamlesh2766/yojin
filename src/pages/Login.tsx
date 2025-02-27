
import LoginForm from "@/components/auth/LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <LoginForm />
    </div>
  );
};

export default Login;
