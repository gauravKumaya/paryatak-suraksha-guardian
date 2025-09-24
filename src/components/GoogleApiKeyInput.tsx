import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, AlertCircle } from "lucide-react";

interface GoogleApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isLoading?: boolean;
}

const GoogleApiKeyInput = ({ onApiKeySubmit, isLoading = false }: GoogleApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <Card className="trust-card max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5 text-accent" />
          Google Maps Setup
        </CardTitle>
        <CardDescription>
          Enter your Google Maps API key to enable the interactive safety map
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-accent hover:bg-accent-glow text-accent-foreground"
            disabled={!apiKey.trim() || isLoading}
          >
            {isLoading ? "Loading Map..." : "Initialize Map"}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="text-sm text-muted-foreground"
            >
              Need help getting an API key?
            </Button>
          </div>

          {showHelp && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Required APIs:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Maps JavaScript API</li>
                    <li>Places API</li>
                    <li>Geocoding API</li>
                  </ul>
                  <p className="mt-2 text-xs">
                    Visit Google Cloud Console to create and configure your API key.
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default GoogleApiKeyInput;