import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { getCookie } from "@/utils/cookie";
import { useUserStore } from "@/stores/user";
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

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else if (to.path === "/changePwd/0") {
    const store = useUserStore();
    if (store.userInfo.account) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (getCookie("session-id2")) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
