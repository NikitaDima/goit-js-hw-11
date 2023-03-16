import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34385068-e7eac96c0a178113f872a4524';

export class MyApi {
  constructor() {
    (this.page = 1), (this.requestQuery = '');
  }

  async fetchPicture() {
    try {
      const {
        data: { hits, totalHits },
      } = await axios.get(`${BASE_URL}`, {
        params: {
          key: KEY,
          q: this.requestQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          per_page: 40,
          page: this.page,
        },
      });

      return { hits, totalHits };
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.requestQuery;
  }

  set query(newQuery) {
    this.requestQuery = newQuery;
  }

  addPage() {
    this.page += 1;
  }

  clearPage() {
    this.page = 1;
  }
}
