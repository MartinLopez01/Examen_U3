<template>
    <div class="movie-categories">
      <h2>Categorías de Películas</h2>
      <div class="categories-list">
        <div
          class="category-item"
          v-for="category in categories"
          :key="category.id"
          @click="goToCategory(category.id)"
        >
          <p>{{ category.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['categories']),
    },
    methods: {
      goToCategory(categoryId) {
        
        this.$router.push({ name: 'CategoryDetail', params: { id: categoryId } });
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-categories {
    padding: 20px;
    background-color: #f9f9f9; 
    border-radius: 10px; 
  }
  
  h2 {
    font-size: 2em; 
    margin-bottom: 20px;
  }
  
  .categories-list {
    display: flex;
    flex-wrap: wrap; 
    gap: 15px; 
  }
  
  .category-item {
    flex: 1 1 calc(25% - 15px);
    padding: 15px;
    background-color: #007bff; 
    color: white; 
    text-align: center;
    border-radius: 5px; 
    cursor: pointer; 
    transition: background-color 0.3s; 
  }
  
  .category-item:hover {
    background-color: #0056b3;
  }
  </style>
  