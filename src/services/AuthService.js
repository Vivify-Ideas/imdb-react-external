import ApiService from './ApiService';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  GOOGLE_LOGIN: '/auth/google-login',
  REGISTER: '/auth/register',
  LOGOUT: '/logout',
  ME: '/auth/me',
  WATCH_LIST: '/user/watch-list'
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      this.setAuthorizationHeader();

      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = () => {
    const token = this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token}`
      });
    }
  };

  createSession = user => {
    localStorage.setItem('user', JSON.stringify(user));
    this.setAuthorizationHeader();
  };

  destroySession = () => {
    localStorage.clear();
    this.api.removeHeaders(['Authorization']);
  };

  login = async loginData => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);
    this.createSession(data);
    return data;
  };

  googleLogin = async googleLoginData => {
    const { data } = await this.apiClient.post(ENDPOINTS.GOOGLE_LOGIN, googleLoginData);
    this.createSession(data);
    return data;
  };

  signup = async signupData => {
    const { data } = await this.apiClient.post(ENDPOINTS.REGISTER, signupData);
    return data;
  };

  logout = async () => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    this.destroySession();
    return { ok: true, data };
  };

  getToken = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : undefined;
  };

  isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token;
  };

  getUser = () => {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  };

  getMe = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.ME);
    return data;
  };

  getWatchList = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.WATCH_LIST);
    return data;
  };

  updateUserInStorage = property => {
    const user = localStorage.getItem('user');
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    localStorage.setItem('user', JSON.stringify(jsonUser));
  };
}

const authService = new AuthService();
export default authService;
