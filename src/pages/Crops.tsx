import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getAllCrops, addCropToTracker, ApiCrop, getTrackedCrops, deleteTrackedCrop, TrackedCrop } from '@/services/cropService';
import { useAuth } from '@/AuthContext/AuthContext';

interface Crop {
  id: string; // trackerId when coming from backend
  name: string;
  status: 'favorable' | 'transitional' | 'unfavorable';
  seasonEnd: string;
  confidence: number;
}

const Crops = () => {
const [myCrops, setMyCrops] = useState<Crop[]>([]);

  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState<string>('');
  const [availableCrops, setAvailableCrops] = useState<ApiCrop[]>([]);
  const [loadingCrops, setLoadingCrops] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingCrops(true);
        const crops = await getAllCrops();
        setAvailableCrops(crops);
      } catch (err: any) {
        toast({ title: 'Failed to load crops', description: err.message, variant: 'destructive' });
      } finally {
        setLoadingCrops(false);
      }
    };
    load();
  }, []);

  // Load tracked crops for the user so we don't lose them on reload
  useEffect(() => {
    const loadTracked = async () => {
      if (!user) return;
      try {
        const tracked = await getTrackedCrops((user as any).id ?? (user as any).userId ?? '');
        const mapped: Crop[] = tracked.map((t) => ({
          id: t.trackerId,
          name: t.name,
          status: 'favorable',
          seasonEnd: 'In 3 months',
          confidence: 88,
        }));
        setMyCrops(mapped);
      } catch (err: any) {
        toast({ title: 'Failed to load your tracked crops', description: err.message, variant: 'destructive' });
      }
    };
    // Small delay to avoid stale caches from timing
    setTimeout(loadTracked, 50);
  }, [user]);

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

  const addCrop = async () => {
    if (!selectedCropId) return;
    if (!user) {
      toast({ title: 'Not authenticated', description: 'Please login to add crops.', variant: 'destructive' });
      return;
    }
    try {
      await addCropToTracker({ cropId: selectedCropId, userId: (user as any).id ?? (user as any).userId ?? '' });
      // Backend add route returns no body. Reload tracked crops to sync real trackerIds.
      const tracked = await getTrackedCrops((user as any).id ?? (user as any).userId ?? '');
      const mapped: Crop[] = tracked.map((t) => ({
        id: t.trackerId,
        name: t.name,
        status: 'favorable',
        seasonEnd: 'In 3 months',
        confidence: 88,
      }));
      setMyCrops(mapped);
      setSelectedCropId('');
      setIsAddingCrop(false);
      toast({ title: 'Crop Added', description: 'Crop added to your tracker.' });
    } catch (err: any) {
      toast({ title: 'Failed to add crop', description: err.message, variant: 'destructive' });
    }
  };

  const removeCrop = async (trackerId: string) => {
    if (!user) return;
    try {
      await deleteTrackedCrop((user as any).id ?? (user as any).userId ?? '', trackerId);
      const tracked = await getTrackedCrops((user as any).id ?? (user as any).userId ?? '');
      const mapped: Crop[] = tracked.map((t) => ({
        id: t.trackerId,
        name: t.name,
        status: 'favorable',
        seasonEnd: 'In 3 months',
        confidence: 88,
      }));
      setMyCrops(mapped);
    } catch (err: any) {
      toast({ title: 'Failed to remove crop', description: err.message, variant: 'destructive' });
    }
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
            <CardContent className="p-6 ">
              <div className='flex justify-start flex-col'>            
              <div>
                 <div className="w-8 h-8 bg-success  rounded-full  mb-6 flex items-center justify-center">
                <CheckCircle size={24} className="text-success-foreground" />
              </div> 
              </div>
              <div className='flex'>
             <h3 className="font-semibold text-success">Crops in favorable season:</h3>
              <p className="text-2xl font-bold mt-5 text-success">
                {myCrops.filter(c => c.status === 'favorable').length}
              </p>
              </div>
             </div>
              
            </CardContent>
          </Card>
          <Card className="bg-user-dashboard backdrop-blur-sm shadow-none">
            <CardContent className="p-6 ">
              <div className='flex justify-start flex-col'>
              <div className="w-8 h-8 bg-warning rounded-full  mb-6 flex items-center justify-center">
                <Clock size={24} className="text-warning-foreground" />
              </div>  
              </div>
              <div className='flex'>
                <h3 className="font-semibold text-warning">Crops in ending season:</h3>
              <p className="text-2xl font-bold mt-5  text-warning">
                {myCrops.filter(c => c.status === 'transitional').length}
              </p>
              </div>
              
            </CardContent>
          </Card>
          <Card className="bg-user-dashboard backdrop-blur-sm shadow-none">
            <CardContent className="p-6 ">
              <div className='flex justify-start flex-col'>
                 <div className="w-8 h-8 bg-destructive rounded-full  mb-6 flex items-center justify-center">
                <AlertTriangle size={24} className="text-destructive-foreground" />
              </div>
              </div>
             <div className='flex'>
               <h3 className="font-semibold text-destructive">Crops in past season:</h3>
              <p className="text-2xl font-bold mt-5 text-destructive">
                {myCrops.filter(c => c.status === 'unfavorable').length}
              </p>
             </div>
             
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
                <Select value={selectedCropId} onValueChange={setSelectedCropId}>
                  <SelectTrigger>
                    <SelectValue placeholder={loadingCrops ? 'Loading crops...' : 'Select a crop...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCrops.map((crop) => (
                      <SelectItem key={String(crop.id)} value={String(crop.id)}>
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addCrop} disabled={!selectedCropId}>
                Add Crop
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingCrop(false);
                  setSelectedCropId('');
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
                    aria-label="Remove crop"
                    className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
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