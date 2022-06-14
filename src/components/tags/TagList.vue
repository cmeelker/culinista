<template>
  <div class="content">
    <div class="tags">
      <q-badge v-for="tag in tags" :key="tag" rounded :label="tag"></q-badge>
    </div>
    <div v-if="tags.length == 0" class="add">
      <q-badge @click="$emit('showEditComponent')">
        <q-icon name="ion-add" size="xs" @click="$emit('showEditComponent')" />
        Tag toevoegen
      </q-badge>
      <q-tooltip :delay="1000"> Tags toevoegen</q-tooltip>
    </div>
    <div v-else class="edit">
      <q-icon name="ion-create" size="xs" @click="$emit('showEditComponent')" />
      <q-tooltip :delay="1000"> Tags wijzigen</q-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tag } from "@/models/Tag";

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
  align-items: center;
}

.tags {
  .q-badge {
    color: black;
    background-color: $light;
    padding: 5px 20px 5px 20px;
    margin-right: 10px;
    margin-top: 10px;
  }
}

.edit {
  border-radius: 16px;
  width: 30px;
  &:hover {
    cursor: pointer;
  }

  .q-icon {
    margin-top: 10px;
    color: lightgray;
  }
}

.add {
  &:hover {
    cursor: pointer;
  }

  .q-icon {
    margin-right: 5px;
  }

  .q-badge {
    padding: 5px 15px 5px 15px;
  }
}
</style>
