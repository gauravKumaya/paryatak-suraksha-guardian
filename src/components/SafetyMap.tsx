import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { AlertCircle, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SafetyMapProps {
  apiKey: string;
  onMapError?: (error: string) => void;
}

const SafetyMap = ({ apiKey, onMapError }: SafetyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [destination, setDestination] = useState("");
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);

  // Delhi coordinates as default
  const defaultCenter = { lat: 28.6139, lng: 77.2090 };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places", "geocoding"],
        });

        await loader.load();

        if (!mapRef.current) return;

        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 12,
          styles: [
            // Clean, light styling for better readability
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "simplified" }],
            },
          ],
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;

        // Try to get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );
              setUserLocation(pos);
              
              // Add user location marker
              new google.maps.Marker({
                position: pos,
                map: map,
                title: "Your Location",
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                },
              });

              // Center map on user location
              map.setCenter(pos);
              map.setZoom(14);
            },
            () => {
              // Geolocation failed, keep default center
              console.log("Geolocation failed, using default location");
            }
          );
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setIsLoading(false);
        onMapError?.("Failed to load Google Maps. Please check your API key and enabled services.");
      }
    };

    initializeMap();
  }, [apiKey, onMapError]);

  const handleRouteSearch = () => {
    if (!destination.trim() || !mapInstanceRef.current) return;

    const service = new google.maps.places.PlacesService(mapInstanceRef.current);
    const request = {
      query: destination,
      fields: ["place_id", "geometry", "name"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
        const place = results[0];
        if (place.geometry?.location) {
          // Add destination marker
          new google.maps.Marker({
            position: place.geometry.location,
            map: mapInstanceRef.current,
            title: place.name || "Destination",
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 6,
              fillColor: "#00C49F",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });

          // Center map to show both user location and destination
          const bounds = new google.maps.LatLngBounds();
          if (userLocation) bounds.extend(userLocation);
          bounds.extend(place.geometry.location);
          mapInstanceRef.current?.fitBounds(bounds);
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Route Search */}
      <Card className="p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Find the safest route to..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleRouteSearch()}
          />
          <Button 
            onClick={handleRouteSearch}
            className="bg-accent hover:bg-accent-glow text-accent-foreground"
            disabled={!destination.trim()}
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef} 
          className="h-96 w-full rounded-lg border border-border"
          style={{ minHeight: "400px" }}
        />
        
        {/* Safety Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-border trust-shadow">
          <h4 className="text-sm font-semibold mb-2">Safety Zones</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-safe rounded-full"></div>
              <span>Safe</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-caution rounded-full"></div>
              <span>Caution</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-danger rounded-full"></div>
              <span>Danger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
