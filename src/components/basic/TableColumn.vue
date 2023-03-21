<template>
  <!-- 如果有配置多级表头的数据，则递归该组件 -->
  <template v-if="col.children?.length">
    <el-table-column :label="col.label" :width="col.width" :align="col.align">
      <TableColumn
        v-for="(item, index) in col.children"
        :col="item"
        :key="index"
      />
    </el-table-column>
  </template>
  <!-- 其他正常列 -->
  <el-table-column v-else v-bind="col">
    <template #default="{ row, $index }">
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
        :slotName="col.slot"
        :row="row"
        :index="$index"
      ></slot>
      <!-- 自定义slot (END) -->
      <!-- 默认渲染 (START) -->
      <span v-else>{{ row[col.prop!] }}</span>
      <!-- 默认渲染 (END) -->
    </template>
    <!-- 自定义表头 -->
    <template #header="{ column, $index }">
      <component
        v-if="col.headerRender"
        :is="col.headerRender"
        :column="column"
        :index="$index"
      />
      <slot
        v-else-if="col.headerSlot"
        name="customHeader"
        :slotName="col.headerSlot"
        :column="column"
        :index="$index"
      ></slot>
      <span v-else>{{ column.label }}</span>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
// import type { VNodeChild } from "vue";
// type VNodeChild = import("vue").VNodeChild;
/* type Type = "selection" | "index" | "expand" | "image" | "date";
type Align = "center" | "left" | "right";
type Command = string | number;
type Size = "large" | "default" | "small";
type DateFormat =
  | "YYYY-MM-DD"
  | "YYYY-MM-DD HH:mm:ss"
  | "YYYY-MM-DD HH:mm"
  | "YYYY-MM";
interface ButtonItem {
  name: string;
  command: Command;
  size?: Size;
  type?: "primary" | "success" | "warning" | "danger" | "info";
}
interface Column {
  // 对应列的类型。 如果设置了selection则显示多选框； 如果设置了 index 则显示该行的索引（从 1 开始计算）； 如果设置了 expand 则显示为一个可展开的按钮
  type?: Type;
  label?: string;
  prop?: string;
  slot?: string;
  width?: string;
  align?: Align;
  dateFormat?: DateFormat; // 显示在页面中的日期格式，简单列举了几种格式， 可自行配置
  showOverflowTooltip?: boolean;
  buttons?: ButtonItem[];
  render?: (row: Record<string, any>, index?: number) => any; // 渲染函数，渲染这一列的每一行的单元格
  sortable?: boolean | "custom"; // 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
  headerRender?: (column: any) => any; // 渲染函数，渲染列表头//{ column, index }
  headerSlot?: string; // 自定义表头插槽名字
  children?: Column[]; // 配置多级表头的数据集合, 具体用法可参考多级表头使用示例。
} */
type PropsType = {
  col: Table.Column;
};
defineProps<PropsType>();
</script>
