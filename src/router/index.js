
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import MovieDetail from '@/views/MovieDetail.vue';
import ArtistDetail from '@/views/ArtistDetail.vue';
import SeriesDetail from '@/views/SeriesDetail.vue';
import Login from '@/views/Login.vue';
import store from '@/store';
import SeriesOrTv from '@/components/SeriesOrTv.vue';



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetail },
  { path: '/artist/:id', name: 'ArtistDetail', component: ArtistDetail },
  { path: '/series/:id', name: 'SeriesDetail', component: SeriesDetail },
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    meta: { requiresAuth: true } 
  },
  {
    path: '/series-or-tv',
    name: 'SeriesOrTv',
    component: SeriesOrTv,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;