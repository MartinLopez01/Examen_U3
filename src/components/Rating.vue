<template>
    <div class="rating">
      <span v-for="star in stars" :key="star" @click="setRating(star)" class="star" :class="{ filled: star <= currentRating }">
        ★
      </span>
      <p class="rating-value">{{ currentRating }}/{{ maxRating }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      maxRating: {
        type: Number,
        default: 5, 
      },
      initialRating: {
        type: Number,
        default: 0, 
      },
    },
    data() {
      return {
        currentRating: this.initialRating, 
      };
    },
    computed: {
      stars() {
        return Array.from({ length: this.maxRating }, (_, index) => index + 1);
      },
    },
    methods: {
      setRating(star) {
        this.currentRating = star; 
        this.$emit('rating-selected', star); 
      },
    },
  };
  </script>
  
  <style scoped>
  .rating {
    display: flex;
    align-items: center;
  }
  
  .star {
    cursor: pointer;
    font-size: 2em;
    color: lightgray; 
    transition: color 0.2s; 
  }
  
  .star.filled {
    color: gold; 
  }
  
  .rating-value {
    margin-left: 10px;
    font-size: 1.2em;
  }
  </style>
  