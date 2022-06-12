<template>
  <div class="search">
    <q-input
      v-model="filter"
      outlined
      color="brand"
      placeholder="Zoek recepten"
      @keydown.enter.prevent="submit"
    >
      <template v-slot:prepend>
        <q-avatar>
          <q-icon name="ion-search" size="md"></q-icon>
        </q-avatar>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRecipeStore } from "@/stores/recipe";

const filter = ref("");
const recipeStore = useRecipeStore();

function submit() {
  recipeStore.filterRecipes(filter.value);
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";

.search {
  margin-top: 20px;
}

.q-input {
  font-size: 20px;
  color: $dark;
  ::placeholder {
    font-size: 20px;
    color: $dark;
  }
}
</style>
