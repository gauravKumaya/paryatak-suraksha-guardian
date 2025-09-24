import { MapPin, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";

const HeatmapPreview = () => {
  return (
    <Card className="trust-card max-w-4xl mx-auto border-0 overflow-hidden">
      <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-muted/50 to-muted rounded-lg">
        {/* Mock Map Background */}
        <div className="absolute inset-0 p-8">
          {/* Map Grid Background */}
          <div className="w-full h-full relative bg-gray-100 rounded-lg overflow-hidden">
            {/* Delhi/Agra Mock Layout */}
            <div className="absolute inset-0 p-4">
              
              {/* Safe Zones (Green) */}
              <div className="absolute top-8 left-8 w-24 h-16 status-safe rounded-lg opacity-70"></div>
              <div className="absolute top-12 right-12 w-20 h-20 status-safe rounded-lg opacity-70"></div>
              <div className="absolute bottom-16 left-16 w-28 h-12 status-safe rounded-lg opacity-70"></div>
              
              {/* Caution Zones (Yellow) */}
              <div className="absolute top-20 left-1/3 w-16 h-24 status-caution rounded-lg opacity-70"></div>
              <div className="absolute bottom-8 right-1/4 w-20 h-16 status-caution rounded-lg opacity-70"></div>
              
              {/* Danger Zones (Red) */}
              <div className="absolute top-1/3 right-8 w-14 h-18 status-danger rounded-lg opacity-70"></div>
              <div className="absolute bottom-1/4 left-1/4 w-12 h-14 status-danger rounded-lg opacity-70"></div>
              
              {/* Current Location Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-primary rounded-full border-4 border-white animate-pulse shadow-lg"></div>
                <MapPin className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-8 h-8 text-primary" />
              </div>
              
              {/* Sample Route Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 120 200 Q 200 150 280 180 Q 350 220 400 160"
                  stroke="hsl(162, 100%, 39%)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>
              
              {/* Destination Marker */}
              <div className="absolute top-16 right-16">
                <div className="w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg"></div>
                <Navigation className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Safety Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-sm mb-3 text-primary">Safety Zones</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-safe rounded-sm"></div>
              <span className="text-xs font-medium text-foreground">Safe</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-caution rounded-sm"></div>
              <span className="text-xs font-medium text-foreground">Caution</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-danger rounded-sm"></div>
              <span className="text-xs font-medium text-foreground">Danger</span>
            </div>
          </div>
        </div>
        
        {/* Route Info */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-sm font-semibold text-primary">Safest Route</span>
          </div>
          <p className="text-xs text-muted-foreground">Avoids 2 high-risk areas</p>
          <p className="text-xs text-muted-foreground">Est. time: 18 min</p>
        </div>
      </div>
    </Card>
  );
};

export default HeatmapPreview;