<template>
    <div class="cast-list">
      <h2>Reparto</h2>
      <div class="cast-items">
        <div v-for="actor in cast" :key="actor.id" class="cast-item">
          <img :src="actor.profile_path ? imageUrl + actor.profile_path : defaultImage" alt="Actor" />
          <div class="actor-info">
            <h3>{{ actor.name }}</h3>
            <p>{{ actor.character }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CastList',
    props: {
      serieId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        cast: [],
        imageUrl: 'https://image.tmdb.org/t/p/w500/',
        defaultImage: 'path/to/default/image.png', 
      };
    },
    methods: {
      async fetchCast() {
        const response = await this.$axios.get(`/tv/${this.serieId}/credits`);
        this.cast = response.data.cast;
      },
    },
    mounted() {
      this.fetchCast();
    },
  };
  </script>
  
  <style scoped>
  .cast-list {
    margin: 20px 0;
  }
  .cast-items {
    display: flex;
    flex-wrap: wrap;
  }
  .cast-item {
    width: 120px;
    margin: 10px;
    text-align: center;
  }
  .cast-item img {
    width: 100%;
    border-radius: 50%;
  }
  .actor-info {
    margin-top: 5px;
  }
  </style>
  