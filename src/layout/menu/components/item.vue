<template>
  <i class=""></i>
  <template v-for="item in data" :key="item.path">
    <el-menu-item :index="'/' + item.path" v-if="!item.children || item.isMenu">
      <i :class="['iconfont', 'text-18px', 'm-r-8px', item.meta.icon]"></i>
      <template #title
        ><span class="text-16px">{{ item.meta.menuName }}</span></template
      >
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
<style scoped lang="less">
:deep(.el-sub-menu__title) {
  font-size: 16px;
}
:deep(.el-menu-item) {
  border-radius: 6px;
}
.el-menu-item:not(.is-active):hover {
  color: rgb(15, 198, 194);
}
.el-menu-item.is-active {
  background-color: rgb(15, 198, 194);
}
:deep(.el-menu-item.is-active) {
  background-color: rgb(15, 198, 194);
}
:deep(.el-menu-item):not(.is-active) {
  &:hover {
    color: rgb(15, 198, 194);
  }
}
.el-sub-menu.is-active {
  :deep(.el-sub-menu__title) {
    color: rgb(15, 198, 194) !important;
  }
}
.el-sub-menu {
  :deep(.el-sub-menu__title) {
    &:hover {
      color: rgb(15, 198, 194);
    }
  }
}
</style>
