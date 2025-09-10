import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Plus, MapPin, Phone, Mail, Search, Clock, User, Truck, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Listing {
  id: string;
  crop: string;
  location: string;
  quantity: string;
  contact: string;
  postedBy: string;
  postedDate: string;
  distance: string;
  price?: string;
  description?: string;
  rating: number;
  verified: boolean;
  urgency: 'low' | 'medium' | 'high';
}

const Marketplace = () => {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: '1',
      crop: 'Tomatoes',
      location: 'Kaduna, Nigeria',
      quantity: '500kg',
      contact: '+234 803 XXX XXXX',
      postedBy: 'John Farmer',
      postedDate: '2 days ago',
      distance: '15km away',
      price: '₦800/kg',
      description: 'Fresh organic tomatoes, perfect for processing. Harvested yesterday.',
      rating: 4.8,
      verified: true,
      urgency: 'medium'
    },
    {
      id: '2',
      crop: 'Cassava',
      location: 'Kano, Nigeria',
      quantity: '2 tons',
      contact: '+234 805 XXX XXXX',
      postedBy: 'Amina Cooperative',
      postedDate: '1 week ago',
      distance: '45km away',
      price: '₦200/kg',
      description: 'High-quality cassava roots. Suitable for garri production.',
      rating: 4.5,
      verified: true,
      urgency: 'low'
    },
    {
      id: '3',
      crop: 'Maize',
      location: 'Jos, Nigeria',
      quantity: '1 ton',
      contact: '+234 807 XXX XXXX',
      postedBy: 'Farm Fresh Ltd',
      postedDate: '3 days ago',
      distance: '28km away',
      price: '₦350/kg',
      description: 'Dry yellow maize, ideal for feed production. Must sell urgently.',
      rating: 4.2,
      verified: false,
      urgency: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cropTypes = ['Tomatoes', 'Cassava', 'Maize', 'Yam', 'Rice', 'Beans', 'Plantain'];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = filterCrop === 'all' || listing.crop === filterCrop;
    return matchesSearch && matchesCrop;
  });

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsDialogOpen(false);
    toast({
      title: 'Listing Added',
      description: 'Your crop listing has been posted successfully.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-primary-foreground">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Marketplace</h1>
                <p className="text-primary-foreground/90 text-lg">
                  Find and share surplus crops in your area
                </p>
                <div className="flex gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>{listings.length} Active Listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>Fresh Updates Daily</span>
                  </div>
                </div>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">
                    <Plus className="mr-2 w-5 h-5" />
                    Add Listing
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Create New Listing</DialogTitle>
                    <DialogDescription>
                      Share your surplus crops with the community and connect with potential buyers
                    </DialogDescription>
                  </DialogHeader>
            
            <form onSubmit={handleAddListing} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="crop">Crop Type*</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cropTypes.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity*</Label>
                  <Input id="quantity" placeholder="e.g., 500kg, 2 tons" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input id="price" placeholder="e.g., ₦800/kg" />
                </div>
                
                <div>
                  <Label htmlFor="urgency">Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your crop quality, harvesting date, or special conditions..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location*</Label>
                <Input id="location" placeholder="Auto-filled from profile" defaultValue="Kaduna, Nigeria" required />
              </div>
              
              <div>
                <Label htmlFor="contact">Contact Information*</Label>
                <Input id="contact" placeholder="Phone number or email" required />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
                  <Plus className="mr-2 w-4 h-4" />
                  Post Listing
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search Crops or Location</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search for crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="min-w-[150px]">
              <Label htmlFor="filter">Filter by Crop</Label>
              <Select value={filterCrop} onValueChange={setFilterCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="All crops" />
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
          </div>
        </CardContent>
      </Card>

      {/* Listings */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {listing.crop.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {listing.crop}
                    </CardTitle>
                    {listing.price && (
                      <p className="text-lg font-semibold text-primary">{listing.price}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge variant="outline" className="text-xs">{listing.distance}</Badge>
                  <Badge 
                    variant={listing.urgency === 'high' ? 'destructive' : listing.urgency === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {listing.urgency} priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>
                <div className="flex items-center gap-1">
                  {listing.verified && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">Quantity:</span> {listing.quantity}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{listing.rating}</span>
                </div>
              </div>
              
              {listing.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {listing.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {listing.postedBy.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-medium">{listing.postedBy}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3" />
                    {listing.postedDate}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => toast({
                    title: 'Contact Info',
                    description: `Contact: ${listing.contact}`,
                  })}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({
                    title: 'Coming Soon',
                    description: 'Direct messaging feature will be available soon!',
                  })}
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCrop 
                ? 'Try adjusting your search or filters'
                : 'Be the first to post a listing in your area'
              }
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  Post First Listing
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
};

export default Marketplace;