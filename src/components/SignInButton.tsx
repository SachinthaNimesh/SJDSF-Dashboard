import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const SignInButton = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/dashboard");
  };

  return (
    <Button
      onClick={handleSignIn}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center"
    >
      <LogIn className="mr-2 h-5 w-5" />
      Sign In
    </Button>
  );
};

export default SignInButton;
