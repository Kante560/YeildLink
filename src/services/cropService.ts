import { getAuthHeader } from "@/utils/authUtils";
export const BASE_URL = "https://yieldlink-api-six.vercel.app/api";

export async function getMyMarketplaceListings(): Promise<MarketplaceItem[]> {
  const res = await fetch(`${BASE_URL}/marketplace/my`, {
    method: "GET",
    headers: {
      ...getAuthHeader(),
    },
    cache: 'no-store' as RequestCache,
  });
  if (!res.ok) {
    let message = `Failed to get my marketplace listings (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
  const raw = await res.json();
  const list: MarketplaceApiItem[] = Array.isArray(raw?.data)
    ? raw.data
    : Array.isArray(raw?.items)
    ? raw.items
    : Array.isArray(raw)
    ? raw
    : [];
  return list.map((item) => ({
    id: String(item.id),
    userId: item.user_id != null ? String(item.user_id) : undefined,
    cropName: String(item.crop_name ?? ""),
    location: String(item.location ?? ""),
    quantity: item.quantity != null ? String(item.quantity) : undefined,
    contact: item.contact,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}
export async function deleteMarketplaceListing(id: string | number): Promise<void> {
  const res = await fetch(`${BASE_URL}/marketplace/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    let message = `Failed to delete listing (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }

export interface ApiCrop {
  id: number | string;
  name: string;
}

export interface UpdateMarketplaceListingPayload {
  cropName: string;
  location: string;
  quantity: string;
  contact: string;
}

export async function updateMarketplaceListing(id: string | number, payload: UpdateMarketplaceListingPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/marketplace/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `Failed to update listing (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
}

export async function getAllCrops(): Promise<ApiCrop[]> {
  const res = await fetch(`${BASE_URL}/crops`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    let message = `Failed to get crops (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }

  const raw = await res.json();
  const list = Array.isArray(raw?.crops) ? raw.crops : raw;
  // Normalize field names so UI can depend on id + name
  return (list as any[]).map((c) => ({
    id: c.id ?? c.cropId ?? c._id ?? c.value,
    name: c.common_name ?? c.name ?? c.cropName ?? c.title ?? c.label ?? String(c.id ?? c.cropId ?? c._id ?? ''),
  }));
}

export interface AddCropPayload {
  cropId: number | string;
  userId: number | string;
}

export async function addCropToTracker(payload: AddCropPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/crop-tracker/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `Failed to add crop (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
}

export interface TrackedCropApiItem {
  id?: number | string; // tracker id
  trackerId?: number | string;
  cropId?: number | string;
  crop?: { id?: number | string; common_name?: string; name?: string };
  common_name?: string;
  name?: string;
}

export type TrackedCrop = {
  trackerId: string;
  cropId: string;
  name: string;
};

export async function getTrackedCrops(userId: number | string): Promise<TrackedCrop[]> {
  const res = await fetch(`${BASE_URL}/crop-tracker/${userId}?t=${Date.now()}` , {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    cache: 'no-store' as RequestCache,
  });
  if (!res.ok) {
    let message = `Failed to get tracked crops (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
  const raw = await res.json();
  const list: TrackedCropApiItem[] = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw?.items) ? raw.items : Array.isArray(raw) ? raw : [];
  return list.map((item: any) => ({
    trackerId: String(item.trackerId ?? item.id ?? item.tracker_id ?? ""),
    cropId: String(item.cropId ?? item.crop?.id ?? item.crop_id ?? ""),
    name: String(item.common_name ?? item.name ?? item.crop?.common_name ?? item.crop?.name ?? ""),
  }));
}

export async function deleteTrackedCrop(userId: number | string, trackerId: number | string): Promise<void> {
  // Primary pattern per docs/screenshots: /crop-tracker/:userId/:trackerId
  let res = await fetch(`${BASE_URL}/crop-tracker/${trackerId}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    // Fallback pattern: /crop-tracker/:trackerId
    if (res.status === 404 || res.status === 400) {
      res = await fetch(`${BASE_URL}/crop-tracker/${trackerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });
    }
  }
  if (!res.ok) {
    let message = `Failed to remove tracked crop (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
}



// Marketplace
export interface MarketplaceApiItem {
  id: number | string;
  user_id?: number | string;
  crop_name?: string;
  location?: string;
  quantity?: string | number;
  contact?: string;
  created_at?: string;
  updated_at?: string;
}

export type MarketplaceItem = {
  id: string;
  userId?: string;
  cropName: string;
  location: string;
  quantity?: string;
  contact?: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function getMarketplaceListings(params?: { cropName?: string; location?: string }): Promise<MarketplaceItem[]> {
  const query = new URLSearchParams();
  if (params?.cropName) query.set("cropName", params.cropName);
  if (params?.location) query.set("location", params.location);

  const url = `${BASE_URL}/marketplace${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    cache: 'no-store' as RequestCache,
  });
  

  if (!res.ok) {
    let message = `Failed to get marketplace listings (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }

  const raw = await res.json();
  const list: MarketplaceApiItem[] = Array.isArray(raw?.data)
    ? raw.data
    : Array.isArray(raw?.items)
    ? raw.items
    : Array.isArray(raw)
    ? raw
    : [];

  return list.map((item) => ({
    id: String(item.id),
    userId: item.user_id != null ? String(item.user_id) : undefined,
    cropName: String(item.crop_name ?? ""),
    location: String(item.location ?? ""),
    quantity: item.quantity != null ? String(item.quantity) : undefined,
    contact: item.contact,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}

export interface AddMarketplaceListingPayload {
  cropName: string;
  location: string;
  quantity: string;
  contact: string;
}

export async function addMarketplaceListing(payload: AddMarketplaceListingPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/marketplace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `Failed to add listing (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
}