<template>
  <div class="serie-detail">
    <div class="banner">
      <img :src="backdropUrl" alt="Backdrop" />
      <h1>{{ serie.title }}</h1>
      <p>{{ serie.overview }}</p>
      <div class="rating">Rating: {{ serie.vote_average }}</div>
      <button @click="toggleFavorite">{{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}</button>
    </div>
    <div class="additional-info">
      <h2>Details</h2>
      <p><strong>Genres:</strong> {{ getGenres }}</p>
      <p><strong>Seasons:</strong> {{ serie.number_of_seasons }}</p>
      <p><strong>Episodes:</strong> {{ serie.number_of_episodes }}</p>
    </div>
    <div class="cast">
      <h2>Cast</h2>
      <ul>
        <li v-for="actor in serie.cast" :key="actor.id">
          {{ actor.name }} as {{ actor.character }}
        </li>
      </ul>
    </div>
    <div class="trailer">
      <h2>Trailer</h2>
      <iframe
        v-if="trailerKey"
        :src="`https://www.youtube.com/embed/${trailerKey}`"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <div class="recommendations">
      <h2>Recommendations</h2>
      <ul>
        <li v-for="recommendation in recommendations" :key="recommendation.id">
          <router-link :to="`/series/${recommendation.id}`">{{ recommendation.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { useRoute } from 'vue-router';
import axios from '@/plugins/axios';
import SeriesBanner from '@/components/SeriesBanner.vue';
import Cast from '@/components/Cast.vue';

export default {
  name: 'SerieDetail',
  components: {
    SeriesBanner,
    Cast,
  },
  data() {
    return {
      serieId: this.$route.params.id,
      serie: {},
      recommendations: [],
      trailerKey: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    backdropUrl() {
      return `https://image.tmdb.org/t/p/w500/${this.serie.backdrop_path}`;
    },
    getGenres() {
      return this.serie.genres ? this.serie.genres.map(genre => genre.name).join(', ') : '';
    },
    isFavorite() {
      
      return false; 
    }
  },
  methods: {
    toggleFavorite() {

    },
    async fetchSerieDetails() {
      const route = useRoute();
      const serieId = route.params.id;

      const response = await axios.get(`/tv/${serieId}`);
      this.serie = response.data;

     
      const recommendationsResponse = await axios.get(`/tv/${serieId}/recommendations`);
      this.recommendations = recommendationsResponse.data.results;

      
      const videosResponse = await axios.get(`/tv/${serieId}/videos`);
      const trailer = videosResponse.data.results.find(video => video.type === 'Trailer');
      this.trailerKey = trailer ? trailer.key : null;
    },
  },
  mounted() {
    this.fetchSerieDetails();
  },
};
</script>

<style scoped>
.serie-detail {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.banner {
  position: relative;
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.banner img {
  width: 100%;
  border-radius: 10px;
  max-height: 400px;
  object-fit: cover;
  filter: brightness(0.7);
}

.banner h1 {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 2.5em;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

.banner p {
  margin-top: 10px;
  font-size: 1.2em;
}

.rating {
  margin-top: 10px;
  font-size: 1.2em;
  background-color: rgba(0, 0, 0, 0.7);
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff4c4c;
}

.additional-info {
  margin-bottom: 30px;
}

.additional-info h2 {
  font-size: 1.8em;
  margin-bottom: 10px;
}

.additional-info p {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.cast {
  margin-bottom: 30px;
}

.cast ul {
  list-style-type: none;
  padding: 0;
}

.cast li {
  font-size: 1.1em;
  margin-bottom: 5px;
}

.trailer {
  margin-bottom: 30px;
}

.trailer iframe {
  width: 100%;
  height: 400px;
  border-radius: 10px;
}

.recommendations {
  margin-bottom: 30px;
}

.recommendations ul {
  list-style-type: none;
  padding: 0;
}

.recommendations li {
  margin-bottom: 10px;
}

.recommendations li a {
  color: #1e90ff;
  text-decoration: none;
}

.recommendations li a:hover {
  text-decoration: underline;
}
</style>

