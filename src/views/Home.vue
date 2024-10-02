<template>
  <div class="home-container">
    <h1 class="welcome-title">Bienvenido</h1>
    <BannerComponent />
    <section class="movies-section">
      <h2>Películas en Tendencia</h2>
      <TrendingMovies />
    </section>
    <section class="movies-section">
      <h2>Películas Populares</h2>
      <PopularMovies />
    </section>
    <section class="movies-section">
      <h2>Películas Gratis</h2>
      <FreeToWatch />
    </section>
    <section class="movies-section">
      <h2>Series o TV</h2>
      <SeriesOrTv />
    </section>
    <section class="movies-section">
      <h2>Categorias</h2>
      <MovieCategories />
    </section>
  </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue';
import TrendingMovies from '@/components/TrendingMovies.vue';
import PopularMovies from '@/components/PopularMovies.vue';
import SeriesOrTv from '@/components/SeriesOrTv.vue';
import FreeToWach from '@/components/FreeToWach.vue';
import MovieCategories from '@/components/MovieCategories.vue';
export default {
  components: {
    BannerComponent,
    TrendingMovies,
    PopularMovies,
    SeriesOrTv,
    FreeToWach,
    MovieCategories,
  },
};
</script>

<style scoped>
.home-container {
  padding: 30px;
  background-color: #6d6d6d; 
  font-family: 'Arial', sans-serif; 
}

.welcome-title {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 30px;
  color: #343a40; 
}

.movies-section {
  margin-bottom: 40px;
  background-color: #ffffff; 
  padding: 25px;
  border-radius: 10px; 
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.movies-section h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #007bff; 
  text-align: left; 
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
  gap: 20px; 
}

.movie-item {
  text-align: center;
  transition: transform 0.3s; 
}

.movie-item:hover {
  transform: scale(1.05); 
}

.movie-item img {
  width: 100%;
  border-radius: 8px; 
}

.movie-item p {
  margin-top: 5px;
  color: #6c757d; 
  font-size: 0.9em;
}
</style>
