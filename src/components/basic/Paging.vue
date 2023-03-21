<template>
  <div>
    <el-pagination
      class="justify-end"
      v-model:current-page="currentPageValue"
      v-model:page-size="pageSizeValue"
      :page-sizes="pageSizes"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="hide"
      @size-change="(val: number) => emit('sizeChange', val)"
      @current-change="(val: number) => emit('pageChange', val)"
    />
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from "vue";
export type Props = {
  currentPage: number;
  pageSize: number;
  pageSizes?: number[];
  small?: boolean;
  disabled?: boolean;
  background?: boolean;
  layout?: string;
  total: number;
  hide?: boolean;
};
const propsData = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 20, 50],
  small: false,
  disabled: false,
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
  hide: false,
});
const emit = defineEmits([
  "update:current-page",
  "update:page-size",
  "sizeChange",
  "pageChange",
]);
const currentPageValue = computed<number>({
  get: () => {
    return propsData.currentPage;
  },
  set: (value) => {
    emit("update:current-page", value);
  },
});
const pageSizeValue = computed<number>({
  get: () => {
    return propsData.pageSize;
  },
  set: (value) => {
    emit("update:page-size", value);
  },
});
</script>
<style scoped lang="less"></style>
