<template>
    <div>
      <h1>Series y TV Populares</h1>
      <div class="grid-container">
        <div v-for="series in seriesOrTv" :key="series.id" class="card">
          <img :src="getImageUrl(series.poster_path)" alt="Poster" />
          <h2>{{ series.name }}</h2>
          <p>Rating: {{ series.vote_average }}</p>
          <router-link :to="`/movie/${series.id}`">Ver Detalle</router-link>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'SeriesOrTv',
    computed: {
      ...mapGetters(['seriesOrTv']), 
    },
    methods: {
      getImageUrl(path) {
        return `https://image.tmdb.org/t/p/w500${path}`; 
      },
    },
    mounted() {
      this.$store.dispatch('fetchSeriesOrTv'); 
    },
  };
  </script>
  
  <style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }
  .card img {
    max-width: 100%;
    border-radius: 4px;
  }
  </style>
  