<template>
  <div class="w-full h-100% flex">
    <Menu class="w-200px h-full" />
    <div class="flex-1 flex flex-col h-full">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Header from "./header/index.vue";
import Content from "./content/index.vue";
import Menu from "./menu/index.vue";
</script>

<style scoped lang="less"></style>
