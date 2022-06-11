<template>
  <div class="recipe">
    <div class="header">
      <RecipeHeader :recipe="recipe" />
    </div>
    <div class="content">
      <div class="ingredients">
        <RecipeIngredients
          :ingredients="recipe.ingredients"
          :servings="recipe.servings"
        />
      </div>
      <div class="instructions">
        <RecipeInstructions :instructions="recipe.instructions" />
      </div>
    </div>
    <div class="footer">
      <q-btn
        outline
        color="brand"
        label="Recept verwijderen"
        :loading="loading"
        @click="deleteRecipe()"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Recipe } from "../../models/Recipe";

import RecipeIngredients from "./RecipeIngredients.vue";
import RecipeInstructions from "./RecipeInstructions.vue";
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

.content {
  display: flex;
}

.ingredients {
  flex: 1;
}

.instructions {
  flex: 2;
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

  .content {
    flex-direction: column;
  }

  .recipe {
    padding: 10px;
  }
}
</style>
