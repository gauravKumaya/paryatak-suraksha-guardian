import { Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SafetyMap from "@/components/SafetyMap";
import GoogleApiKeyInput from "@/components/GoogleApiKeyInput";
import { useState } from "react";

const TravelerDashboard = () => {
  const [googleApiKey, setGoogleApiKey] = useState<string>(() => {
    return localStorage.getItem('google-maps-api-key') || '';
  });

  const handleApiKeySubmit = (apiKey: string) => {
    setGoogleApiKey(apiKey);
    localStorage.setItem('google-maps-api-key', apiKey);
  };

  const handleSOS = () => {
    // SOS functionality - would integrate with emergency services
    alert('SOS Alert Triggered! Emergency services have been notified.');
  };

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

        {/* Safety Map Section */}
        <div className="mb-8">
          <Card className="trust-card">
            <CardHeader>
              <CardTitle>Live Safety Map</CardTitle>
              <CardDescription>
                Real-time safety monitoring and route planning for your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!googleApiKey ? (
                <GoogleApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
              ) : (
                <SafetyMap apiKey={googleApiKey} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="trust-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-sos" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>
                Quick access to emergency services and contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📞 Local Police: 100
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🚑 Ambulance: 108
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔥 Fire Brigade: 101
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  👩‍💼 Tourist Helpline: 1363
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="trust-card">
            <CardHeader>
              <CardTitle>Safety Status</CardTitle>
              <CardDescription>
                Your current safety status and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 bg-safe rounded-full"></div>
                <span className="text-sm">Currently in Safe Zone</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                You are in a well-monitored area with good safety ratings. Continue following your planned route.
              </p>
              <Button variant="outline" className="w-full">
                View Safety Tips
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* SOS Button - Fixed Position */}
        <Button
          onClick={handleSOS}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-sos hover:bg-sos/90 text-white shadow-lg z-50"
          size="lg"
        >
          <span className="text-sm font-bold">SOS</span>
        </Button>
      </div>
    </div>
  );
};

export default TravelerDashboard;