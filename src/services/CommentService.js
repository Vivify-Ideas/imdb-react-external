import ApiService from './ApiService';
import authService from './AuthService';

const COMMENTS = movieId => `/movies/${movieId}/comments`;
const GET_SUB_COMMENTS = (movieId, commentId) =>
  `/movies/${movieId}/comments/${commentId}/sub-comments`;
const CREATE_SUB_COMMENT = (movieId, commentId) => `/movies/${movieId}/comments/${commentId}`;

class CommentService extends ApiService {
  getComments = params => {
    return this.apiClient.get(COMMENTS(params.movieId), {
      params: { limit: params.limit, offset: params.offset }
    });
  };

  getSubComments = ({ movieId, commentId }) => {
    return this.apiClient.get(GET_SUB_COMMENTS(movieId, commentId));
  };

  createComment = ({ text, movieId }) => {
    return this.apiClient.post(COMMENTS(movieId), {
      text,
      user: authService.getUser().user._id
    });
  };

  createSubComment = ({ movieId, commentId, text }) => {
    return this.apiClient.post(CREATE_SUB_COMMENT(movieId, commentId), {
      text,
      user: authService.getUser().user._id
    });
  };
}

const commentService = new CommentService();
export default commentService;
