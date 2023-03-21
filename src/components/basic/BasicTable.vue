<template>
  <div>
    <el-table
      :data="datasource"
      ref="tableRef"
      v-bind="_options"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @cell-click="handleCellClick"
      @sort-change="handleSortChange"
    >
      <template v-for="(col, index) in columns" :key="index">
        <el-table-column
          v-if="
            col.type === 'index' ||
            col.type === 'selection' ||
            col.type === 'expand'
          "
          :index="indexMethod"
          v-bind="col"
        >
          <template #default="{ row, $index }">
            <!-- render函数 (START) : 使用内置的component组件可以支持h函数渲染和txs语法 -->
            <component
              v-if="col.render"
              :is="col.render"
              :row="row"
              :index="$index"
            />
            <!-- render函数 (END) -->
            <!-- 自定义slot (START) -->
            <slot
              v-else-if="col.slot"
              name="expand"
              :row="row"
              :index="$index"
            ></slot>
            <!-- 自定义slot (END) -->
          </template>
        </el-table-column>
        <TableColumn :col="col" v-else>
          <!-- 自定义表头插槽 -->
          <template #customHeader="{ slotName, column, index }">
            <slot :name="slotName" :column="column" :index="index" />
          </template>
          <!-- 自定义列插槽 -->
          <template #default="{ slotName, row, index }">
            <slot :name="slotName" :row="row" :index="index" />
          </template>
        </TableColumn>
      </template>
    </el-table>
    <!-- 分页 -->
    <div v-if="_options.showPagination" class="mt-10px">
      <Paging
        v-bind="_paginationConfig"
        @pageChange="pageChange"
        @sizeChange="sizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import type { ComputedRef } from "vue";
import { ElTable } from "element-plus";
export type SortParams<T> = {
  column: TableColumnCtx<T | any>;
  prop: string;
  order: Table.Order;
};
interface TableProps {
  datasource: Array<object>; // table的数据
  columns: Table.Column[]; // 每列的配置项
  options?: Table.Options;
  distanceTop?: number;
  distanceBottom?: number;
}
const tableRef = ref<InstanceType<typeof ElTable>>();
const props = withDefaults(defineProps<TableProps>(), {
  distanceTop: 170,
  distanceBottom: 100,
});
const tableHeight = ref<number>(0);
// 自定义索引
const indexMethod = (index: number) => {
  const tabIndex =
    index +
    (_paginationConfig.value.currentPage - 1) *
      _paginationConfig.value.pageSize +
    1;
  return tabIndex;
};
// 合并分页配置
const _paginationConfig = computed(() => {
  const config = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50, 100],
    layout: "total, sizes, prev, pager, next, jumper",
  };
  return Object.assign(config, _options.value.paginationConfig);
});
const _options: ComputedRef<Table.Options> = computed(() => {
  const option = {
    stripe: true,
    border: true,
    tooltipEffect: "dark",
    showHeader: true,
    showPagination: true,
    rowStyle: () => "cursor:pointer", // 行样式
  };
  return Object.assign(option, props?.options);
});
const emit = defineEmits([
  "selection-change", // 当选择项发生变化时会触发该事件
  "row-click", // 当某一行被点击时会触发该事件
  "cell-click", // 当某个单元格被点击时会触发该事件
  //   "command", // 按钮组事件
  "size-change", // pageSize事件
  "current-change", // currentPage按钮组事件
  //   "pagination-change", // currentPage或者pageSize改变触发
  "sort-change", // 列排序发生改变触发
  "setHeight",
]);
// 多选事件
const handleSelectionChange = (val: any) => {
  emit("selection-change", val);
};
// 当某一行被点击时会触发该事件
const handleRowClick = (row: any, column: any, event: MouseEvent) => {
  emit("row-click", row, column, event);
};
// 当某个单元格被点击时会触发该事件
const handleCellClick = (
  row: any,
  column: any,
  cell: any,
  event: MouseEvent
) => {
  emit("cell-click", row, column, cell, event);
};
const handleSortChange = ({ column, prop, order }: SortParams<any>) => {
  emit("sort-change", { column, prop, order });
};
const pageChange = (val: number) => {
  emit("current-change", val);
};
const sizeChange = (val: number) => {
  emit("size-change", val);
};
const getTableHeight = () => {
  let tableH = props.distanceBottom; //距离页面下方的高度
  let tableHeightDetil = window.innerHeight - tableH;
  if (tableHeightDetil <= 300) {
    tableHeight.value = 300;
  } else {
    tableHeight.value = window.innerHeight - tableH - props.distanceTop;
  }
  emit("setHeight", tableHeight.value);
};
const stop = watchEffect(() => {
  getTableHeight();
});
onBeforeUnmount(() => {
  stop();
});

defineExpose({ tableRef });
</script>
<style scoped lang="less"></style>
