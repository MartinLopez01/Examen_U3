<template>
  <div class="artist-detail">
    <h1>{{ artist.name }}</h1>
    <img :src="artist.profile_path" alt="Artist Image" v-if="artist.profile_path" />
    <p><strong>Conocido por:</strong> {{ artist.known_for_department }}</p>
    <p><strong>Biografía:</strong> {{ artist.biography }}</p>

    <h2>Filmografía</h2>
    <ul>
      <li v-for="(movie, index) in artist.filmography" :key="index">
        <strong>{{ movie.title }}</strong> ({{ movie.release_date }})
      </li>
    </ul>
    
    <router-link :to="{ name: 'Home' }">Volver a la página principal</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['artist']), 
  },
  async created() {
    const artistId = this.$route.params.id; 
    await this.$store.dispatch('fetchArtistDetails', artistId); 
  },
};
</script>

<style scoped>
.artist-detail {
  padding: 20px;
}

.artist-detail img {
  max-width: 200px;
  border-radius: 10px;
}

.artist-detail h1 {
  font-size: 24px;
}

.artist-detail h2 {
  margin-top: 20px;
}
</style>
