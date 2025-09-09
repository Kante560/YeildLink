import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Navigation } from 'lucide-react';

interface CropArea {
  id: string;
  crop: string;
  location: string;
  distance: string;
  suitability: 'high' | 'medium' | 'low';
  coordinates: string;
}

const Map = () => {
  const [searchCrop, setSearchCrop] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  const cropAreas: CropArea[] = [
    { id: '1', crop: 'Tomatoes', location: 'Obudu, Cross River', distance: '35km north', suitability: 'high', coordinates: '6.6646°N, 9.1665°E' },
    { id: '2', crop: 'Cassava', location: 'Zaria, Kaduna', distance: '12km south', suitability: 'high', coordinates: '11.0667°N, 7.7167°E' },
    { id: '3', crop: 'Maize', location: 'Kafanchan, Kaduna', distance: '28km east', suitability: 'medium', coordinates: '9.5833°N, 8.2833°E' },
    { id: '4', crop: 'Yam', location: 'Benue Valley', distance: '45km southeast', suitability: 'high', coordinates: '7.7319°N, 8.5324°E' },
    { id: '5', crop: 'Rice', location: 'Kebbi Floodplains', distance: '120km northwest', suitability: 'high', coordinates: '12.4667°N, 4.1833°E' },
  ];

  const cropTypes = ['Tomatoes', 'Cassava', 'Maize', 'Yam', 'Rice', 'Beans', 'Plantain', 'Sweet Potato'];
  
  const filteredAreas = cropAreas.filter(area => 
    selectedCrop && selectedCrop !== 'all' ? area.crop === selectedCrop : true
  );

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'high': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const alternativeCrops = ['Sweet Potato', 'Beans', 'Plantain'];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Map & Crop Insights</h1>
        <p className="text-muted-foreground">Discover favorable crop areas and seasonal opportunities</p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2" />
            Search Crop Areas
          </CardTitle>
          <CardDescription>
            Find the best regions for specific crops
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="cropSearch">Search for a crop</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a crop to search..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All crops</SelectItem>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="hero">
              <Search className="mr-2 w-4 h-4" />
              Search Areas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2" />
            Regional Map
          </CardTitle>
          <CardDescription>
            Interactive map showing favorable crop areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-earth rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10" />
            <div className="text-center z-10">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-muted-foreground">
                Map integration coming soon - showing {filteredAreas.length} favorable areas
              </p>
            </div>
            
            {/* Sample Map Pins */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-success rounded-full animate-pulse" />
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-success rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-warning rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-success rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Results Panel */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedCrop && selectedCrop !== 'all' ? `${selectedCrop} Areas` : 'All Favorable Areas'}
            <Badge variant="outline" className="ml-2">
              {filteredAreas.length} found
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAreas.map((area) => (
              <Card key={area.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{area.crop}</h3>
                    <Badge className={getSuitabilityColor(area.suitability)}>
                      {area.suitability} suitability
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {area.location}
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Navigation className="w-4 h-4 mr-2" />
                      {area.distance}
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Coordinates: {area.coordinates}
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Suggestions */}
      {selectedCrop && selectedCrop !== 'all' && filteredAreas.length < 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Alternative Crop Suggestions</CardTitle>
            <CardDescription>
              These crops are currently favorable in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {alternativeCrops.map((crop) => (
                <Button
                  key={crop}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCrop(crop)}
                >
                  {crop}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Map;