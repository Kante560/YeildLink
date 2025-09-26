import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Trash2 } from "lucide-react";

const initialLocations = [
  {
    name: "Obudu, Cross River",
    coordinates: "6.6646°N, 9.1665°E",
    status: "Rainy Season",
    description: "",
  },
  {
    name: "Benue Valley",
    coordinates: "7.7319°N, 8.5324°E",
    status: "Average Rainfall",
    description: "",
  },
  {
    name: "Zaria, Kaduna",
    coordinates: "11.0667°N, 7.7167°E",
    status: "Average Rainfall",
    description: "",
  },
  {
    name: "Calabar, Cross River",
    coordinates: "6.6646°N, 9.1665°E",
    status: "Rainy Season",
    description: "",
  },
];

const TrackLocation = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [search, setSearch] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const handleAddLocation = () => {
    if (!newLocation.trim()) return;
    setLocations([
      ...locations,
      {
        name: newLocation,
        coordinates: "0.0000°N, 0.0000°E",
        status: "Unknown",
        description: "",
      },
    ]);
    setNewLocation("");
  };

  const handleRemove = (idx: number) => {
    setLocations(locations.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-2">My Farm Locations</h1>
      <p className="text-muted-foreground mb-6">Track and compare your farm areas for better planting decisions.</p>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">Add Location</h2>
          <p className="text-muted-foreground mb-4">Search and add location to track.</p>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Search for a location (village, town, or coordinates)"
              value={newLocation}
              onChange={e => setNewLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddLocation} className="bg-green-600 text-white">Add Location</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc, idx) => (
          <Card key={idx} className="relative">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-green-700" />
                <span className="font-semibold text-lg">{loc.name}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Coordinates: {loc.coordinates}</div>
              <div className="mb-2"><b>Status:</b> {loc.status}</div>
              {loc.description && <div className="text-sm text-muted-foreground mb-2">{loc.description}</div>}
              <div className="flex gap-2 mt-4">
                <Button className="bg-green-600 text-white flex-1">See what grows here</Button>
                <Button variant="outline" onClick={() => handleRemove(idx)}><Trash2 size={18} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrackLocation;
