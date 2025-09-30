import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AuthoritySignUp = () => {
  const { toast } = useToast();

  const handleAuthoritySignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    toast({
      title: "Verification Request Submitted",
      description: "Your authority credentials are being reviewed. We'll contact you within 24 hours.",
    });
    
    console.log("Authority signup data:", {
      name: formData.get('authName'),
      email: formData.get('authEmail'),
      department: formData.get('department'),
      authId: formData.get('authId')
    });
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
          <CardTitle className="text-2xl text-primary">Authority Sign Up</CardTitle>
          <CardDescription>
            Register as a verified safety authority
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleAuthoritySignUp}>
            <div className="space-y-2">
              <Label htmlFor="authName">Full Name</Label>
              <Input
                id="authName"
                name="authName"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authEmail">Official Email</Label>
              <Input
                id="authEmail"
                name="authEmail"
                type="email"
                placeholder="official@department.gov.in"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder="Tourism/Police/Security"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authId">Authority ID</Label>
              <Input
                id="authId"
                name="authId"
                type="text"
                placeholder="Official identification number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authPassword">Password</Label>
              <Input
                id="authPassword"
                name="authPassword"
                type="password"
                placeholder="Create a strong password"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary-glow text-primary-foreground trust-shadow"
            >
              Submit for Verification
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/authority-login" className="text-primary hover:text-primary-glow font-semibold">
                Login here
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Are you a traveler?{" "}
              <a href="/traveler-signup" className="text-accent hover:text-accent-glow font-semibold">
                Sign up here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthoritySignUp;
