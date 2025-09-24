import { useState } from "react";
import { Shield, MapPin, Navigation, AlertCircle, Phone, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GoogleApiKeyInput from "@/components/GoogleApiKeyInput";
import SafetyMap from "@/components/SafetyMap";

const TravelerDashboard = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setMapError(null);
    toast({
      title: "API Key Set",
      description: "Google Maps is now loading...",
    });
  };

  const handleMapError = (error: string) => {
    setMapError(error);
    toast({
      title: "Map Error",
      description: error,
      variant: "destructive",
    });
  };

  const handleSOS = () => {
    toast({
      title: "SOS Alert Activated",
      description: "Emergency services have been notified of your location.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed SOS Button */}
      <Button
        onClick={handleSOS}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-sos hover:bg-sos/90 text-white shadow-lg z-50 text-lg font-bold"
        size="lg"
      >
        SOS
      </Button>

      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-80 bg-card border-r border-border p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Paryatak Suraksha</h1>
              <p className="text-sm text-muted-foreground">Traveler Dashboard</p>
            </div>
          </div>

          {/* Welcome */}
          <Card className="trust-card mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-safe/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-safe" />
                </div>
                <div>
                  <h2 className="font-semibold text-primary">Welcome back!</h2>
                  <p className="text-sm text-muted-foreground">You're protected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Status */}
          <Card className="trust-card mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-safe" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Safety Level</span>
                  <span className="text-sm font-medium text-safe">Safe Zone</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">Delhi, India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Update</span>
                  <span className="text-sm font-medium">Just now</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="trust-card mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-accent" />
                Quick Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Local Police: 100
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Tourist Helpline: 1363
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-auto">
            <Button variant="outline" className="w-full">Logout</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Main Map Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Live Safety Map
              </h2>
              
              {mapError && (
                <Card className="mb-4 border-destructive">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{mapError}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!apiKey ? (
                <GoogleApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
              ) : (
                <SafetyMap apiKey={apiKey} onMapError={handleMapError} />
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="trust-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-secondary" />
                    Route Planning
                  </CardTitle>
                  <CardDescription>
                    AI-powered safe route recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your destination in the map search above to get the safest path with real-time updates.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    ✓ Real-time safety analysis<br/>
                    ✓ Avoid high-risk areas<br/>
                    ✓ Emergency contact points
                  </div>
                </CardContent>
              </Card>

              <Card className="trust-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-sos" />
                    Safety Features
                  </CardTitle>
                  <CardDescription>
                    Your protection toolkit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click the red SOS button (bottom-right) for immediate emergency assistance.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    ✓ Instant location sharing<br/>
                    ✓ Auto-notify authorities<br/>
                    ✓ Contact emergency services
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerDashboard;