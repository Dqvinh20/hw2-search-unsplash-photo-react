const baseUrl = "https://api.unsplash.com";

export async function searchPhoto({ query, page = 1, per_page = 12 }) {
  const urlSearchParams = new URLSearchParams({
    query,
    page,
    per_page,
  });
  const res = await fetch(`${baseUrl}/search/photos?${urlSearchParams}`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
    },
  });
  return res.json();
}
