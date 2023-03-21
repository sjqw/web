import { useUserStore } from "@/stores/user";
import router from "@/router";

export const logout = async () => {
  let store = useUserStore();
  store.set_userinfo({ user_id: 0, user_name: "", account: "" });
  router.push("/login");
};
