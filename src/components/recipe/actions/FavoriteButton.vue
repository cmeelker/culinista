<template>
  <q-btn flat @click="onToggleFavorite()">
    <q-icon name="ion-heart" size="sm" :color="heartColor" />
  </q-btn>
</template>

<script setup lang="ts">
import { fetchIsFavorite, postFavorite } from "@/services/FavoriteService";
import { computed } from "@vue/reactivity";
import { QBtn, QIcon } from "quasar";
import { useMutation, useQuery } from "vue-query";

const props = defineProps<{
  userId: string;
  recipeId: number;
}>();

const heartColor = computed(() => {
  return isFavoriteQuery.data.value ? "red" : "grey";
});

let isFavoriteQuery = useQuery(
  ["favorite", props.userId, props.recipeId],
  () => {
    return fetchIsFavorite({
      userId: props.userId,
      recipeId: props.recipeId,
    });
  }
);

const favoriteMutation = useMutation(
  (data: { userId: string; recipeId: number }) => {
    return postFavorite(data);
  }
);

async function onToggleFavorite() {
  favoriteMutation.mutate({
    userId: props.userId,
    recipeId: props.recipeId,
  });
}
</script>
