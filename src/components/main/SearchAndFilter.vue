<template>
  <q-input v-model="filter" outlined color="brand" placeholder="Zoek recepten">
    <template v-slot:prepend>
      <q-avatar>
        <q-icon name="ion-search" size="md"></q-icon>
      </q-avatar>
    </template>
    <template v-slot:append v-if="showClearIcon">
      <q-avatar class="clear">
        <q-icon name="ion-close" size="md" @click="clearFilter"></q-icon>
      </q-avatar>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRecipeStore } from "@/stores/recipe";

const filter = ref("");
const recipeStore = useRecipeStore();
const showClearIcon = ref(false);

watch(filter, (newFilter) => {
  if (newFilter != "") {
    showClearIcon.value = true;
  }
  recipeStore.filterRecipes(newFilter);
});

function clearFilter() {
  recipeStore.fetchRecipes();
  filter.value = "";
  showClearIcon.value = false;
  (document.activeElement as HTMLElement).blur();
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";

.q-input {
  font-size: 20px;
  color: $dark;
  ::placeholder {
    font-size: 20px;
    color: $dark;
  }
}

.clear .q-icon:before,
.q-icon:after {
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .q-input {
    font-size: 16px;
    ::placeholder {
      font-size: 16px;
    }
  }
}
</style>
