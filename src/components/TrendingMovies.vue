<template>
  <div class="trending-movies">
    <h2>Películas en Tendencia</h2>
    <div class="movie-list">
      <div
        class="movie-item"
        v-for="movie in trendingMovies"
        :key="movie.id"
        @click="goToMovieDetail(movie.id)"
      >
        <img
          :src="getImageUrl(movie.backdrop_path)"
          :alt="movie.title"
          class="movie-image"
        />
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['trendingMovies']),
  },
  methods: {
    goToMovieDetail(movieId) {
      this.$router.push({ name: 'MovieDetail', params: { id: movieId } });
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
    },
  },
  mounted() {
    this.$store.dispatch('fetchTrendingMovies');
  },
};
</script>

<style scoped>
.trending-movies {
  padding: 20px;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
}

.movie-item {
  margin: 10px;
  cursor: pointer;
  text-align: center;
}

.movie-image {
  width: 200px;
  height: auto;
  border-radius: 10px;
}
</style>
