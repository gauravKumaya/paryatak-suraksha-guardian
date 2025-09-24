import { Shield, MapPin, Navigation, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

        {/* Dashboard Features - Coming Soon */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="trust-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Live Safety Map
              </CardTitle>
              <CardDescription>
                Real-time safety heatmap of your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive map showing safe zones, caution areas, and routes.
              </p>
              <Button className="w-full bg-accent hover:bg-accent-glow text-accent-foreground" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

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
                <AlertCircle className="w-5 h-5 text-sos" />
                Emergency SOS
              </CardTitle>
              <CardDescription>
                Instant emergency assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                One-tap emergency alert to nearby authorities and contacts.
              </p>
              <Button className="w-full bg-sos hover:bg-sos/90 text-white" disabled>
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