<template>
    <div>
      <h2>Recomendaciones</h2>
      <div class="movie-grid">
        <div v-for="movie in recommended" :key="movie.id" class="movie-item">
          <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" />
          <p>{{ movie.title }}</p>
          <router-link :to="`/movie/${movie.id}`">Ver más</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['recommended'],
    methods: {
      getImageUrl(path) {
        return `https://image.tmdb.org/t/p/w500${path}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .movie-grid {
    display: flex;
    flex-wrap: wrap;
  }
  .movie-item {
    width: 150px;
    margin: 10px;
  }
  </style>
  