<template>
  <el-config-provider :locale="locale">
    <router-view #default="{ route, Component }">
      <transition
        :enter-active-class="`animate__animated ${route.meta.transition}`"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const { locale } = reactive({
  locale: zhCn,
});
// console.log(import.meta.env.VITE_API);
</script>
<style>
html,
body,
#app {
  height: 100%;
  background-color: var(--custom-bc-color);
  font-family: Helvetica, Arial, PingFang SC, "Source Han Serif SC",
    Microsoft YaHei;
}
</style>
