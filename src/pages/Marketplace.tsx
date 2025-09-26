


import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Phone, Mail, Star, Trash2 } from "lucide-react"
import { getMarketplaceListings, getMyMarketplaceListings, addMarketplaceListing, deleteMarketplaceListing, updateMarketplaceListing, getAllCrops, type MarketplaceItem, type ApiCrop } from "@/services/cropService"
import { useAuth } from "@/AuthContext/AuthContext"

export default function MarketPage() {
  const [tab, setTab] = useState("market")
  const { user } = useAuth()

  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cropFilter, setCropFilter] = useState<string>("")
  const [locationFilter, setLocationFilter] = useState<string | undefined>(undefined)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editItem, setEditItem] = useState<MarketplaceItem | null>(null)
  const [editCropName, setEditCropName] = useState("")
  const [editLocation, setEditLocation] = useState("")
  const [editQuantity, setEditQuantity] = useState("")
  const [editContact, setEditContact] = useState("")
  // Add-listing form state
  const [newCropName, setNewCropName] = useState<string>("")
  const [newLocation, setNewLocation] = useState<string>("")
  const [newQuantity, setNewQuantity] = useState<string>("")
  const [newPhone, setNewPhone] = useState<string>("")
  const [newEmail, setNewEmail] = useState<string>("")

  // Crop suggestion state
  const [cropSuggestions, setCropSuggestions] = useState<ApiCrop[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    // Fetch all crops once for suggestions
    getAllCrops().then(setCropSuggestions).catch(() => setCropSuggestions([]))
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        let data: MarketplaceItem[] = [];
        if (tab === "my") {
          data = await getMyMarketplaceListings();
          // Client-side filtering for user's listings
          if (cropFilter) {
            data = data.filter(item => item.cropName.toLowerCase().includes(cropFilter.toLowerCase()));
          }
          if (locationFilter) {
            data = data.filter(item => item.location.toLowerCase().includes(locationFilter.toLowerCase()));
          }
        } else {
          data = await getMarketplaceListings({
            cropName: cropFilter ? toTitle(cropFilter) : undefined,
            location: locationFilter
              ? locationFilter
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                  .join(" ")
              : undefined,
          });
        }
        setItems(data)
      } catch (e) {
        setError((e as Error)?.message ?? "Failed to load listings")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tab, cropFilter, locationFilter])

  const toTitle = (val?: string) => (val ? val.charAt(0).toUpperCase() + val.slice(1) : undefined)

  // Filtering is now handled by useEffect, so search button is just a visual trigger
  const handleSearch = () => {
    // No-op: filtering is automatic
  }

  const handleContact = (contact?: string) => {
    if (!contact) {
      window.alert("No contact provided")
      return
    }
    const trimmed = contact.trim()
    const isEmail = /@/.test(trimmed)
    const numeric = trimmed.replace(/[^+\d]/g, "")
    const isPhone = /^\+?\d{6,}$/.test(numeric)
    if (isPhone) {
      window.location.href = `tel:${numeric}`
      return
    }
    if (isEmail) {
      window.location.href = `mailto:${trimmed}`
      return
    }
    window.alert(trimmed)
  }

  return (
  <div className="p-2 sm:p-4 md:p-6 w-full">
      {/* Tabs + Add Button */}
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <Tabs defaultValue="market" onValueChange={setTab}>
          <TabsList className="rounded-full bg-[#239B32] p-1">
            <TabsTrigger value="market" className="rounded-full px-4 text-white py-2 data-[state=active]:bg-white data-[state=active]:text-black">
              Market Listing
            </TabsTrigger>
            <TabsTrigger value="my" className="rounded-full px-4 py-2   data-[state=active]:bg-white text-white data-[state=active]:text-black">
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
            className="rounded-lg p-0 w-full max-w-2xl "
          >
                      <div className="fixed inset-0 bg-white/30 backdrop-blur-lg z-40" />

            <div className="rounded-lg p-0 w-full max-w-2xl z-50" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.6)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.18)' }}>
            <form
              className="bg-white rounded-lg shadow-lg p-6 space-y-6"
              onSubmit={async (e) => {
                e.preventDefault()
                const contact = newPhone.trim() || newEmail.trim()
                if (!newCropName || !newLocation || !newQuantity || !contact) {
                  alert('Please fill all required fields')
                  return
                }
                try {
                  setCreating(true)
                  await addMarketplaceListing({
                    cropName: newCropName,
                    location: newLocation,
                    quantity: newQuantity,
                    contact,
                  })
                  const data = await getMarketplaceListings()
                  setItems(data)
                  ;(document.getElementById('addListingDialog') as HTMLDialogElement | null)?.close()
                  // reset form
                  setNewCropName("")
                  setNewLocation("")
                  setNewQuantity("")
                  setNewPhone("")
                  setNewEmail("")
                } catch (err: any) {
                  alert(err?.message ?? 'Failed to add listing')
                } finally {
                  setCreating(false)
                }
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
                  <Input
                  id="crop"
                  placeholder="Enter crop type"
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  />
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
                  <Input
                  id="location"
                  placeholder="Enter location"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="quantity">
                    Quantity
                  </label>
                  <Input id="quantity" placeholder="e.g., 500kg, 2 tons" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <Input id="phone" placeholder="Enter your phone number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" placeholder="Enter your email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-3 font-medium disabled:opacity-60"
                  disabled={creating}
                >
                  {creating ? 'Posting...' : 'Post Listing'}
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
            </div>
          </dialog>
        </>
      </div>

      {/* Edit Listing Modal */}
      {editOpen && (
        <>
          {/* Glassmorphism Backdrop */}
          <div className="fixed inset-0 bg-white/30 backdrop-blur-lg z-40" />
          <div className="rounded-lg p-0 w-full max-w-2xl z-50" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.6)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.18)' }}>
            <form
              className="bg-white/80 rounded-lg shadow-lg p-6 space-y-6"
              onSubmit={async (e) => {
                e.preventDefault()
                if (!editItem) return
                try {
                  setEditing(true)
                  await updateMarketplaceListing(editItem.id, {
                    cropName: editCropName,
                    location: editLocation,
                    quantity: editQuantity,
                    contact: editContact,
                  })
                  const data = await getMarketplaceListings()
                  setItems(data)
                  setEditOpen(false)
                } catch (err: any) {
                  alert(err?.message ?? 'Failed to update listing')
                } finally {
                  setEditing(false)
                }
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Edit Listing</h3>
                  <p className="text-sm text-gray-500">Share your surplus crops with the community and connect with potential buyers</p>
                </div>
                <button type="button" className="text-gray-500 hover:text-gray-700" onClick={() => setEditOpen(false)}>✕</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="editCrop">Crop type</label>
                  <Input id="editCrop" placeholder="e.g Maize" value={editCropName} onChange={(e) => setEditCropName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="editPrice">Price</label>
                  <Input id="editPrice" placeholder="e.g N800/kg" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="editLocation">Location</label>
                  <Input id="editLocation" placeholder="Kaduna, Nigeria" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="editQuantity">Quantity</label>
                  <Input id="editQuantity" placeholder="e.g 500kg, 2 tons" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="editPhone">Phone Number</label>
                  <Input id="editPhone" placeholder="Enter your phone number" value={editContact} onChange={(e) => setEditContact(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="editEmail">Email</label>
                  <Input id="editEmail" placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="editDescription">Description (optional)</label>
                <textarea id="editDescription" rows={4} className="w-full border rounded px-3 py-2 text-sm bg-gray-50" placeholder="Describe your crop quality, harvesting date, or other special conditions..." />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-3 font-medium disabled:opacity-60" disabled={editing}>
                {editing ? 'Saving...' : 'Edit Listing'}
              </button>
            </form>
          </div>
        </>
      )}

      {/* Filters */}
  <div className="flex flex-col gap-3 md:flex-row md:gap-4 items-stretch md:items-center bg-white shadow-sm rounded-lg p-3 md:p-4 mb-6 overflow-x-auto">
        <div className="relative w-[250px]">
          <Input
            type="text"
            placeholder="Type crop name..."
            value={cropFilter}
            onChange={e => {
              setCropFilter(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            autoComplete="off"
          />
          {showSuggestions && cropFilter && (
            <div className="absolute left-0 right-0 top-full bg-white border rounded shadow z-10 max-h-48 overflow-auto">
              {cropSuggestions
                .filter(crop => crop.name.toLowerCase().includes(cropFilter.toLowerCase()))
                .slice(0, 8)
                .map(crop => (
                  <div
                    key={crop.id}
                    className="px-3 py-2 cursor-pointer hover:bg-muted"
                    onMouseDown={() => {
                      setCropFilter(crop.name)
                      setShowSuggestions(false)
                    }}
                  >
                    {crop.name}
                  </div>
                ))}
              {/* If no matches, show a hint */}
              {cropSuggestions.filter(crop => crop.name.toLowerCase().includes(cropFilter.toLowerCase())).length === 0 && (
                <div className="px-3 py-2 text-muted-foreground">No crop found</div>
              )}
            </div>
          )}
        </div>

        <Select onValueChange={val => setLocationFilter(val === "all" ? undefined : val)} value={locationFilter ?? "all"}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Cross River">Cross River</SelectItem>
            <SelectItem value="Kaduna">Kaduna</SelectItem>
            <SelectItem value="Jos">Jos</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex items-center gap-2" onClick={handleSearch} disabled={loading}>
          <Search size={18} /> {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Listings */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {error && (
          <div className="col-span-full text-red-600 text-sm">{error}</div>
        )}
        {items.length === 0 && !loading && !error && (
          <div className="col-span-full text-gray-500 text-sm">No listings found.</div>
        )}
        {items.map((item) => {
          const isMine = item.userId != null && user?.id != null && String(item.userId) === String(user.id)
          return (
          <Card key={item.id} className="rounded-xl border shadow-sm hover:shadow-md transition min-w-0">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-semibold">
                    {item.cropName?.[0] ?? "?"}
                  </span>
                  {item.cropName}
                </h3>
                
              </div>

              {/* Price badge placeholder (if you add price later) */}
              {/* <p className="text-green-700 bg-green-50 inline-block px-2 py-0.5 rounded text-xs font-medium mb-1">₦200/kg</p> */}

              <div className="space-y-2">
                {item.location && (
                  <p className="text-[13px] px-2 py-1 bg-gray-50 rounded mb-1">
                    <b>Location:</b> {item.location}
                  </p>
                )}
                {item.quantity && (
                  <p className="text-[13px] px-2 py-1 bg-gray-50 rounded mb-1">
                    <b>Quantity:</b> {item.quantity}
                  </p>
                )}
                {/* Contact is intentionally hidden for cleaner UX; use the Contact button below */}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-2 border-t">
                <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</span>
                <span className="text-gray-400">#{item.id}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                {isMine ? (
                  <>
                    <Button className="bg-green-600 hover:bg-green-700 flex-1 rounded-[10px] py-2" onClick={() => {
                      setEditItem(item)
                      setEditCropName(item.cropName || "")
                      setEditLocation(item.location || "")
                      setEditQuantity(item.quantity || "")
                      setEditContact(item.contact || "")
                      setEditOpen(true)
                    }}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-[10px]"
                      onClick={async () => {
                        if (!window.confirm("Are you sure you want to delete this listing?")) return;
                        try {
                          await deleteMarketplaceListing(item.id);
                          const data = await getMarketplaceListings();
                          setItems(data);
                        } catch (err: any) {
                          alert(err?.message ?? "Failed to delete listing");
                        }
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="bg-green-600 hover:bg-green-700 flex-1 flex items-center gap-2 rounded-[10px] py-2" onClick={() => handleContact(item.contact)}>
                      <Phone size={16}/> Contact
                    </Button>
                    <Button variant="outline" className="flex-1 flex items-center gap-2 rounded-[10px]">
                      <Mail size={16}/> 
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </div>
  )
}
