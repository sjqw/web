import { createApp } from "vue";
import "@/assets/css/reset.css";
import "@/assets/css/index.css";
import type { DirectiveBinding } from "vue";
import "uno.css";
import "animate.css";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "./stores/index";

const app = createApp(App);
app.directive("focus", {
  mounted(el: HTMLInputElement, dir: DirectiveBinding<any>) {
    el.focus();
  },
});
setupStore(app);
app.use(router);

app.mount("#app");
