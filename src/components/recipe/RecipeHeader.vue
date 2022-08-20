<template>
  <div
    class="flex flex-col lg:flex-row w-full rounded sm:rounded-xl overflow-hidden"
  >
    <div class="basis-2/5">
      <a :href="recipe.url" target="_blank">
        <img class="h-full object-cover" :src="recipe.image" />
      </a>
    </div>
    <div class="basis-3/5 flex h-full content-between">
      <h1 class="text-2xl sm:text-6xl text-bold text-dark p-4 sm:p-10">
        {{ recipe.title }}
      </h1>
      <div class="mb-2 w-full h-full flex items-center">
        <hr class="my-1 bg-black w-full" />
        <div class="px-4 sm:px-10 flex justify-between w-full">
          <TagList
            v-if="!showEditComponent"
            class="min-h-[80px] m-auto sm:m-0 sm:mr-4"
            :tags="recipe.tags ?? []"
            @show-edit-component="showEditComponent = true"
          />
          <TagEdit
            v-if="showEditComponent"
            class="min-h-[80px]"
            :recipe-id="recipe.id"
            :tags="recipe.tags ?? []"
            @close-edit-component="showEditComponent = false"
          />
          <div class="m-auto sm:m-0 sm:self-end">
            Toegevoegd door <strong>Christa</strong>
          </div>
        </div>
      </div>
      <div
        class="sm:bg-background w-full sm:h-10 flex px-4 sm:px-10 justify-between items-center"
      >
        <div class="flex mx-auto mt-8 sm:m-0 order-2 sm:order-1">
          <div class="mr-6">
            <q-btn flat disable>
              <q-icon
                name="ion-heart"
                size="sm"
                color="grey"
                class="mr-3"
              />Bewaar
            </q-btn>
          </div>
          <div>
            <q-btn flat disable>
              <q-icon name="ion-share" size="sm" color="grey" class="mr-3" />
              Deel
            </q-btn>
          </div>
        </div>

        <a
          :href="recipe.url"
          target="_blank"
          class="underline underline-offset-2 m-auto sm:m-0"
        >
          {{ toDisplayName(recipe.source as string) }}</a
        >
      </div>
    </div>
  </div>

  <!-- <div class="image"><img :src="recipe.image" /></div>
  <div class="title-area">
    <div v-if="isFavorite">
      <q-icon
        name="ion-star"
        size="md"
        color="#2a3238"
        @click="toggleFavorite()"
      >
        <q-tooltip :delay="1000"> Verwijder uit favorieten</q-tooltip>
      </q-icon>
    </div>
    <div class="favorite-icon" v-else>
      <q-icon
        name="ion-star-outline"
        size="md"
        color="#2a3238"
        @click="toggleFavorite()"
        ><q-tooltip :delay="1000"> Toevoegen aan favorieten</q-tooltip>
      </q-icon>
    </div>
    <div class="title">
      <h3>{{ recipe.title }}</h3>
    </div>
    <div class="tags">
      <TagList
        :class="{ hide: showEditComponent }"
        :tags="recipe.tags ?? []"
        @show-edit-component="showEditComponent = true"
      />
      <TagEdit
        :class="{ hide: !showEditComponent }"
        :recipe-id="recipe.id"
        :tags="recipe.tags ?? []"
        @close-edit-component="showEditComponent = false"
      />
    </div>
    <div class="source">
      <div class="source-logo"><img src="@/assets/AH.png" /></div>
      <div class="source-title">
        <a :href="recipe.url" target="_blank">
          {{ toDisplayName(recipe.source as string) }}</a
        >
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
// Gaat op de schop

import { toDisplayName } from "@/models/Source";
import TagList from "@/components/tags/TagList.vue";
import TagEdit from "@/components/tags/TagEdit.vue";
import type { Recipe } from "@/models/Recipe";
import { ref } from "vue";
import { useFavoriteStore } from "@/stores/favorite";
import { useAuth0 } from "@auth0/auth0-vue";

const props = defineProps<{
  recipe: Recipe;
}>();

const favoriteStore = useFavoriteStore();
const { user } = useAuth0();

const showEditComponent = ref(false);
const isFavorite = ref(true);

function toggleFavorite() {
  favoriteStore.toggleFavorite(user.value.sub as string, props.recipe.id);
}
</script>
