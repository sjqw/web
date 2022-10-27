<template>
  <div>
    <!-- <el-icon size="30px" color="red"><menu /></el-icon> -->
    <el-icon><i-ep-plus /></el-icon>
    <button @click="toggleDark()">
      <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

      <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
// import * as _ from "lodash";

// import { Edit, Share } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>
<style scoped lang="less"></style>
