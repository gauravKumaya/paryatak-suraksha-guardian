import { Shield, MapPin, Navigation, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SafetyMap from "@/components/SafetyMap";

const TravelerDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Paryatak Suraksha</h1>
              <p className="text-sm text-muted-foreground">Traveler Dashboard</p>
            </div>
          </div>
          <Button variant="outline">Logout</Button>
        </div>

        {/* Welcome Message */}
        <Card className="trust-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-safe/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-safe" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Welcome back! Your safety is our priority.
                </h2>
                <p className="text-muted-foreground">
                  Your current location is being monitored for optimal safety. 
                  Use the features below to plan your journey.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Interactive Safety Map */}
          <div className="lg:col-span-2">
            <Card className="trust-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Live Safety Map
                </CardTitle>
                <CardDescription>
                  Real-time safety monitoring for Delhi region
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <SafetyMap className="h-[400px] rounded-b-lg" />
              </CardContent>
            </Card>
          </div>

          {/* Safety Status & Emergency */}
          <div className="space-y-6">
            {/* Current Safety Status */}
            <Card className="trust-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-safe" />
                  Safety Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-safe rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-safe">Area Safe</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Current location shows normal activity levels
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span className="text-muted-foreground">5km radius</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency SOS */}
            <Card className="trust-card border-sos/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-sos" />
                  Emergency SOS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full h-12 bg-sos hover:bg-sos/90 text-white font-semibold text-lg safety-glow"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  EMERGENCY
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Instant alert to authorities & emergency contacts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="trust-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-secondary" />
                Safe Route Finder
              </CardTitle>
              <CardDescription>
                AI-powered route recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get the safest path to your destination with real-time updates.
              </p>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="trust-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Travel Insights
              </CardTitle>
              <CardDescription>
                Smart analytics for your journeys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Historical safety data and personalized travel recommendations.
              </p>
              <Button className="w-full" variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Message */}
        <div className="mt-8 text-center">
          <Card className="trust-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Dashboard Under Development
              </h3>
              <p className="text-muted-foreground">
                Your traveler dashboard is being built with advanced safety features. 
                The full interactive map, route planning, and emergency systems will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelerDashboard;