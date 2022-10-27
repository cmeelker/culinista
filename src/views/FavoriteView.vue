<template>
  <RecipeSearch
    :recipes="data"
    :is-loading="isLoading"
    :error="(error as string)"
  />
</template>

<script lang="ts" setup>
import { fetchFavorites } from "@/services/FavoriteService";
import { useAuth0 } from "@auth0/auth0-vue";
import { ref, watch } from "vue";
import { useQuery, useQueryClient } from "vue-query";
import RecipeSearch from "../components/recipe/RecipeSearch.vue";

const { user } = useAuth0();
const queryClient = useQueryClient();
const isLoading = ref(true);

const { data, error } = useQuery("favorites", () => {
  if (user.value.sub) {
    return fetchFavorites(user.value.sub);
  }
});

watch(user, () => {
  queryClient
    .invalidateQueries("favorites")
    .then(() => (isLoading.value = false));
});
</script>
