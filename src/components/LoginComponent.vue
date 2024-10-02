<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Nombre de Usuario:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    ...mapActions(['getRequestToken', 'login']),
    async handleLogin() {
      try {
        
        await this.getRequestToken();
        
        await this.login({
          username: this.username,
          password: this.password,
        });
        this.$router.push({ name: 'Home' }); 
      } catch (err) {
        this.error = 'Error de inicio de sesión. Por favor, verifica tus credenciales.'; 
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
}
</style>
