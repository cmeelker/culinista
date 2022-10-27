<template>
  <RecipeSearch
    :recipes="data"
    :is-loading="false"
    :error="(error as string)"
  />
</template>

<script lang="ts" setup>
import { fetchFavorites } from "@/services/FavoriteService";
import { useAuth0 } from "@auth0/auth0-vue";
import { watch } from "vue";
import { useQuery, useQueryClient } from "vue-query";
import RecipeSearch from "../components/recipe/RecipeSearch.vue";

const { user } = useAuth0();
const queryClient = useQueryClient();

const { data, error } = useQuery("favorites", () => {
  return fetchFavorites(user.value.sub as string);
});

watch(user, () => {
  queryClient.invalidateQueries("favorites");
});
</script>
