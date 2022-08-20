<template>
  <div class="recipe">
    <div class="header">
      <RecipeHeader :recipe="recipe" />
    </div>
    <div class="footer">
      <q-btn
        outline
        label="Recept verwijderen"
        :loading="loading"
        color="brand"
        @click="deleteRecipe()"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
// Gaat op de schop

import type { Recipe } from "../../models/Recipe";
import RecipeHeader from "./RecipeHeader.vue";
import { useQuasar } from "quasar";
import router from "@/router";
import { useRecipeStore } from "@/stores/recipe";
import { storeToRefs } from "pinia";

const props = defineProps<{
  recipe: Recipe;
}>();

const $q = useQuasar();
const recipeStore = useRecipeStore();

const { loading } = storeToRefs(useRecipeStore());

function deleteRecipe() {
  $q.dialog({
    title: "Bevestigen",
    message: "Weet je zeker dat je dit recept wilt verwijderen?",
    persistent: true,
    ok: { label: "Oke", flat: true, color: "brand" },
    cancel: { label: "Annuleer", flat: true, color: "black" },
  }).onOk(async () => {
    await recipeStore.deleteRecipe(props.recipe.id);

    // TO DO: Error afhandeling

    $q.notify({
      message: "Recept is verwijderd",
      color: "secondary",
    });
    router.push(`/`);
  });
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
.recipe {
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.header {
  height: 250px;
  display: flex;
  margin-bottom: 40px;
}

.footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media screen and (max-width: 600px) {
  .header {
    flex-direction: column;
    height: auto;
  }

  .recipe {
    padding: 0 10px;
  }
}
</style>
