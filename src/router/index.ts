import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { routes } from "./routes";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        left: 0,
        top: 0,
      };
    }
  },
  routes,
});

export default router;
