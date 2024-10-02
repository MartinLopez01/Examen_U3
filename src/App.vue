<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
        <LogoutComponent v-if="isAuthenticated" />
      </nav>
    </header>
  
    <LogoutComponent />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LogoutComponent from '@/components/LogoutComponent.vue';

export default {
  components: {
    LogoutComponent
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
};
</script>
