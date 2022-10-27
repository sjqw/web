<template>
  <div>
    <Menu />
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Header from "./header/index.vue";
import Content from "./content/index.vue";
import Menu from "./menu/index.vue";
</script>

<style scoped lang="less"></style>
