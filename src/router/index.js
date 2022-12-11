import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/index.vue";
import MovieView from "../views/Movie/index.vue";
import SearchView from "../views/Search/index.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movie",
      name: "movie",
      component: MovieView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
   

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
