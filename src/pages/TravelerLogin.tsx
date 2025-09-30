import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const TravelerLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTravelerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('travelerEmail') as string;
    const password = formData.get('travelerPassword') as string;

    // Basic validation
    if (!email || !password) {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    // Simulate authentication (replace with actual auth logic)
    if (email && password.length >= 6) {
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to your dashboard...",
      });
      
      // Navigate to traveler dashboard after a short delay
      setTimeout(() => {
        navigate('/traveler-dashboard');
      }, 1000);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please check your credentials.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md trust-card border-0">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">Paryatak Suraksha</span>
          </div>
          <CardTitle className="text-2xl text-primary">Traveler Login</CardTitle>
          <CardDescription>
            Access your safety dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleTravelerLogin}>
            <div className="space-y-2">
              <Label htmlFor="travelerEmail">Email Address</Label>
              <Input
                id="travelerEmail"
                name="travelerEmail"
                type="email"
                placeholder="your@email.com"
                required
                className="border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelerPassword">Password</Label>
              <Input
                id="travelerPassword"
                name="travelerPassword"
                type="password"
                placeholder="Enter your password"
                required
                className="border-border focus:ring-accent"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-accent hover:text-accent-glow">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit"
              className="w-full bg-accent hover:bg-accent-glow text-accent-foreground safety-glow"
            >
              Login to Dashboard
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/traveler-signup" className="text-accent hover:text-accent-glow font-semibold">
                Sign up here
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Are you an authority?{" "}
              <a href="/authority-login" className="text-primary hover:text-primary-glow font-semibold">
                Login here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelerLogin;
