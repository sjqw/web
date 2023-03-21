<template>
  <i class=""></i>
  <template v-for="item in data" :key="item.path">
    <el-menu-item :index="'/' + item.path" v-if="!item.children || item.isMenu">
      <i :class="['iconfont', 'text-18px', 'm-r-8px', item.meta.icon]"></i>
      <template #title>{{ item.meta.menuName }}</template>
    </el-menu-item>
    <el-sub-menu :index="'/' + item.path" v-else>
      <template #title>
        <i :class="['iconfont', 'text-18px', 'm-r-8px', item.meta.icon]"></i>
        <span>{{ item.meta.menuName }}</span>
      </template>
      <Item :data="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { Menu } from "@/router/type";
type Props = {
  data: Array<Menu>;
};
const menus = defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: "Item",
};
/* const fileFilter = computed(() => (name: string) => {
  return new URL(`../../../assets/images/${name}`, import.meta.url).href;
}); */
</script>
<style scoped lang="less"></style>
