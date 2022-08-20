<template>
  <div
    class="h-20 bg-background border-b-[1px] border-dark w-full fixed top-0 z-50 header-transition"
    id="main-header"
  >
    <div class="mx-auto max-w-[1400px]">
      <Header />
    </div>
  </div>
  <div class="mx-auto mt-20 pt-5 pb-2 bg-white z-10 max-w-[1400px]">
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

.header-transition {
  transition: top 0.4s;
}
</style>
