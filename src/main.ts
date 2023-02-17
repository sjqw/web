import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/css/reset.css";
import "@/assets/css/index.css";
import type { DirectiveBinding } from "vue";
import "uno.css";
import "animate.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.directive("focus", {
  mounted(el: HTMLInputElement, dir: DirectiveBinding<any>) {
    el.focus();
  },
});
app.use(createPinia());
app.use(router);

app.mount("#app");
