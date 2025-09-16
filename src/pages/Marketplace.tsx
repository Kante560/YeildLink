


import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Phone, Mail, Star, Trash2 } from "lucide-react"
import { getMarketplaceListings, getMyMarketplaceListings, addMarketplaceListing, deleteMarketplaceListing, updateMarketplaceListing, type MarketplaceItem } from "@/services/cropService"
import { useAuth } from "@/AuthContext/AuthContext"

export default function MarketPage() {
  const [tab, setTab] = useState("market")
  const { user } = useAuth()

  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cropFilter, setCropFilter] = useState<string | undefined>(undefined)
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

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        let data: MarketplaceItem[] = [];
        if (tab === "my") {
          data = await getMyMarketplaceListings();
        } else {
          data = await getMarketplaceListings();
        }
        setItems(data)
      } catch (e: any) {
        setError(e?.message ?? "Failed to load listings")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tab])

  const toTitle = (val?: string) => (val ? val.charAt(0).toUpperCase() + val.slice(1) : undefined)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMarketplaceListings({
        cropName: toTitle(cropFilter),
        location: locationFilter
          ? locationFilter
              .split(" ")
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(" ")
          : undefined,
      })
      setItems(data)
    } catch (e: any) {
      setError(e?.message ?? "Search failed")
    } finally {
      setLoading(false)
    }
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
          </dialog>
        </>
      </div>

      {/* Edit Listing Modal */}
      {editOpen && (
        <div className="rounded-lg p-0 w-full max-w-2xl z-50 backdrop-blur-sm " onClick={() => setEditOpen(false)} style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <form
            className="bg-white rounded-lg shadow-lg p-6 space-y-6"
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
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white shadow-sm rounded-lg p-4 mb-6">
        <Select onValueChange={setCropFilter} value={cropFilter}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select crop to search" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cassava">Cassava</SelectItem>
            <SelectItem value="Tomatoes">Tomatoes</SelectItem>
            <SelectItem value="Maize">Maize</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setLocationFilter} value={locationFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
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
      <div className="grid md:grid-cols-3 gap-4">
        {error && (
          <div className="col-span-full text-red-600 text-sm">{error}</div>
        )}
        {items.length === 0 && !loading && !error && (
          <div className="col-span-full text-gray-500 text-sm">No listings found.</div>
        )}
        {items.map((item) => {
          const isMine = item.userId != null && user?.id != null && String(item.userId) === String(user.id)
          return (
          <Card key={item.id} className="rounded-xl border shadow-sm hover:shadow-md transition">
            <CardContent className="p-4">
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
                    <Button className="bg-green-600 hover:bg-green-700 flex-1 rounded-full py-2" onClick={() => {
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
                      className="flex-1 rounded-full"
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
                    <Button className="bg-green-600 hover:bg-green-700 flex-1 flex items-center gap-2 rounded-full py-2" onClick={() => handleContact(item.contact)}>
                      <Phone size={16}/> Contact
                    </Button>
                    <Button variant="outline" className="flex-1 flex items-center gap-2 rounded-full">
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
