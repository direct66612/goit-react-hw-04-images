import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/';

const API_KEY = '39884866-d70e4d00a2666ee51db4ac166';

export const fetchImagesBySearch = async (query, page) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  try {
    const { data } = await axios.get('/api/', { params });
    return data;
  } catch (error) {
    alert('Sorry, this images is not found. Please try again.');
  }
};
