import { getAuthHeader } from "@/utils/authUtils";

const BASE_URL = "https://yieldlink-api-six.vercel.app/api";

export interface ApiCrop {
  id: number | string;
  name: string;
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
  let res = await fetch(`${BASE_URL}/crop-tracker/${userId}/${trackerId}`, {
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


