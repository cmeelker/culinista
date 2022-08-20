<template>
  <div class="flex">
    <q-badge v-for="tag in tags" :key="tag" rounded :label="tag"></q-badge>
    <div v-if="tags.length == 0" class="hover:cursor-pointer">
      <q-badge @click="$emit('showEditComponent')">
        <q-icon
          class="mr-2"
          name="ion-add"
          size="xs"
          @click="$emit('showEditComponent')"
        />
        Tag toevoegen
      </q-badge>

      <q-tooltip :delay="1000"> Tags toevoegen</q-tooltip>
    </div>
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
