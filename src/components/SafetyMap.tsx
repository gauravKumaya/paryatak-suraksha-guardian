import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SafetyMapProps {
  className?: string;
}

const SafetyMap: React.FC<SafetyMapProps> = ({ className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        // In a real implementation, this would come from environment variables
        // For now, we'll use a placeholder that needs to be replaced
        const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';
        
        if (GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') {
          setMapError('Google Maps API key not configured. Please add your API key.');
          setIsLoading(false);
          return;
        }

        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        const { Map } = await loader.importLibrary('maps');
        
        if (!mapRef.current) return;

        // Initialize map centered on Delhi
        const map = new Map(mapRef.current, {
          center: { lat: 28.6139, lng: 77.2090 },
          zoom: 12,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: false, // Disable fullscreen to maintain dashboard layout
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        // Add a marker for current location (Delhi center for now)
        const marker = new google.maps.Marker({
          position: { lat: 28.6139, lng: 77.2090 },
          map,
          title: 'Current Location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
          }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-sm">Delhi, India</h3>
              <p class="text-xs text-gray-600">Current monitoring area</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setMapError('Failed to load Google Maps. Please check your internet connection.');
        setIsLoading(false);
      }
    };

    initializeMap();
  }, []);

  if (mapError) {
    return (
      <Card className={`${className} border-2 border-dashed border-muted`}>
        <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Map Unavailable</h3>
          <p className="text-sm text-muted-foreground mb-4">{mapError}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Delhi, India - Monitoring Active</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <Card className="absolute inset-0 z-10 border-2 border-dashed border-muted">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading safety map...</p>
          </CardContent>
        </Card>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />
    </div>
  );
};

export default SafetyMap;