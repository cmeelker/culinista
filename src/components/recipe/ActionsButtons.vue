<template>
  <div class="sm:flex sm:flex-col">
    <q-btn flat disable>
      <q-icon name="ion-heart" size="sm" color="grey" />
    </q-btn>

    <q-btn flat disable class="sm:mt-4">
      <q-icon name="ion-share" size="sm" color="grey" />
    </q-btn>

    <q-btn flat class="sm:mt-4">
      <q-icon name="ion-create" size="sm" color="grey" />
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="$emit('showEditComponent')">
            <q-item-section>Tags wijzigen</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="deleteRecipe()">
            <q-item-section>Recept verwijderen</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "@/models/Recipe";
import router from "@/router";
import { useRecipeStore } from "@/stores/recipe";
import { useQuasar } from "quasar";

const props = defineProps<{
  recipe: Recipe;
}>();

defineEmits(["showEditComponent"]);

const $q = useQuasar();
const recipeStore = useRecipeStore();

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
