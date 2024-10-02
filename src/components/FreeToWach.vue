<template>
    <div class="free-to-watch">
      <h2>Películas Gratis</h2>
      <div class="movie-grid">
        <div v-for="movie in freeMovies" :key="movie.id" class="movie-item">
          <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" />
          <p>{{ movie.title }}</p>
        </div>
      </div>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
        loading: true,
        error: null,
      };
    },
    computed: {
      ...mapState({
        freeMovies: state => state.freeMovies,
      }),
    },
    methods: {
      async fetchFreeMovies() {
        try {
          await this.$store.dispatch('fetchFreeMovies'); 
        } catch (err) {
          this.error = 'Error al cargar películas gratis.';
          console.error(err);
        } finally {
          this.loading = false;
        }
      },
      getImageUrl(path) {
        return `https://image.tmdb.org/t/p/w500${path}`; 
      },
    },
    mounted() {
      this.fetchFreeMovies(); 
    },
  };
  </script>
  
  <style scoped>
  .free-to-watch {
    margin: 20px 0;
  }
  
  h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .movie-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .movie-item {
    width: 150px; 
  }
  
  .movie-item img {
    width: 100%;
    border-radius: 5px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.2em;
  }
  
  .error-message {
    color: red;
    text-align: center;
  }
  </style>
  