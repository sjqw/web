<template>
  <div class="bread-crumb rounded-6px">
    <el-breadcrumb class="h-full pl-16px">
      <el-breadcrumb-item
        :to="item.path"
        :key="index"
        v-for="(item, index) in breadArr"
        >{{ item.breadcrumbName }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
type Item = {
  breadcrumbName: string;
  path: string;
};
type Props = {
  ht?: string;
};
let breadArr: Item[] = reactive([]);
const router = useRouter();
withDefaults(defineProps<Props>(), {
  ht: "40px",
});
watch(
  () => router.currentRoute.value,
  (toPath) => {
    breadArr = toPath.meta.breadArr as Item[];
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
<style scoped lang="less">
.bread-crumb {
  height: v-bind(ht);
  line-height: v-bind(ht);
  background-color: var(--white-color);
  .el-breadcrumb {
    line-height: inherit;
  }
}
</style>
