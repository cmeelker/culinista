<template>
  <div class="app">
    <VueQueryDevTools />
    <AppLayout />
  </div>
</template>

<script setup lang="ts">
import AppLayout from "@/components/main/AppLayout.vue";
import { useQueryProvider } from "vue-query";
import { VueQueryDevTools } from "vue-query/devtools";

useQueryProvider();
</script>
