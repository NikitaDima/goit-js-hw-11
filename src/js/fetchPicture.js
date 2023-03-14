import axios from 'axios';
export default fetchPicture;

const BASE_URL = `https://pixabay.com/api/?key=`;
const KEY = `34385068-e7eac96c0a178113f872a4524`;

async function fetchPicture(name) {
  try {
    const response = await axios.get(`${BASE_URL}${KEY}`, {
      params: {
        q: 'name',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: limit,
        page: page,
      },
    });
    const { hits, totalHits } = response.data;
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
