<template>
  <div class="content">
    <div class="tags">
      <q-badge
        v-for="tag in tags"
        :key="tag"
        rounded
        :label="Tag[tag]"
      ></q-badge>
    </div>
    <div class="edit">
      <q-icon name="ion-create" @click="$emit('showEditComponent')" />
      <q-tooltip> Tags wijzigen</q-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tag } from "@/models/Tag";

defineProps<{
  tags: Tag[];
}>();

defineEmits(["showEditComponent"]);
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

.content {
  display: flex;
  justify-content: center;
}

.tags {
  .q-badge {
    color: black;
    background-color: $light;
    padding: 5px 20px 5px 20px;
    margin-right: 10px;
  }
}

.edit {
  border-radius: 16px;
  width: 30px;
  &:hover {
    cursor: pointer;
  }
}
</style>
