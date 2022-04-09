<template>
  <div class="header"><Header /></div>
  <div class="router-view">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/main/Header.vue";
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

.header {
  height: 350px;
  background-color: $light;
}

.router-view {
  border-top: 1px solid $dark;
  margin-right: 20px;
  margin-left: 20px;
  background-color: white;
  height: 500px;
}
</style>
