<template>
  <q-btn flat @click="onToggleFavorite()">
    <q-icon name="ion-heart" size="sm" :color="heartColor" />
  </q-btn>
</template>

<script setup lang="ts">
import { fetchFavorites, postFavorite } from "@/services/FavoriteService";
import { computed } from "@vue/reactivity";
import { QBtn, QIcon } from "quasar";
import { useMutation, useQuery, useQueryClient } from "vue-query";

const props = defineProps<{
  userId: string;
  recipeId: number;
}>();

const queryClient = useQueryClient();

const heartColor = computed(() => {
  const isFavorite = favoritesQuery.data.value?.find(
    (r) => r.id === props.recipeId
  );

  return isFavorite ? "accent" : "grey";
});

const favoritesQuery = useQuery("favorites", () => {
  return fetchFavorites(props.userId);
});

const favoriteMutation = useMutation(
  (data: { userId: string; recipeId: number }) => {
    return postFavorite(data);
  }
);

async function onToggleFavorite() {
  favoriteMutation.mutate(
    {
      userId: props.userId,
      recipeId: props.recipeId,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favorites");
      },
    }
  );
}
</script>
