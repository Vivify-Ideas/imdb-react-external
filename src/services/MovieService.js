import ApiService from './ApiService';
import authService from './AuthService';

const ENDPOINTS = {
  MOVIES: '/movies',
  RELATED: movieId => `/movies/${movieId}/related`,
  TOP_RATED: '/movies/top-rated',
  WATCH: movieId => `/movies/${movieId}/watch`
};

const REACTION_TYPES = {
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE'
};

class MovieService extends ApiService {
  getMovies = params => {
    return this.apiClient.get(ENDPOINTS.MOVIES, { params });
  };

  getRelatedMovies = ({ movieId, genres }) => {
    const genresRequestParam = genres.map(genre => genre._id);
    return this.apiClient.post(ENDPOINTS.RELATED(movieId), { genres: genresRequestParam });
  };

  getTopRated = () => {
    return this.apiClient.get(ENDPOINTS.TOP_RATED);
  };

  getMovie = getMovieAction => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}/${getMovieAction.id}`);
  };

  likeMovie = ({ movieId }) => {
    return this.apiClient.put(`${ENDPOINTS.MOVIES}/${movieId}/react`, {
      userId: authService.getUser().user._id,
      reactionType: REACTION_TYPES.LIKE
    });
  };

  dislikeMovie = ({ movieId }) => {
    return this.apiClient.put(`${ENDPOINTS.MOVIES}/${movieId}/react`, {
      userId: authService.getUser().user._id,
      reactionType: REACTION_TYPES.DISLIKE
    });
  };

  watchMovie = ({ movieId }) => {
    return this.apiClient.post(ENDPOINTS.WATCH(movieId));
  };

  unWatchMovie = ({ movieId }) => {
    return this.apiClient.delete(ENDPOINTS.WATCH(movieId));
  };

  findMovies = params => {
    return this.apiClient.get(ENDPOINTS.MOVIES, { params });
  };

  createMovie = params => {
    return this.apiClient.post(ENDPOINTS.MOVIES, { ...params });
  };
}

const movieService = new MovieService();
export default movieService;
