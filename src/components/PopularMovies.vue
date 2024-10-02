<template>
    <div class="popular-movies">
      <h2>Películas Populares</h2>
      <div class="movie-grid">
        <div v-for="movie in popularMovies" :key="movie.id" class="movie-item">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="movie-poster" />
          <p>{{ movie.title }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        popularMovies: [],
      };
    },
    methods: {
      async fetchPopularMovies() {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=TU_API_KEY&language=es-ES&page=1`
          );
          const data = await response.json();
          this.popularMovies = data.results; 
        } catch (error) {
          console.error('Error al obtener las películas populares:', error);
        }
      },
      getImageUrl(path) {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : 'default-image-path'; 
      },
    },
    mounted() {
      this.fetchPopularMovies(); 
    },
  };
  </script>
  
  <style scoped>
  .popular-movies {
    margin-top: 20px;
  }
  
  h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  
  .movie-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  }
  
  .movie-item {
    text-align: center;
    width: 150px;
  }
  
  .movie-poster {
    width: 100%;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }
  
  .movie-poster:hover {
    transform: scale(1.05);
  }
  
  p {
    margin-top: 10px;
    font-size: 1em;
  }
  </style>
  