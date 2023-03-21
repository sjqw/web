<template>
  <div class="p-20px content">
    <!-- <el-icon size="30px" color="red"><menu /></el-icon> -->
    <!-- <el-icon><i-ep-plus /></el-icon> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { Ref } from "vue";
import { menuDatas } from "@/router/routes";
</script>
<style scoped lang="less">
.content {
  background-color: var(--content-bc-color);
}
</style>
