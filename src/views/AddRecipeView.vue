<template>
  <div class="flex flex-col items-center sm:mx-20 mx-2">
    <img src="../assets/fork-knive-icon.png" width="70" class="my-6" />
    <h1 class="text-2xl sm:text-5xl font-bold mb-12">Recept toevoegen</h1>

    <InputCard
      class="mb-6"
      :title="'Vul de link naar het recept in'"
      :number="1"
      :isDone="previewIsFetched"
      ><q-input
        class="bg-white mt-4"
        outlined
        v-model="newRecipe.url"
        placeholder="https://www.allerhande.nl/lekker-recept"
        dense
        color="brand"
        type="url"
        :disable="previewIsFetched"
      />
    </InputCard>

    <div
      v-if="error"
      class="bg-red-100 rounded border border-red-300 mb-6 px-2 py-1"
    >
      Er is iets mis gegaan bij het laden van jouw recept
    </div>

    <q-btn
      v-if="!previewIsFetched"
      unelevated
      color="brand"
      text-color="white"
      label="Zoek recept"
      class="mb-10"
      :loading="isLoading"
      :disable="!newRecipe.url"
      @click="() => refetch()"
    />

    <div v-if="previewIsFetched" class="flex flex-col w-full space-y-10 mb-10">
      <InputCard :title="'Titel'" :number="2" :isDone="previewIsFetched"
        ><q-input
          class="bg-white mt-4"
          outlined
          v-model="newRecipe.title"
          placeholder="https://www.allerhande.nl/lekker-recept"
          dense
          color="brand"
      /></InputCard>
      <InputCard
        :title="'Kies een afbeelding'"
        :number="3"
        :isDone="newRecipe.image !== ''"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          <div v-for="image in images" :key="image">
            <ImagePicker
              :image="image"
              :isSelected="newRecipe.image === image"
              @select-image="newRecipe.image = image"
            />
          </div>
        </div>
      </InputCard>
    </div>

    <q-btn
      v-if="previewIsFetched"
      unelevated
      color="brand"
      text-color="white"
      label="Recept toevoegen"
      class="mb-10"
      :loading="isLoading"
      :disable="!newRecipe.url"
      @click="addRecipe"
    />

    <a
      class="text-grey text-xs"
      href="https://www.flaticon.com/free-icons/restaurant"
      title="restaurant icons"
      >Restaurant icon created by Freepik - Flaticon</a
    >
  </div>
</template>

<script setup lang="ts">
import InputCard from "@/components/forms/InputCard.vue";
import ImagePicker from "@/components/forms/ImagePicker.vue";
import { reactive, ref, type Ref } from "vue";
import router from "@/router";
import { useAuth0 } from "@auth0/auth0-vue";
import { fetchRecipePreview, postRecipe } from "@/services/RecipeService";
import { QInput, QBtn } from "quasar";
import { useMutation, useQuery } from "vue-query";
import type { RecipePreview } from "@/models/RecipePreview";
import type { NewRecipe } from "@/models/Recipe";

const { user } = useAuth0();

const emptyRecipe: NewRecipe = {};
let newRecipe: NewRecipe = reactive(emptyRecipe);

const images: Ref<string[]> = ref([]);
const previewIsFetched = ref(false);

const { refetch, isLoading, error } = useQuery(
  ["recipePreview", newRecipe.url],
  () => fetchRecipePreview(newRecipe.url as string),
  {
    enabled: false,
    onSuccess: (data: RecipePreview) => {
      newRecipe.title = data.title;
      images.value = data.images;
      newRecipe.image = data.images[0];
      newRecipe.favicon = data.favicon ? data.favicon : undefined;

      previewIsFetched.value = true;
    },
  }
);

const addRecipeMutation = useMutation(
  (newRecipe: NewRecipe) => {
    newRecipe.userId = user.value.sub ?? "anonymous";
    return postRecipe(newRecipe);
  },
  {
    onSuccess: (recipeId) => {
      newRecipe = emptyRecipe;
      previewIsFetched.value = false;

      router.push(`/recipe/${recipeId}`);

      addRecipeMutation.reset;
    },
  }
);

async function addRecipe() {
  addRecipeMutation.mutate(newRecipe);
}
</script>
