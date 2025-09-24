import { useState } from "react";
import { Shield, Upload, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignUp = () => {
  const [userType, setUserType] = useState<"traveler" | "authority">("traveler");

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
          <CardTitle className="text-2xl text-primary">Create Your Account</CardTitle>
          <CardDescription>
            Join the safest travel community in India
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="traveler" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="traveler" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Traveler
              </TabsTrigger>
              <TabsTrigger value="authority" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Authority
              </TabsTrigger>
            </TabsList>

            <TabsContent value="traveler">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
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
                    <div>
                      <Label htmlFor="idUpload">Legal ID (Aadhaar/Passport)</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-accent transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="photoUpload">Profile Photograph</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-accent transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Passport-style photograph
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent-glow text-accent-foreground safety-glow">
                  Create Safe Profile
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="authority">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="authName">Full Name</Label>
                  <Input
                    id="authName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authEmail">Official Email</Label>
                  <Input
                    id="authEmail"
                    type="email"
                    placeholder="official@department.gov.in"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="Tourism/Police/Security"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authId">Authority ID</Label>
                  <Input
                    id="authId"
                    type="text"
                    placeholder="Official identification number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authPassword">Password</Label>
                  <Input
                    id="authPassword"
                    type="password"
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground trust-shadow">
                  Submit for Verification
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-accent hover:text-accent-glow font-semibold">
                Login here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;