import { defineStore } from "pinia";
import { Names } from "./storeName";
import type { UserType } from "@/components/core/login.vue";
export const useUserStore = defineStore(Names.User, {
  state: () => ({
    userInfo: <UserType>{ user_id: 0, user_name: "", account: "" },
  }),
  actions: {
    set_userinfo(user: UserType) {
      this.userInfo = user;
    },
  },
  getters: {},
  persist: {
    paths: ["userInfo"],
  },
});
