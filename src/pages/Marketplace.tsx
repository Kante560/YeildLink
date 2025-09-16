// import React, { useState } from 'react';
// import {
//   Card, CardContent
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue
// } from '@/components/ui/select';
// import {
//   Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
// } from '@/components/ui/dialog';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Plus, Phone, Mail, Search, Clock, Star
// } from 'lucide-react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { toast } from '@/hooks/use-toast';

// interface Listing {
//   id: string;
//   crop: string;
//   location: string;
//   quantity: string;
//   contact: string;
//   postedBy: string;
//   postedDate: string;
//   distance: string;
//   price?: string;
//   description?: string;
//   rating: number;
//   verified: boolean;
//   urgency: 'low' | 'medium' | 'high';
// }

// const Marketplace = () => {
//   const [tab, setTab] = useState('market');
//   const [listings, setListings] = useState<Listing[]>([
//     {
//       id: '1',
//       crop: 'Tomatoes',
//       location: 'Kaduna, Nigeria',
//       quantity: '500kg',
//       contact: '+234 803 XXX XXXX',
//       postedBy: 'John Farmer',
//       postedDate: '2 days ago',
//       distance: '15km away',
//       price: '₦800/kg',
//       description: 'Fresh organic tomatoes, perfect for processing. Harvested yesterday.',
//       rating: 4.8,
//       verified: true,
//       urgency: 'medium'
//     },
//     {
//       id: '2',
//       crop: 'Cassava',
//       location: 'Kano, Nigeria',
//       quantity: '2 tons',
//       contact: '+234 805 XXX XXXX',
//       postedBy: 'Amina Cooperative',
//       postedDate: '1 week ago',
//       distance: '45km away',
//       price: '₦200/kg',
//       description: 'High-quality cassava roots. Suitable for garri production.',
//       rating: 4.5,
//       verified: true,
//       urgency: 'low'
//     },
//     {
//       id: '3',
//       crop: 'Maize',
//       location: 'Jos, Nigeria',
//       quantity: '1 ton',
//       contact: '+234 807 XXX XXXX',
//       postedBy: 'Farm Fresh Ltd',
//       postedDate: '3 days ago',
//       distance: '28km away',
//       price: '₦350/kg',
//       description: 'Dry yellow maize, ideal for feed production. Must sell urgently.',
//       rating: 4.2,
//       verified: false,
//       urgency: 'high'
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCrop, setFilterCrop] = useState('all');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const cropTypes = ['Tomatoes', 'Cassava', 'Maize', 'Yam', 'Rice', 'Beans', 'Plantain'];

//   const filteredListings = listings.filter(listing => {
//     const matchesSearch =
//       listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       listing.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCrop = filterCrop === 'all' || listing.crop === filterCrop;
//     return matchesSearch && matchesCrop;
//   });

//   const myListings = listings.filter((_, idx) => idx === 1); // placeholder: replace with real user logic

//   const handleAddListing = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsDialogOpen(false);
//     toast({
//       title: 'Listing Added',
//       description: 'Your crop listing has been posted successfully.',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-6 space-y-10">

//         {/* Top Tabs Section */}
//         <Tabs defaultValue="market" value={tab} onValueChange={setTab}>
//           <TabsList className="rounded-full bg-gray-100 p-1 w-fit mx-auto">
//             <TabsTrigger
//               value="market"
//               className="rounded-full px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
//             >
//               Market Listing
//             </TabsTrigger>
//             <TabsTrigger
//               value="my"
//               className="rounded-full px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
//             >
//               My Listing
//             </TabsTrigger>
//           </TabsList>

//           {/* Market Listing Tab */}
//           <TabsContent value="market" className="mt-10 space-y-8">
            
//             {/* Search & Filter */}
//             <Card>
//               <CardContent className="p-6 flex flex-col md:flex-row gap-6">
//                 <div className="flex-1">
//                   <Label>Search</Label>
//                   <div className="relative mt-1">
//                     <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <Input
//                       placeholder="Search crops or location..."
//                       value={searchTerm}
//                       onChange={e => setSearchTerm(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>
//                 <div className="min-w-[180px]">
//                   <Label>Filter by Crop</Label>
//                   <Select value={filterCrop} onValueChange={setFilterCrop}>
//                     <SelectTrigger className="mt-1">
//                       <SelectValue placeholder="All crops" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All crops</SelectItem>
//                       {cropTypes.map(crop => (
//                         <SelectItem key={crop} value={crop}>{crop}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex items-end">
//                   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                     <DialogTrigger asChild>
//                       <Button className="bg-green-600 hover:bg-green-700">
//                         <Plus className="mr-2 w-4 h-4" /> Add Listing
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-2xl">
//                       <DialogHeader>
//                         <DialogTitle className="text-2xl">Create New Listing</DialogTitle>
//                         <DialogDescription>
//                           Share your surplus crops with the community
//                         </DialogDescription>
//                       </DialogHeader>
                      
