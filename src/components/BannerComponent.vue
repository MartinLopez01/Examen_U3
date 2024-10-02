<template>
      <div v-if="loading">Cargando...</div>
      <div :style="bannerStyle" v-else>
     <div :style="bannerStyle" v-if="movie">
    <div class="banner" :style="bannerStyle">
      <div class="banner-content">
        <h1>{{ featuredMovie.title }}</h1>
        <p>{{ featuredMovie.overview }}</p>
        <router-link :to="`/movie/${featuredMovie.id}`">Ver más</router-link>
      </div>
    </div>
</div>
</div>
  </template>
  
  <script>
  export default {
    props: ['featuredMovie'],
    data() {
    return {
      loading: true,
    };
  },
    computed: {
      bannerStyle() {
        const backdropPath = this.movie?.backdrop_path || '';
        if (!movie || !movie.backdrop_path) {
        return {}; 
      }
        return {
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${this.featuredMovie.backdrop_path})`
        };
      }
    },
    computed: {
    movie() {
      return this.$store.getters.movie; 
    }
},
watch: {
    movie(newMovie) {
      if (newMovie) {
        this.loading = false;
      }
    },
  },
  mounted() {
  const movieId = this.$route.params.id; 
  console.log('Movie ID:', movieId); 
  if (!movieId) {
      console.error('No movie ID found in the route');
      return; 
    }
    this.$store.dispatch('fetchMovieDetails', movieId); 
  },

  };
  </script>
  
  <style scoped>
  .banner {
    height: 400px;
    background-size: cover;
    background-position: center;
    position: relative;
    color: white;
  }
  .banner-content {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  </style>
  