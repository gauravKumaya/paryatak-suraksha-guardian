import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50 trust-shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">Paryatak Suraksha</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link text-foreground hover:text-primary font-medium">
            Features
          </a>
          <a href="#how-it-works" className="nav-link text-foreground hover:text-primary font-medium">
            How It Works
          </a>
          <a href="#contact" className="nav-link text-foreground hover:text-primary font-medium">
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-primary hover:text-primary-glow" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-accent hover:bg-accent-glow text-accent-foreground safety-glow" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;