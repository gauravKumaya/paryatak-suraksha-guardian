import { Shield, Users, AlertTriangle, MapPin, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthorityDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Paryatak Suraksha</h1>
              <p className="text-sm text-muted-foreground">Authority Control Panel</p>
            </div>
          </div>
          <Button variant="outline">Logout</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="trust-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Travelers</p>
                  <p className="text-3xl font-bold text-primary">1,247</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="trust-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active SOS Alerts</p>
                  <p className="text-3xl font-bold text-sos">3</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-sos" />
              </div>
            </CardContent>
          </Card>

          <Card className="trust-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High-Risk Zones</p>
                  <p className="text-3xl font-bold text-caution">12</p>
                </div>
                <MapPin className="w-8 h-8 text-caution" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="trust-card h-96">
              <CardHeader>
                <CardTitle>Live Monitoring Map</CardTitle>
                <CardDescription>
                  Real-time view of all active travelers and safety zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Interactive Map Coming Soon
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Full monitoring capabilities with live traveler locations, 
                      safety zones, and incident tracking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Panel */}
          <div>
            <Card className="trust-card h-96">
              <CardHeader>
                <CardTitle>Live Alerts</CardTitle>
                <CardDescription>
                  Real-time notifications and incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample Alert Items */}
                  <div className="p-3 bg-sos/10 border border-sos/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-sos rounded-full"></div>
                      <span className="text-xs font-medium text-sos">SOS TRIGGERED</span>
                    </div>
                    <p className="text-sm font-medium">User #1247</p>
                    <p className="text-xs text-muted-foreground">Connaught Place, Delhi</p>
                  </div>

                  <div className="p-3 bg-caution/10 border border-caution/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-caution rounded-full"></div>
                      <span className="text-xs font-medium text-caution">RISK ZONE ENTRY</span>
                    </div>
                    <p className="text-sm font-medium">User #892</p>
                    <p className="text-xs text-muted-foreground">Old Delhi Station</p>
                  </div>

                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-xs font-medium text-accent">SYSTEM UPDATE</span>
                    </div>
                    <p className="text-sm font-medium">Safety Algorithm Updated</p>
                    <p className="text-xs text-muted-foreground">Enhanced detection active</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button className="w-full" variant="outline" disabled>
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-8">
          <Card className="trust-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Authority Dashboard Under Development
              </h3>
              <p className="text-muted-foreground">
                The complete monitoring system with interactive maps, real-time alerts, 
                and comprehensive traveler tracking is being finalized. 
                Full authority controls will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;