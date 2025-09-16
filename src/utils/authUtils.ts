export function getAuthHeader(): Record<string, string> {
  try {
    const stored = localStorage.getItem("authUser");
    if (!stored) return {};
    const user = JSON.parse(stored);
    if (user?.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
  } catch {}
  return {};
}



