import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  params: {
    client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  },
});

const PER_PAGE = 12;

export async function fetchImages(query, page = 1) {
  const { data } = await api.get('/search/photos', {
    params: {
      query,
      page,
      per_page: PER_PAGE,
      orientation: 'landscape',
    },
  });

  return {
    results: data.results || [],
    totalPages: data.total_pages ?? 0,
  };
}
