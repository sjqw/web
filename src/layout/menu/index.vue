<template>
  <div class="relative">
    <div class="w-22px h-22px absolute left-full top-0 icon-all cursor-pointer">
      <el-icon size="20px" v-show="!isCollapse" @click="isCollapse = true"
        ><i-ep-fold
      /></el-icon>
      <el-icon size="20px" v-show="isCollapse" @click="isCollapse = false"
        ><i-ep-expand
      /></el-icon>
    </div>
    <el-menu
      :default-active="active"
      class="h-full w-210px overflow-y-auto"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      router
    >
      <Item :data="menus" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { menuDatas } from "@/router/routes";
import Item from "./components/item.vue";
import { useRouter } from "vue-router";
const menus = reactive(menuDatas);
const active = ref<string>("/home");
const isCollapse = ref(false);
const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    active.value = toPath;
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
<style scoped lang="less">
:deep(.el-sub-menu__icon-arrow) {
  font-size: 16px;
}
.icon-all {
  color: var(--el-color-primary);
}
</style>
