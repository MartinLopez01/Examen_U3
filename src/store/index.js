import { createStore } from 'vuex';
import Vuex from 'vuex';
import axios from '@/plugins/axios';



export default createStore({
  state: {
    movie: {},
    artist: {},
    series: {},
    sessionId: null,
    requestToken: null,
    user: null,
    trendingMovies: [],
    popularMovies: [],
    freeMovies: [], 
    seriesOrTv: []
  },
  actions: {
    async fetchMovieDetails({ commit }, movieId) {
      try {
        const response = await axios.get(`/movie/${movieId}`);
        commit('setMovie', response.data);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async fetchCategories({ commit }) {
      const response = await axios.get('/genre/movie/list');
      commit('setCategories', response.data.genres);
    },    
    async fetchArtistDetails({ commit }, artistId) {
      try {
        const response = await axios.get(`/person/${artistId}`);
        commit('setArtist', response.data);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async fetchSeriesDetails({ commit }, seriesId) {
      try {
        const response = await axios.get(`/tv/${seriesId}`);
        commit('setSeries', response.data);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    
    async getRequestToken({ commit }) {
      try {
        const response = await axios.get('/authentication/token/new');
        commit('setRequestToken', response.data.request_token);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async login({ commit, state }, { username, password }) {
      try {
        
        await axios.post(`/authentication/token/validate_with_login`, {
          username,
          password,
          request_token: state.requestToken,
        });

        
        const sessionResponse = await axios.post(`/authentication/session/new`, {
          request_token: state.requestToken,
        });
        commit('setSession', sessionResponse.data.session_id);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async logout({ commit, state }) {
      try {
        
        await axios.delete(`/authentication/session?session_id=${state.sessionId}`);
       
        commit('clearSession');
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async fetchTrendingMovies({ commit }) {
      try {
        const response = await axios.get('/trending/movie/week');
        commit('setTrendingMovies', response.data.results);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async fetchPopularMovies({ commit }) {
      try {
        const response = await axios.get('/movie/popular');
        commit('setPopularMovies', response.data.results);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async fetchSeriesOrTv({ commit }) {
      try {
        const response = await axios.get('/tv/popular');
        commit('setSeriesOrTv', response.data.results);
      } catch (error) {
        console.error('Error ', error);
      }
    },
    async fetchFreeMovies({ commit }) {
      try {
        const response = await axios.get('/movie/free');
        commit('setFreeMovies', response.data.results); 
      } catch (error) {
        console.error('Error al obtener películas gratis:', error);
        throw error;
      }
    }
    
  },
  mutations: {
    setMovie(state, movie) {
      state.movie = movie;
    },
    setArtist(state, artist) {
      state.artist = artist;
    },
    setSeries(state, series) {
      state.series = series;
    },
    setSession(state, sessionId) {
      state.sessionId = sessionId;
    },
    setRequestToken(state, token) {
      state.requestToken = token;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },    
    clearSession(state) {
      state.sessionId = null;
      state.requestToken = null;
      state.user = null;
    },
    setTrendingMovies(state, movies) {
      state.trendingMovies = movies;
    },
    setPopularMovies(state, movies) {
      state.popularMovies = movies;
    },
    setSeriesOrTv(state, series) {
      state.seriesOrTv = series;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    trendingMovies: (state) => state.trendingMovies,
    popularMovies: (state) => state.popularMovies,
    seriesOrTv: (state) => state.seriesOrTv,
    isAuthenticated: (state) => !!state.sessionId 
  }
});
