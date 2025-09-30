import { Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SignUpSuccess = () => {
  const navigate = useNavigate();

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
          
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-safe/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-safe" />
            </div>
          </div>

          <CardTitle className="text-2xl text-primary">Sign Up Successful!</CardTitle>
          <CardDescription className="text-base mt-2">
            Confirmation email will be sent to you after verification
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Our team will review your information and verify your identity. 
              This process typically takes 24-48 hours.
            </p>
          </div>

          <Button 
            onClick={() => navigate("/")}
            className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
          >
            Return to Home Page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpSuccess;
