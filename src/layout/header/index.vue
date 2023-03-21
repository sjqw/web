<template>
  <div class="head">
    <div class="w-210px text-center flex items-center bg-color">
      <el-image class="h-34px ml-16px" :src="logoUrl" fit="cover" />
    </div>
    <el-dropdown
      v-if="store.userInfo.account"
      class="w-120px"
      @command="dropDomn"
    >
      <div class="wraper w-130px pl-10px custom-flex-r pr-20px">
        <el-avatar :size="30" :src="circleUrl" />
        <div class="ml-10px w-60px single text-color text-16px">
          {{ store.userInfo.account }}
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="loginOut">
            <i class="i-ic-twotone-exit-to-app text-18px" />
            <span>退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item command="editPwd">
            <i class="i-ic-sharp-edit-note text-18px" />
            <span>修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div v-else class="wraper pl-10px w-130px custom-flex-r pr-20px justify-end">
      <el-avatar :size="30" :src="circleUrl" />
      <!-- <div class="ml-10px w-60px single text-color text-16px">登 录</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import logoUrl from "@/assets/images/company_logo.png";
// import { login } from "@/api";
const router = useRouter();
let store = useUserStore();
const circleUrl = ref<string>(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const dropDomn = async (item: string | number | object) => {
  if (item === "editPwd") {
    router.push({
      path: "/changePwd/1",
    });
  } else if (item === "loginOut") {
    /* const res = await login.logoutApi({ action: "Logout" });
    if (res.code === 200) {
      store.set_userinfo({ user_id: 0, user_name: "", account: "" });
      router.push("/login");
    } */
  }
};
</script>
<style scoped lang="less">
.head {
  background-color: #051f3a;
  .wraper {
    border-left: solid 1px var(--el-menu-border-color);
  }
}
.text-color {
  color: var(--white-color);
}
.bg-color {
  border-right: solid 1px var(--el-menu-border-color);
}
</style>
