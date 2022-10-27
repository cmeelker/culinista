<template>
  <div class="sm:flex sm:flex-col">
    <q-btn flat @click="toggleFavorite()">
      <q-icon name="ion-heart" size="sm" color="grey" />
    </q-btn>

    <q-btn flat disable class="sm:mt-4">
      <q-icon name="ion-share" size="sm" color="grey" />
    </q-btn>

    <q-btn v-if="isRecipeOwner" flat class="sm:mt-4">
      <q-icon name="ion-create" size="sm" color="grey" />
      <q-menu anchor="bottom right" self="top right">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="$emit('showEditComponent')">
            <q-item-section>Tags wijzigen</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onDeleteRecipe()">
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
import { deleteRecipe } from "@/services/RecipeService";
import { postFavorite } from "@/services/FavoriteService";
import { useAuth0 } from "@auth0/auth0-vue";
import {
  QBtn,
  QIcon,
  QItem,
  QItemSection,
  QList,
  QMenu,
  useQuasar,
} from "quasar";
import { useMutation } from "vue-query";

const props = defineProps<{
  recipe: Recipe;
  isRecipeOwner: boolean;
}>();

defineEmits(["showEditComponent"]);

const { user } = useAuth0();
const $q = useQuasar();

const deleteMutation = useMutation(
  (recipeId: number) => {
    return deleteRecipe(recipeId);
  },
  {
    onSuccess: () => {
      router.push(`/`);

      $q.notify({
        message: "Recept is verwijderd",
        color: "secondary",
      });
    },
    onError: () => {
      $q.notify({
        message: "Recept verwijderen is niet gelukt",
        color: "warning",
      });
    },
  }
);

const favoriteMutation = useMutation(
  (data: { userId: string; recipeId: number }) => {
    return postFavorite(data);
  },
  {
    onSuccess: () => {
      // TO DO: Opnieuw ophalen of dit een favo is
    },
  }
);

function onDeleteRecipe() {
  $q.dialog({
    title: "Bevestigen",
    message: "Weet je zeker dat je dit recept wilt verwijderen?",
    persistent: true,
    ok: { label: "Oke", flat: true, color: "brand" },
    cancel: { label: "Annuleer", flat: true, color: "black" },
  }).onOk(async () => {
    deleteMutation.mutate(props.recipe.id);
  });
}

async function toggleFavorite() {
  if (user.value.sub && props.recipe.id) {
    favoriteMutation.mutate({
      userId: user.value.sub,
      recipeId: props.recipe.id,
    });
  }
}
</script>
