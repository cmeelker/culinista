<template>
  <RecipeSearch
    :recipes="data"
    :is-loading="false"
    :error="(error as string)"
  />
  <div v-if="isFetched && data?.length === 0" class="ml-5 mb-5 mt-5">
    Je hebt nog een favorieten!
  </div>
</template>

<script lang="ts" setup>
import { fetchFavorites } from "@/services/FavoriteService";
import { useAuth0 } from "@auth0/auth0-vue";
import { watch } from "vue";
import { useQuery, useQueryClient } from "vue-query";
import RecipeSearch from "../components/recipe/RecipeSearch.vue";

const { user } = useAuth0();
const queryClient = useQueryClient();

const { data, error, isFetched } = useQuery("favorites", () => {
  return fetchFavorites(user.value.sub as string);
});

watch(user, () => {
  queryClient.invalidateQueries("favorites");
});
</script>
