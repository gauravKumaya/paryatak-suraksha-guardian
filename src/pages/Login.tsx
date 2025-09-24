import { Shield, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
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
          <CardTitle className="text-2xl text-primary">Welcome Back</CardTitle>
          <CardDescription>
            Login to access your safety dashboard
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
                  <Label htmlFor="travelerEmail">Email Address</Label>
                  <Input
                    id="travelerEmail"
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

                <Button className="w-full bg-accent hover:bg-accent-glow text-accent-foreground safety-glow">
                  Login to Dashboard
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="authority">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="authorityEmail">Official Email</Label>
                  <Input
                    id="authorityEmail"
                    type="email"
                    placeholder="official@department.gov.in"
                    required
                    className="border-border focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authorityPassword">Password</Label>
                  <Input
                    id="authorityPassword"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="border-border focus:ring-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-sm text-primary hover:text-primary-glow">
                    Forgot password?
                  </a>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground trust-shadow">
                  Access Control Panel
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="text-accent hover:text-accent-glow font-semibold">
                Sign up here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;