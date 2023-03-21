<template>
  <div>
    <el-form :inline="true" :model="formInline" size="default">
      <template v-for="(item, index) in searchFilds" :key="index">
        <el-form-item v-if="item.type === 'input'" :label="item.label">
          <el-input
            v-model="formInline[item['name']]"
            :clearable="item.clearable"
            :placeholder="item.placeholder"
          />
        </el-form-item>
        <el-form-item v-else-if="item.type === 'select'" :label="item.label">
          <el-select
            v-model="formInline[item['name']]"
            :clearable="item.clearable"
            :placeholder="item.placeholder"
            :multiple="item.multiple"
            :filterable="item.filterable"
            :allow-create="item.allowCreate"
          >
            <el-option
              :key="obj.value"
              v-for="obj in item.options"
              :label="obj.label"
              :value="obj.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-else-if="item.type === 'datePicker'"
          :label="item.label"
        >
          <el-date-picker
            v-model="formInline[item['name']]"
            :type="item.dateType"
            :placeholder="item.placeholder"
            :start-placeholder="item.startPlaceholder"
            :end-placeholder="item.endPlaceholder"
            :value-format="item.valueFormat"
            :editable="item.editable"
            :range-separator="item.rangeSeparator"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-space>
          <el-button type="primary" @click="search">查询</el-button>
          <slot></slot>
        </el-space>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
export type OptionType = {
  label: string;
  value: string;
};
export interface Basic {
  type: "input" | "select" | "datePicker";
  name: string; //字段名
  placeholder?: string;
  label?: string;
  value: string | Array<any>;
  clearable?: boolean;
  options?: OptionType[];
  multiple?: boolean;
  filterable?: boolean;
  allowCreate?: boolean;
  dateType?:
    | "date"
    | "year"
    | "month"
    | "dates"
    | "week"
    | "datetime"
    | "datetimerange"
    | "daterange"
    | "monthrange";
  startPlaceholder?: string;
  endPlaceholder?: string;
  rangeSeparator?: string;
  valueFormat?: string;
  editable?: boolean;
}
type Props = {
  searchFilds: Basic[];
};
const propsData = defineProps<Props>();
const initFormData = computed(() => {
  const formObj = {};
  propsData.searchFilds.forEach((item) => {
    formObj[item["name"]] = item.value;
  });
  return formObj;
});
const formInline = reactive({
  ...initFormData.value,
});
const emit = defineEmits(["search"]);
const search = () => {
  emit("search", formInline);
};
</script>
<style scoped lang="less"></style>
