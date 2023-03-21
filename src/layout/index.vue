<template>
  <div class="w-full h-100% flex flex-col">
    <Header class="h-40px flex justify-between"></Header>
    <div class="flex-1 flex overflow-hidden">
      <Menu class="h-full" />
      <Content class="flex-1 h-full overflow-auto"></Content>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Header from "./header/index.vue";
import Content from "./content/index.vue";
import Menu from "./menu/index.vue";
import Footer from "./footer/index.vue";
</script>

<style scoped lang="less"></style>
