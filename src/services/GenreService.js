import ApiService from './ApiService';

const ENDPOINTS = {
  GENRES: '/genres'
};

class GenreService extends ApiService {
  getGenres = () => {
    return this.apiClient.get(ENDPOINTS.GENRES);
  };
}

const genreService = new GenreService();
export default genreService;
