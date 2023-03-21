<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    :before-upload="beforeAvatarUpload"
  >
    <template #trigger>
      <slot name="trigger"><el-button type="primary">选择文件</el-button></slot>
      <slot></slot>
    </template>
    <slot></slot>
    <template #tip>
      <slot name="tip"></slot>
    </template>
    <template #file="{ file }">
      <slot name="file" :file="file"> </slot>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { UploadProps, UploadUserFile, UploadInstance } from "element-plus";
type Props = {
  modelValue: UploadUserFile[];
  size?: number;
  formart?: string;
};
const uploadRef = ref<UploadInstance>();
const propsData = withDefaults(defineProps<Props>(), {
  size: 2,
});
const emit = defineEmits(["update:modelValue"]);
const fileList = computed({
  get() {
    return propsData.modelValue;
  },
  set(value: UploadUserFile[]) {
    emit("update:modelValue", value);
  },
});
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (propsData.formart) {
    if (rawFile.type !== propsData.formart) {
      ElMessage.error("Avatar picture must be JPG format!");
      return false;
    }
  }
  if (rawFile.size / 1024 / 1024 > propsData.size) {
    ElMessage.error(`上传的证书文件不能大于${propsData.size}MB`);
    return false;
  }
  return true;
};
defineExpose({
  uploadRef,
});
</script>
<style scoped lang="less"></style>
