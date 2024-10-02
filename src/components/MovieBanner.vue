<template>
    <div class="movie-banner" :style="bannerStyle">
      <div class="banner-content">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-description">{{ movie.overview }}</p>
        <button class="details-button" @click="goToDetails">Ver Detalles</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['movie']),
      bannerStyle() {
        return {
          backgroundImage: `url(https://image.tmdb.org/t/p/original${this.movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      },
    },
    methods: {
      goToDetails() {

        this.$router.push({ name: 'MovieDetail', params: { id: this.movie.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-banner {
    position: relative;
    height: 400px; 
    color: white; 
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .banner-content {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px; 
  }
  
  .movie-title {
    font-size: 2.5em;
    margin: 0;
  }
  
  .movie-description {
    margin: 10px 0;
    font-size: 1.2em;
  }
  
  .details-button {
    background-color: #007bff; 
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s; 
  }
  
  .details-button:hover {
    background-color: #0056b3; 
  }
  </style>
  