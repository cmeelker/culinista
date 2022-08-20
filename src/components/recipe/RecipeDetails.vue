<template>
  <RecipeHeader :recipe="recipe" />

  <div class="flex justify-center mt-10 hidden">
    <q-btn
      outline
      label="Recept verwijderen"
      :loading="loading"
      color="brand"
      @click="deleteRecipe()"
    />
  </div>
</template>

<script lang="ts" setup>
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
