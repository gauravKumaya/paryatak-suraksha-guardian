import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

interface SafetyMapProps {
  apiKey: string;
}

// Mock safety data - in real app this would come from API
const mockSafetyZones = [
  { lat: 28.6139, lng: 77.2090, radius: 1000, level: 'safe' },
  { lat: 28.6129, lng: 77.2290, radius: 800, level: 'caution' },
  { lat: 28.6289, lng: 77.2190, radius: 600, level: 'danger' },
  { lat: 28.6039, lng: 77.2190, radius: 1200, level: 'safe' },
  { lat: 28.6239, lng: 77.2390, radius: 900, level: 'caution' },
];

const SafetyMap: React.FC<SafetyMapProps> = ({ apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.Autocomplete | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || !apiKey) return;

      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      try {
        await loader.load();
        
        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setUserLocation(location);
              initializeMap(location);
            },
            () => {
              // Default to Delhi if location access denied
              const defaultLocation = { lat: 28.6139, lng: 77.2090 };
              setUserLocation(defaultLocation);
              initializeMap(defaultLocation);
            }
          );
        } else {
          const defaultLocation = { lat: 28.6139, lng: 77.2090 };
          setUserLocation(defaultLocation);
          initializeMap(defaultLocation);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    const initializeMap = (center: { lat: number; lng: number }) => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add user location marker
      new google.maps.Marker({
        position: center,
        map,
        title: 'Your Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#00C49F',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
      });

      // Add safety zone overlays
      mockSafetyZones.forEach(zone => {
        const color = zone.level === 'safe' ? '#2ECC71' : 
                     zone.level === 'caution' ? '#F1C40F' : '#E74C3C';
        
        new google.maps.Circle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map,
          center: { lat: zone.lat, lng: zone.lng },
          radius: zone.radius,
        });
      });

      // Initialize directions service and renderer
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#00C49F',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });
      
      setDirectionsService(directionsService);
      setDirectionsRenderer(directionsRenderer);
      directionsRenderer.setMap(map);

      // Initialize Places service for search
      const searchInput = document.getElementById('destination-search') as HTMLInputElement;
      if (searchInput) {
        const autocomplete = new google.maps.places.Autocomplete(searchInput, {
          componentRestrictions: { country: 'in' },
          fields: ['place_id', 'geometry', 'name', 'formatted_address']
        });
        
        setAutocompleteService(autocomplete);
        
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry?.location) return;
          
          calculateSafestRoute(center, {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
        });
      }
    };

    initMap();
  }, [apiKey]);

  const calculateSafestRoute = (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidHighways: false,
      avoidTolls: false
    }, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
        
        // Fit map to show entire route
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(origin);
        bounds.extend(destination);
        mapInstanceRef.current?.fitBounds(bounds);
      }
    });
  };

  if (!apiKey) {
    return (
      <Card className="trust-card h-96 flex items-center justify-center">
        <CardContent>
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Google Maps API Key Required</h3>
            <p className="text-muted-foreground">
              Please provide your Google Maps API key to enable the safety map feature.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96 lg:h-[600px]">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              id="destination-search"
              placeholder="Find the safest route to..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-background/95 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Safety Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="trust-card">
          <CardContent className="p-3">
            <h4 className="text-sm font-semibold mb-2">Safety Zones</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-safe"></div>
                <span className="text-xs">Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-xs">Caution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sos"></div>
                <span className="text-xs">Danger</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />
    </div>
  );
};

export default SafetyMap;