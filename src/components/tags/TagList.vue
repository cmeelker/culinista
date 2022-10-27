<template>
  <div class="flex">
    <q-badge v-for="tag in tags" :key="tag" rounded :label="tag"></q-badge>
  </div>
</template>

<script lang="ts" setup>
import type { Tag } from "@/models/Tag";

defineProps<{
  tags: Tag[];
}>();
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

.q-badge {
  color: black;
  background-color: $light;
  padding: 5px 20px 5px 20px;
  margin-right: 10px;
  margin-top: 5px;
  height: 25px;
}
</style>
