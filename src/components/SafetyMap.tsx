import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SafetyMapProps {
  className?: string;
  onLocationUpdate?: (lat: number, lng: number) => void;
}

const SafetyMap: React.FC<SafetyMapProps> = ({ className, onLocationUpdate }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    // Get user's current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(location);
            onLocationUpdate?.(location.lat, location.lng);
          },
          (error) => {
            console.warn('Geolocation error:', error);
            // Fallback to Delhi
            const fallback = { lat: 28.6139, lng: 77.2090 };
            setUserLocation(fallback);
            onLocationUpdate?.(fallback.lat, fallback.lng);
          }
        );
      } else {
        // Fallback to Delhi
        const fallback = { lat: 28.6139, lng: 77.2090 };
        setUserLocation(fallback);
        onLocationUpdate?.(fallback.lat, fallback.lng);
      }
    };

    getUserLocation();
  }, [onLocationUpdate]);

  useEffect(() => {
    if (!userLocation) return;

    const initializeMap = async () => {
      try {
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

        // Initialize map centered on user's location
        const map = new Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
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

        // Add a live marker for user's current location
        userMarkerRef.current = new google.maps.Marker({
          position: userLocation,
          map,
          title: 'Your Location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#00C49F',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3
          },
          animation: google.maps.Animation.DROP
        });

        // Add accuracy circle
        new google.maps.Circle({
          strokeColor: '#00C49F',
          strokeOpacity: 0.4,
          strokeWeight: 2,
          fillColor: '#00C49F',
          fillOpacity: 0.1,
          map,
          center: userLocation,
          radius: 50 // 50 meters accuracy radius
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-sm">Your Current Location</h3>
              <p class="text-xs text-gray-600">Live tracking enabled</p>
            </div>
          `
        });

        userMarkerRef.current.addListener('click', () => {
          infoWindow.open(map, userMarkerRef.current!);
        });

        // Watch position for live updates
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              const newLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setUserLocation(newLocation);
              onLocationUpdate?.(newLocation.lat, newLocation.lng);
              
              if (userMarkerRef.current) {
                userMarkerRef.current.setPosition(newLocation);
              }
            },
            (error) => console.warn('Watch position error:', error),
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
          );
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setMapError('Failed to load Google Maps. Please check your internet connection.');
        setIsLoading(false);
      }
    };

    initializeMap();
  }, [userLocation, onLocationUpdate]);

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