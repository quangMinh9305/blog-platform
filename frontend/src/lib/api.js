const BaseURL = "http://localhost:5001";

export async function apiFetch(path, option = {}) {
  const res = await fetch(`${BaseURL}${path}`, {
    ...option,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...option.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
