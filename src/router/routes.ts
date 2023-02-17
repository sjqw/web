import Layout from "@/layout/index.vue";
export const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("@/components/core/notFound.vue"),
  },
];
