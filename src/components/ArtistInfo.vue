<template>
    <div class="artist-info" v-if="artist">
      <div class="artist-header">
        <img :src="getImageUrl(artist.profile_path)" alt="Foto del Artista" class="artist-photo" />
        <div class="artist-details">
          <h2>{{ artist.name }}</h2>
          <p><strong>Fecha de Nacimiento:</strong> {{ formatDate(artist.birthday) }}</p>
          <p v-if="artist.deathday"><strong>Fallecimiento:</strong> {{ formatDate(artist.deathday) }}</p>
          <p><strong>Lugar de Nacimiento:</strong> {{ artist.place_of_birth }}</p>
        </div>
      </div>
      <div class="artist-biography">
        <h3>Biografía</h3>
        <p v-if="artist.biography">{{ artist.biography }}</p>
        <p v-else>No hay biografía disponible.</p>
      </div>
      <div class="artist-movies">
        <h3>Conocido por</h3>
        <div class="movie-grid">
          <div v-for="movie in artist.known_for" :key="movie.id" class="movie-item">
            <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" />
            <p>{{ movie.title || movie.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">Cargando información del artista...</div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState({
        artist: state => state.artist, 
      }),
    },
    methods: {
      getImageUrl(path) {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : 'default-image-path'; 
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options); 
      },
    },
    mounted() {
      const artistId = this.$route.params.id;
      this.$store.dispatch('fetchArtistDetails', artistId); 
    },
  };
  </script>
  
  <style scoped>
  .artist-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .artist-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .artist-photo {
    width: 150px;
    border-radius: 10px;
  }
  
  .artist-details h2 {
    margin: 0;
  }
  
  .artist-details p {
    margin: 5px 0;
  }
  
  .artist-biography {
    margin-top: 20px;
  }
  
  .movie-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .movie-item {
    width: 120px;
    text-align: center;
  }
  
  .movie-item img {
    width: 100%;
    border-radius: 5px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.2em;
  }
  </style>
  