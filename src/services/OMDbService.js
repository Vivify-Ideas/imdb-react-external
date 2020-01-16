import config from '../config';

const REQUEST_INFO = {
  OMDB_BASE_URI: config.OMDb_API_URL,
  API_KEY: config.OMDb_API_KEY
};

class OMDbService {
  findByTitle = async ({ query }) => {
    const res = await fetch(
      `${REQUEST_INFO.OMDB_BASE_URI}/?t=${query}&apikey=${REQUEST_INFO.API_KEY}`
    );
    return res.json();
  };
}

const omdbService = new OMDbService();
export default omdbService;
