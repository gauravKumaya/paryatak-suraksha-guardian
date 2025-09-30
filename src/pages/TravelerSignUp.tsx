import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/FileUpload";

const TravelerSignUp = () => {
  const [idFile, setIdFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTravelerSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Basic validation
    if (!idFile || !photoFile) {
      toast({
        title: "Missing Documents",
        description: "Please upload both your ID and photograph for verification.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Traveler signup data:", {
      name: formData.get('fullName'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      idFile,
      photoFile
    });
    
    toast({
      title: "Account Created Successfully!",
      description: "Please login to continue.",
    });
    
    // Navigate to login page
    navigate("/traveler-login");
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
          <CardTitle className="text-2xl text-primary">Traveler Sign Up</CardTitle>
          <CardDescription>
            Join the safest travel community in India
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleTravelerSignUp}>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                className="border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="+91 9876543210"
                required
                className="border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                required
                className="border-border focus:ring-accent"
              />
            </div>

            {/* Identity Verification Section */}
            <div className="border-t border-border pt-4 mt-6">
              <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Identity Verification
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                For your security, we use blockchain-based identity verification
              </p>

              <div className="space-y-4">
                <FileUpload
                  label="Legal ID (Aadhaar/Passport)"
                  accept="image/*,.pdf"
                  helperText="Upload a clear photo of your Aadhaar card or passport"
                  onFileSelect={setIdFile}
                />

                <FileUpload
                  label="Profile Photograph"
                  accept="image/*"
                  helperText="Passport-style photograph"
                  onFileSelect={setPhotoFile}
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-accent hover:bg-accent-glow text-accent-foreground safety-glow"
            >
              Create Safe Profile
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/traveler-login" className="text-accent hover:text-accent-glow font-semibold">
                Login here
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Are you an authority?{" "}
              <a href="/authority-signup" className="text-primary hover:text-primary-glow font-semibold">
                Sign up here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelerSignUp;
