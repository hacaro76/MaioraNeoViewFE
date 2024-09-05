import { createRouter, createWebHashHistory } from 'vue-router'
import SettingsPage from '../components/SettingsPage.vue'
import HomePage from '../components/HomePage.vue'
import HeritageMenu from '../components/HeritageMenu.vue'
import HeritagePage from '../components/HeritagePage.vue'
//import FleetPage from '../components/FleetPage.vue'
import FleetDetail from '../components/boats/FleetDetail.vue'
import BoatDetail from '../components/boats/BoatDetail.vue';

const Store = window.require('electron-store');
const store = new Store();

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage
  },
  {
    path: '/heritage',
    name: 'heritage',
    component: HeritageMenu
  },
  {
    path: '/heritage/book',
    name: 'heritagebook',
    component: HeritagePage
  },
  {
    path: '/fleets/:id',
    component: FleetDetail,
		props: true
  },
  {
    path: '/yachts/:id',
    component: BoatDetail,
		props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const updated = store.get("updated");
  const logged = store.get("logged");
  if (!updated || !logged) {
    if (to.path !== '/settings') next("/settings");
    else next();
  } else {
		next();
  }
});

export default router
