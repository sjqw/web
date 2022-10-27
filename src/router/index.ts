import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [],
    },
  ],
});

export default router;