//                       {/* Preserve your existing modal form */}
//                       <form onSubmit={handleAddListing} className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label htmlFor="crop">Crop Type*</Label>
//                             <Select required>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select crop type..." />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {cropTypes.map(crop => (
//                                   <SelectItem key={crop} value={crop}>{crop}</SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div>
//                             <Label htmlFor="quantity">Quantity*</Label>
//                             <Input id="quantity" placeholder="e.g., 500kg, 2 tons" required />
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label htmlFor="price">Price (optional)</Label>
//                             <Input id="price" placeholder="e.g., ₦800/kg" />
//                           </div>
//                           <div>
//                             <Label htmlFor="urgency">Priority</Label>
//                             <Select defaultValue="medium">
//                               <SelectTrigger>
//                                 <SelectValue />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="low">Low Priority</SelectItem>
//                                 <SelectItem value="medium">Medium Priority</SelectItem>
//                                 <SelectItem value="high">High Priority</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>
//                         <div>
//                           <Label htmlFor="description">Description (optional)</Label>
//                           <Textarea id="description" rows={3} />
//                         </div>
//                         <div>
//                           <Label htmlFor="location">Location*</Label>
//                           <Input id="location" defaultValue="Kaduna, Nigeria" required />
//                         </div>
//                         <div>
//                           <Label htmlFor="contact">Contact*</Label>
//                           <Input id="contact" placeholder="Phone number or email" required />
//                         </div>
//                         <div className="flex gap-3 pt-4">
//                           <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
//                             <Plus className="mr-2 w-4 h-4" />
//                             Post Listing
//                           </Button>
//                           <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
//                             Cancel
//                           </Button>
//                         </div>
//                       </form>
//                     </DialogContent>
//                   </Dialog>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Listings */}
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredListings.map((listing, idx) => (
//                 <Card key={listing.id} className="rounded-xl shadow-sm hover:shadow-md transition">
//                   <CardContent className="p-5 flex flex-col h-full">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{listing.crop}</h3>
//                         <p className="text-sm text-gray-600">{listing.location}</p>
//                       </div>
//                       {listing.price && (
//                         <span className="text-green-600 font-semibold">{listing.price}</span>
//                       )}
//                     </div>
//                     <p className="text-gray-700 text-sm flex-1 mb-3">
//                       {listing.description}
//                     </p>
//                     <div className="flex items-center justify-between text-sm mb-3">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                         <span>{listing.rating}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Avatar className="w-7 h-7">
//                           <AvatarFallback>
//                             {listing.postedBy.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         <span>{listing.postedBy}</span>
//                       </div>
//                     </div>
//                     <div className="flex gap-2 mt-auto">
//                       <Button
//                         size="sm"
//                         className="flex-1 bg-green-600 hover:bg-green-700"
//                         onClick={() =>
//                           toast({ title: 'Contact Info', description: listing.contact })
//                         }
//                       >
//                         <Phone className="w-4 h-4 mr-2" /> Contact
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() =>
//                           toast({
//                             title: 'Coming Soon',
//                             description: 'Messaging will be available soon!',
//                           })
//                         }
//                       >
//                         <Mail className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* My Listing Tab */}
//           <TabsContent value="my" className="mt-10 space-y-8">
//             {myListings.length > 0 ? (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {myListings.map(listing => (
//                   <Card key={listing.id} className="rounded-xl shadow-sm">
//                     <CardContent className="p-5 flex flex-col h-full">
//                       <h3 className="text-lg font-semibold">{listing.crop}</h3>
//                       <p className="text-sm text-gray-600">{listing.location}</p>
//                       <p className="text-sm mt-2 flex-1">{listing.description}</p>
//                       <div className="flex gap-2 mt-auto">
//                         <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
//                           Edit
//                         </Button>
//                         <Button size="sm" variant="outline" className="text-red-600 border-red-600">
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <Card>
//                 <CardContent className="p-12 text-center text-gray-500">
//                   <h3 className="text-lg font-semibold">You have no listings yet</h3>
//                   <p className="mb-4">Click "Add Listing" in Market tab to get started</p>
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Marketplace;


import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Phone, Mail, Star } from "lucide-react"

export default function MarketPage() {
  const [tab, setTab] = useState("market")

  const listings = [
    {
      crop: "Cassava",
      price: "₦200/kg",
      rating: 4.5,
      location: "Kano, Nigeria",
      quantity: "2 tons",
      desc: "High-quality cassava roots. Suitable for garri production.",
      user: "Fortune Okeke",
      time: "1 week ago",
      type: "my"
    },
    {
      crop: "Tomatoes",
      price: "₦800/kg",
      rating: 4.8,
      location: "Kaduna, Nigeria",
      quantity: "500kg",
      desc: "Fresh organic tomatoes, perfect for processing. Harvested yesterday.",
      user: "John (Farmer)",
      time: "2 days ago",
      type: "market"
    },
    {
      crop: "Maize",
      price: "₦350/kg",
      rating: 4.2,
      location: "Jos, Nigeria",
      quantity: "1 ton",
      desc: "Dry yellow maize, ideal for feed production. Must sell urgently.",
      user: "Farm Fresh Ltd",
      time: "3 days ago",
      type: "market"
    }
  ]

  return (
    <div className="p-6 w-full">
      {/* Tabs + Add Button */}
      <div className="flex items-center justify-between mb-6">
        <Tabs defaultValue="market" onValueChange={setTab}>
          <TabsList className="rounded-full bg-gray-100 p-1">
            <TabsTrigger value="market" className="rounded-full px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Market Listing
            </TabsTrigger>
            <TabsTrigger value="my" className="rounded-full px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
              My Listing
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <>
          <Button
            className="bg-green-600 hover:bg-green-700 rounded-full px-5"
            onClick={() =>
              (document.getElementById('addListingDialog') as HTMLDialogElement | null)?.showModal()
            }
          >
            + Add Listing
          </Button>

          <dialog
            id="addListingDialog"
            className="rounded-lg p-0 w-full max-w-2xl"
          >
            <form
              className="bg-white rounded-lg shadow-lg p-6 space-y-6"
              onSubmit={(e) => {
                e.preventDefault()
                // replace with real submit logic
                alert('Listing added')
                ;(document.getElementById('addListingDialog') as HTMLDialogElement | null)
                  ?.close()
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Create New Listing</h3>
                  <p className="text-sm text-gray-500">Share your surplus crops with the community</p>
                </div>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    (document.getElementById('addListingDialog') as HTMLDialogElement | null)
                      ?.close()
                  }
                >
                  ✕
                </button>
              </div>

              {/* Two-column rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="crop">
                    Crop type
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                      <SelectItem value="Cassava">Cassava</SelectItem>
                      <SelectItem value="Maize">Maize</SelectItem>
                      <SelectItem value="Yam">Yam</SelectItem>
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Beans">Beans</SelectItem>
                      <SelectItem value="Plantain">Plantain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="price">
                    Price
                  </label>
                  <Input id="price" placeholder="e.g N800/kg" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="location">
                    Location
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Kaduna, Nigeria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kaduna">Kaduna, Nigeria</SelectItem>
                      <SelectItem value="kano">Kano, Nigeria</SelectItem>
                      <SelectItem value="jos">Jos, Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="quantity">
                    Quantity
                  </label>
                  <Input id="quantity" placeholder="e.g., 500kg, 2 tons" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="description">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                  placeholder="Describe your crop quality, harvesting date, or other special conditions..."
                />
              </div>

              {/* Footer: big green post button and cancel */}
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-3 font-medium"
                >
                  Post Listing
                </button>

                <button
                  type="button"
                  className="w-full border border-gray-300 rounded-md py-2 text-sm"
                  onClick={() =>
                    (document.getElementById('addListingDialog') as HTMLDialogElement | null)
                      ?.close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </dialog>
        </>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white shadow-sm rounded-lg p-4 mb-6">
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select crop to search" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cassava">Cassava</SelectItem>
            <SelectItem value="tomatoes">Tomatoes</SelectItem>
            <SelectItem value="maize">Maize</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crossriver">Cross River</SelectItem>
            <SelectItem value="kaduna">Kaduna</SelectItem>
            <SelectItem value="jos">Jos</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex items-center gap-2">
          <Search size={18} /> Search
        </Button>
      </div>

      {/* Listings */}
      <div className="grid md:grid-cols-3 gap-6">
        {listings
          .filter((item) => tab === "market" ? item.type !== "my" : item.type === "my")
          .map((item, idx) => (
          <Card key={idx} className="rounded-2xl shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                    {item.crop[0]}
                  </span>
                  {item.crop}
                </h3>
                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                  <Star size={16} className="fill-yellow-500" /> {item.rating}
                </span>
              </div>

              <p className="text-green-600 font-semibold mb-2">{item.price}</p>
              <p className="text-sm"><b>Location:</b> {item.location}</p>
              <p className="text-sm"><b>Quantity:</b> {item.quantity}</p>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>

              {/* User Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <span>{item.user}</span>
                <span>{item.time}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                {item.type === "my" ? (
                  <>
                    <Button className="bg-green-600 hover:bg-green-700 flex-1">Edit</Button>
                    <Button variant="outline" className="flex-1">🗑</Button>
                  </>
                ) : (
                  <>
                    <Button className="bg-green-600 hover:bg-green-700 flex-1 flex items-center gap-2">
                      <Phone size={16}/> Contact
                    </Button>
                    <Button variant="outline" className="flex-1 flex items-center gap-2">
                      <Mail size={16}/> 
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
