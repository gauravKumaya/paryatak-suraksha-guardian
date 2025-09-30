import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Loader2, MapPinned } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface RouteFinderPanelProps {
  onRouteRequest?: (source: string, destination: string) => Promise<void>;
}

const RouteFinderPanel: React.FC<RouteFinderPanelProps> = ({ onRouteRequest }) => {
  const [source, setSource] = useState('Your Current Location');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);
  const sourceAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        if (!window.google?.maps?.places) {
          console.warn('Google Places API not loaded yet');
          return;
        }

        // Initialize source autocomplete
        if (sourceInputRef.current && !sourceAutocompleteRef.current) {
          sourceAutocompleteRef.current = new google.maps.places.Autocomplete(
            sourceInputRef.current,
            {
              componentRestrictions: { country: 'in' },
              fields: ['formatted_address', 'geometry', 'name'],
            }
          );

          sourceAutocompleteRef.current.addListener('place_changed', () => {
            const place = sourceAutocompleteRef.current?.getPlace();
            if (place?.formatted_address) {
              setSource(place.formatted_address);
            }
          });
        }

        // Initialize destination autocomplete
        if (destInputRef.current && !destAutocompleteRef.current) {
          destAutocompleteRef.current = new google.maps.places.Autocomplete(
            destInputRef.current,
            {
              componentRestrictions: { country: 'in' },
              fields: ['formatted_address', 'geometry', 'name'],
            }
          );

          destAutocompleteRef.current.addListener('place_changed', () => {
            const place = destAutocompleteRef.current?.getPlace();
            if (place?.formatted_address) {
              setDestination(place.formatted_address);
            }
          });
        }
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
      }
    };

    // Retry initialization if Google Maps is not ready yet
    const checkInterval = setInterval(() => {
      if (window.google?.maps?.places) {
        initializeAutocomplete();
        clearInterval(checkInterval);
      }
    }, 500);

    // Clear interval after 10 seconds to avoid infinite checking
    setTimeout(() => clearInterval(checkInterval), 10000);

    return () => clearInterval(checkInterval);
  }, []);

  const handleFindRoute = async () => {
    if (!destination.trim()) {
      toast({
        title: 'Destination Required',
        description: 'Please enter a destination to find a route',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      if (onRouteRequest) {
        await onRouteRequest(source, destination);
      } else {
        // Simulate API call for demonstration
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast({
          title: 'Route Calculated',
          description: 'The safest route has been displayed on the map',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to calculate route. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="trust-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Navigation className="w-5 h-5 text-accent" />
          Find a Safe Route
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Source Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Starting Point</label>
          <div className="relative">
            <MapPinned className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={sourceInputRef}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Your Current Location"
              className="pl-10"
            />
          </div>
        </div>

        {/* Destination Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={destInputRef}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              className="pl-10"
            />
          </div>
        </div>

        {/* Find Route Button */}
        <Button
          onClick={handleFindRoute}
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 mr-2" />
              Find Safest Route
            </>
          )}
        </Button>

        {/* Info Text */}
        <p className="text-xs text-muted-foreground text-center">
          We'll calculate the safest route based on real-time safety data
        </p>
      </CardContent>
    </Card>
  );
};

export default RouteFinderPanel;
