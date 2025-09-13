import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Crop {
  id: string;
  name: string;
  status: 'favorable' | 'transitional' | 'unfavorable';
  seasonEnd: string;
  confidence: number;
}

const Crops = () => {
  const [myCrops, setMyCrops] = useState<Crop[]>([
    { id: '1', name: 'Cassava', status: 'favorable', seasonEnd: 'In 4 months', confidence: 95 },
    { id: '2', name: 'Tomatoes', status: 'transitional', seasonEnd: 'In 2 weeks', confidence: 72 },
    { id: '3', name: 'Rice', status: 'unfavorable', seasonEnd: 'Season ended', confidence: 30 },
  ]);

  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');

  const availableCrops = [
    'Maize', 'Yam', 'Sweet Potato', 'Plantain', 'Beans', 'Millet', 'Sorghum', 'Groundnut'
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'favorable':
        return { icon: CheckCircle, color: 'bg-success', text: 'Favorable Season' };
      case 'transitional':
        return { icon: Clock, color: 'bg-warning', text: 'Season Ending' };
      case 'unfavorable':
        return { icon: AlertTriangle, color: 'bg-destructive', text: 'Out of Season' };
      default:
        return { icon: Clock, color: 'bg-muted', text: 'Unknown' };
    }
  };

  const addCrop = () => {
    if (selectedCrop) {
      const newCrop: Crop = {
        id: Date.now().toString(),
        name: selectedCrop,
        status: 'favorable',
        seasonEnd: 'In 3 months',
        confidence: 88,
      };
      setMyCrops([...myCrops, newCrop]);
      setSelectedCrop('');
      setIsAddingCrop(false);
      toast({
        title: 'Crop Added',
        description: `${selectedCrop} has been added to your crop list.`,
      });
    }
  };

  const removeCrop = (cropId: string) => {
    setMyCrops(myCrops.filter(crop => crop.id !== cropId));
    toast({
      title: 'Crop Removed',
      description: 'Crop has been removed from your list.',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Crops</h1>
          <p className="text-muted-foreground">Track your crops and their seasonal status</p>
        </div>
        <Button onClick={() => setIsAddingCrop(true)} variant="hero">
          <Plus className="mr-2" />
          Add Crop
        </Button>
      </div>

      

      {/* Seasonal Status Overview with Backdrop */}
      <div
        className="relative rounded-xl overflow-hidden mb-8"
        style={{
          backgroundImage: `url('/oss/Farm5.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '120px',
        }}
      >
        <div className="relative z-10 grid gap-4 md:grid-cols-3 p-6">
          <Card className="bg-user-dashboard  backdrop-blur-sm shadow-none ">
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-success rounded-full mx-auto mb-2 flex items-center justify-center">
                <CheckCircle size={24} className="text-success-foreground" />
              </div>
              <h3 className="font-semibold text-success">Crops in favorable season:</h3>
              <p className="text-2xl font-bold text-success">
                {myCrops.filter(c => c.status === 'favorable').length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-user-dashboard backdrop-blur-sm shadow-none">
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-warning rounded-full mx-auto mb-2 flex items-center justify-center">
                <Clock size={24} className="text-warning-foreground" />
              </div>
              <h3 className="font-semibold text-warning">Crops in ending season:</h3>
              <p className="text-2xl font-bold text-warning">
                {myCrops.filter(c => c.status === 'transitional').length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-user-dashboard backdrop-blur-sm shadow-none">
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-destructive rounded-full mx-auto mb-2 flex items-center justify-center">
                <AlertTriangle size={24} className="text-destructive-foreground" />
              </div>
              <h3 className="font-semibold text-destructive">Crops in past season:</h3>
              <p className="text-2xl font-bold text-destructive">
                {myCrops.filter(c => c.status === 'unfavorable').length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>


      {/* Add Crop Form */}
      {isAddingCrop && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Crop</CardTitle>
            <CardDescription>Select a crop from our recommended list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a crop..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCrops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addCrop} disabled={!selectedCrop}>
                Add Crop
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingCrop(false);
                  setSelectedCrop('');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}


      {/* Crop List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {myCrops.map((crop) => {
          const statusInfo = getStatusInfo(crop.status);
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={crop.id} className="relative group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{crop.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeCrop(crop.id)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusInfo.color}`} />
                    <span className="text-sm font-medium">{statusInfo.text}</span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Season: {crop.seasonEnd}</p>
                    <p>Confidence: {crop.confidence}%</p>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${statusInfo.color}`}
                      style={{ width: `${crop.confidence}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      

      {myCrops.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <Plus size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No crops yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first crop to start tracking seasonal opportunities
            </p>
            <Button onClick={() => setIsAddingCrop(true)} variant="hero">
              Add Your First Crop
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Crops;