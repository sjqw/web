<template>
  <el-dialog
    v-model="isOpen"
    :title="title"
    :width="width"
    align-center
    v-bind="config"
  >
    <slot name="header"></slot>
    <el-scrollbar :height="propsData.height">
      <slot>内容</slot>
    </el-scrollbar>
    <template #footer>
      <slot name="footer">
        <span class="dialog-footer">
          <el-button @click="isOpen = false">取消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="save">
            保存
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
type Props = {
  modelValue: boolean;
  title?: string;
  width?: string | number;
  btnLoading?: boolean;
  options?: object;
  height?: number; //dialog body height
};
const propsData = withDefaults(defineProps<Props>(), {
  title: "添加",
  width: "50%",
  btnLoading: false,
  height: 500,
});
const emit = defineEmits(["update:modelValue", "save"]);
const config = computed(() => {
  const _options = {
    top: "15vh",
  };
  return Object.assign({}, _options, propsData?.options);
});
const isOpen = computed({
  get: () => {
    return propsData.modelValue;
  },
  set: (value: boolean) => {
    emit("update:modelValue", value);
  },
});
const save = () => {
  emit("save");
};
/* const close = () => {
  emit("close");
}; */
</script>
<style scoped lang="less"></style>
