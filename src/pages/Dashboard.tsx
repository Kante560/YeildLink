import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sprout, AlertCircle, TrendingUp, MapPin, ShoppingCart, Cloud } from 'lucide-react';
import heroImage from '@/assets/hero-farming.jpg';
import { useAuth } from '@/AuthContext/AuthContext';



const Dashboard = () => {
  const recommendedCrops = [
    { name: 'Cassava', season: 'Peak Season', status: 'success', confidence: '95%' },
    { name: 'Yam', season: 'Favorable', status: 'success', confidence: '87%' },
    { name: 'Maize', season: 'Ending Soon', status: 'warning', confidence: '72%' },
  ];

  const seasonalAlerts = [
    {
      type: 'info',
      title: 'Rainy Season Approaching',
      message: 'Optimal time to plant cassava and yam. Prepare your fields.',
      urgency: 'medium',
    },
    {
      type: 'warning',
      title: 'Tomato Season Ending',
      message: 'Consider harvesting tomatoes within 2 weeks.',
      urgency: 'high',
    },
  ];

  const { user } = useAuth();

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero">
        <div className="absolute inset-0">
          <img 
            src={"/oss/Farm5.jpeg"} 
            alt="Smart farming technology" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative p-8 text-primary-foreground">
          {/* Sidebar trigger icon for mobile/desktop */}
        
          <h1 className="text-3xl font-bold mb-2">Hello {user?.name || 'Farmer'}! 👋</h1>
          <p className="text-lg opacity-90 mb-6">
            Here's today's crop insights for your region
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
              <Sprout className="mr-2" />
              My Crops
            </Button>
            <Button variant="outline" className="bg-transparent border-white/30 text-primary-foreground hover:bg-white/20">
              <MapPin className="mr-2" />
              Find on Map
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended Crops */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 text-primary" />
            Recommended Crops Now
          </CardTitle>
          <CardDescription>
            AI-powered seasonal suggestions for your location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedCrops.map((crop, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{crop.name}</h3>
                  <Badge 
                    variant={crop.status === 'success' ? 'default' : 'secondary'}
                    className={crop.status === 'success' ? 'bg-success text-success-foreground' : ''}
                  >
                    {crop.season}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{crop.confidence} confidence</p>
                <Button size="sm" variant="outline" className="w-full">
                  Add to My Crops
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 text-warning" />
            Seasonal Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seasonalAlerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.urgency === 'high' ? 'border-l-warning bg-warning/5' : 'border-l-primary bg-primary/5'
              }`}>
                <h4 className="font-semibold mb-2">{alert.title}</h4>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      
    </div>
  );
};

export default Dashboard;