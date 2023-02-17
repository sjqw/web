<template>
  <div class="flex-1 overflow-y-auto justify-center items-center">
    <!-- <el-icon size="30px" color="red"><menu /></el-icon> -->
    <el-icon><i-ep-plus /></el-icon>
    <button @click="toggleDark()">
      <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

      <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
    </button>
    <el-button type="primary">主要按钮</el-button>
    <div grid grid-cols-2 grid-rows-4 gap-4>
      <div class="border border-green-300 border-solid">1</div>
      <div class="border border-green-300 border-solid">2</div>
      <div class="border border-green-300 border-solid">3</div>
      <div class="border border-green-300 border-solid">4</div>
      <div class="border border-green-300 border-solid">5</div>
      <div class="border border-green-300 border-solid">6</div>
      <div class="border border-green-300 border-solid">7</div>
      <div class="border border-green-300 border-solid">8</div>
      <div class="border border-green-300 border-solid">9</div>
      <div class="border border-green-300 border-solid">10</div>
    </div>
    <div :key="i" v-for="(item, i) in areaList">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { Ref } from "vue";
// import * as _ from "lodash";
// import { Edit, Share } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";
let areaList: Ref<number[]> = ref([1, 2, 3, 4, 5]);
const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});
onMounted(() => {
  areaList.value = [6, 7, 8];
  console.log(areaList.value);
});
const toggleDark = useToggle(isDark);
</script>
<style scoped lang="less"></style>
