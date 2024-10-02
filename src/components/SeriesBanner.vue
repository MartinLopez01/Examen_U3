<template>
    <div class="series-banner" v-if="serie">
      <div class="banner-content">
        <h1>{{ serie.name }}</h1>
        <p class="overview">{{ serie.overview }}</p>
        <div class="rating">Rating: {{ serie.vote_average }}</div>
        <button @click="goToDetails">Ver Detalles</button>
      </div>
      <img :src="backdropUrl" alt="Backdrop" class="backdrop" />
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'SeriesBanner',
    props: {
      serieId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        serie: null,
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
      backdropUrl() {
        return this.serie ? `https://image.tmdb.org/t/p/w500/${this.serie.backdrop_path}` : '';
      },
    },
    methods: {
      async fetchSerie() {
        
        const response = await this.$axios.get(`/tv/${this.serieId}`);
        this.serie = response.data;
      },
      goToDetails() {
        const router = useRouter();
        router.push(`/series/${this.serieId}`);
      },
    },
    mounted() {
      this.fetchSerie();
    },
  };
  </script>
  
  <style scoped>
  .series-banner {
    position: relative;
    color: white;
  }
  .backdrop {
    width: 100%;
    height: auto;
    opacity: 0.5; 
  }
  .banner-content {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 10;
  }
  </style>
  