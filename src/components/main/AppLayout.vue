<template>
  <div class="main-header" id="main-header"><Header /></div>
  <div class="router-view">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/main/Header.vue";

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  const header = document.getElementById("main-header");
  if (header) {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      header.style.top = "0px";
    } else {
      if (currentScrollPos > 80) {
        header.style.top = "-80px";
      }
    }
    prevScrollpos = currentScrollPos;
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

.main-header {
  height: 80px;
  background-color: $background;
  position: fixed;
  width: 100%;
  top: 0px;
  margin-right: 20px;
  border-bottom: 1px solid $dark;
  transition: top 0.4s;
  z-index: 2;
}

.router-view {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 80px;
  padding-top: 20px;
  background-color: white;
  position: relative;
  z-index: 1;
}
</style>
