import { createRouter, createWebHistory } from 'vue-router';
import RestCountries from '../module2/rest-countries/views/RestCountries.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/rest-countries', name: 'REST Countries', component: RestCountries },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
