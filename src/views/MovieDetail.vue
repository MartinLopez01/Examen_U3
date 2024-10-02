<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <Rating :initialRating="movie.vote_average" @rating-selected="handleRating" />
    <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" />
    <p>{{ movie.overview }}</p>
    <p><strong>Fecha de lanzamiento:</strong> {{ movie.release_date }}</p>
    <p><strong>Puntuación:</strong> {{ movie.vote_average }}</p>

    <!-- Sección de géneros -->
    <p><strong>Géneros:</strong>
      <span v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</span>
    </p>

    <!-- Sección de tráiler -->
    <div v-if="trailerUrl">
      <h2>Tráiler</h2>
      <iframe :src="trailerUrl" width="560" height="315" frameborder="0" allowfullscreen></iframe>
    </div>

    <!-- Sección de reparto -->
    <Cast :cast="cast" />

    <!-- Botón de favorito -->
    <button @click="toggleFavorite">
      {{ isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos' }}
    </button>

    <!-- Sección de recomendaciones -->
    <RecommendedMovies :recommended="recommendedMovies" />
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
import Cast from '@/components/Cast.vue';
import RecommendedMovies from '@/components/RecommendedMovies.vue';
import Rating from '@/components/Rating.vue';

export default {
  data() {
    return {
      movie: null,
      trailerUrl: '',
      cast: [],
      recommendedMovies: [],
      isFavorite: false
    };
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    }
  },  components: {
    Rating,
  },
  props: {
    movie: Object,
  },
  methods: {
    handleRating(selectedRating) {
      
      console.log('Calificación seleccionada:', selectedRating);
    },
    async fetchMovieDetails() {
      try {
        const response = await axios.get(`/movie/${this.movieId}`);
        this.movie = response.data;
      } catch (error) {
        console.error("Error ", error);
      }
    },
    async submitRating({ commit }, { movieId, rating }) {
  try {
    await axios.post(`/movie/${movieId}/rating`, { value: rating });
   
  } catch (error) {
    console.error('Error al enviar la calificación:', error);
  }
},
    async fetchMovieCast() {
      try {
        const response = await axios.get(`/movie/${this.movieId}/credits`);
        this.cast = response.data.cast.slice(0, 10);
      } catch (error) {
        console.error("Error ", error);
      }
    },
    async fetchMovieTrailer() {
      try {
        const response = await axios.get(`/movie/${this.movieId}/videos`);
        const videos = response.data.results;
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    },
    async fetchRecommendedMovies() {
      try {
        const response = await axios.get(`/movie/${this.movieId}/recommendations`);
        this.recommendedMovies = response.data.results;
      } catch (error) {
        console.error("Error ", error);
      }
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
   
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    }
  },
  created() {
    this.fetchMovieDetails();
    this.fetchMovieCast();
    this.fetchMovieTrailer();
    this.fetchRecommendedMovies();
  }
};
</script>
