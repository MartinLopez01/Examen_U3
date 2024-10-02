<template>
  <div class="logout-component">
    <button @click="handleLogout">Cerrar sesión</button>
  </div>
</template>

<script>
export default {
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push({ name: 'Home' }); 
      } catch (error) {
        console.error('Error cerrando sesión:', error);
      }
    },
  },
};
</script>

<style scoped>
.logout-component {
  margin: 20px;
}

button {
  padding: 10px 20px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #ff7875;
}
</style>
