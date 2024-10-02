<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="username" placeholder="Nombre de usuario" required />
      <input type="password" v-model="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>
    </form>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;
      try {

        await this.$store.dispatch('login', { username: this.username, password: this.password });

        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.error = 'Error al iniciar sesión. Verifica tus credenciales.';
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 300px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

input {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
}
</style>
