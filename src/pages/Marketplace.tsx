import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Phone, Mail, Search } from 'lucide-react';
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
      distance: '15km away'
    },
    {
      id: '2',
      crop: 'Cassava',
      location: 'Kano, Nigeria',
      quantity: '2 tons',
      contact: '+234 805 XXX XXXX',
      postedBy: 'Amina Cooperative',
      postedDate: '1 week ago',
      distance: '45km away'
    },
    {
      id: '3',
      crop: 'Maize',
      location: 'Jos, Nigeria',
      quantity: '1 ton',
      contact: '+234 807 XXX XXXX',
      postedBy: 'Farm Fresh Ltd',
      postedDate: '3 days ago',
      distance: '28km away'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cropTypes = ['Tomatoes', 'Cassava', 'Maize', 'Yam', 'Rice', 'Beans', 'Plantain'];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = !filterCrop || listing.crop === filterCrop;
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Find and share surplus crops in your area</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="mr-2" />
              Add Listing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Listing</DialogTitle>
              <DialogDescription>
                Share your surplus crops with the community
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddListing} className="space-y-4">
              <div>
                <Label htmlFor="crop">Crop Type</Label>
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
                <Label htmlFor="quantity">Quantity (optional)</Label>
                <Input id="quantity" placeholder="e.g., 500kg, 2 tons" />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Auto-filled from profile" defaultValue="Kaduna, Nigeria" required />
              </div>
              
              <div>
                <Label htmlFor="contact">Contact Information</Label>
                <Input id="contact" placeholder="Phone number or email" required />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
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
                  <SelectItem value="">All crops</SelectItem>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{listing.crop}</CardTitle>
                <Badge variant="outline">{listing.distance}</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {listing.location}
                </div>
                
                {listing.quantity && (
                  <div className="text-sm">
                    <span className="font-medium">Quantity:</span> {listing.quantity}
                  </div>
                )}
                
                <div className="text-sm">
                  <span className="font-medium">Posted by:</span> {listing.postedBy}
                  <br />
                  <span className="text-muted-foreground">{listing.postedDate}</span>
                </div>
                
                <div className="pt-2 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => toast({
                      title: 'Contact Info',
                      description: `Contact: ${listing.contact}`,
                    })}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
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
  );
};

export default Marketplace;