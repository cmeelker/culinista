<template>
  <div class="flex flex-col items-center sm:mx-20 mx-2">
    <img src="../assets/fork-knive-icon.png" width="70" class="my-6" />
    <h1 class="text-2xl sm:text-5xl font-bold mb-12">Recept toevoegen</h1>

    <InputCard
      class="mb-10"
      :title="'Vul de link naar het recept in'"
      :number="1"
      :isDone="fetchedPreview"
      ><q-input
        class="bg-white mt-4"
        outlined
        v-model="url"
        placeholder="https://www.allerhande.nl/lekker-recept"
        dense
        color="brand"
        :disable="fetchedPreview"
      />
    </InputCard>

    <div
      v-if="!fetchedPreview"
      :class="{ 'px-5 py-1 mb-5 -mt-5': error, 'border-none': !error }"
      class="bg-red-100 rounded border border-red-300"
    >
      {{ error }}
    </div>

    <q-btn
      v-if="!fetchedPreview"
      unelevated
      color="brand"
      text-color="white"
      label="Zoek recept"
      class="mb-10"
      :loading="loading"
      :disable="!url"
      @click="fetchPreview"
    />

    <div v-if="fetchedPreview" class="flex flex-col w-full space-y-10 mb-10">
      <InputCard :title="'Titel'" :number="2" :isDone="fetchedPreview"
        ><q-input
          class="bg-white mt-4"
          outlined
          v-model="title"
          placeholder="https://www.allerhande.nl/lekker-recept"
          dense
          color="brand"
      /></InputCard>
      <InputCard
        :title="'Kies een afbeelding'"
        :number="3"
        :isDone="selectedImage !== ''"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          <div v-for="image in images" :key="image">
            <ImagePicker
              :image="image"
              :isSelected="selectedImage === image"
              @select-image="selectedImage = image"
            />
          </div>
        </div>
      </InputCard>
    </div>

    <q-btn
      v-if="fetchedPreview"
      unelevated
      color="brand"
      text-color="white"
      label="Recept toevoegen"
      class="mb-10"
      :loading="loading"
      :disable="!url"
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
import { useRecipeStore } from "@/stores/recipe";
import { storeToRefs } from "pinia";
import { ref, type Ref } from "vue";

const recipeStore = useRecipeStore();
const { error } = storeToRefs(useRecipeStore());

const fetchedPreview = ref(false);
const loading = ref(false);

const url = ref(
  "https://www.eatwell101.com/garlic-mushrooms-cauliflower-recipe?pp=1"
);
const title = ref("");
const images: Ref<string[]> = ref([]);
const selectedImage = ref("");

async function fetchPreview() {
  loading.value = true;

  const recipePreview = await recipeStore.fetchRecipePreview(url.value);
  if (recipePreview) {
    title.value = recipePreview.title;
    images.value = recipePreview.images;
    selectedImage.value = recipePreview.images[0];

    fetchedPreview.value = true;
  }
  loading.value = false;
}

async function addRecipe() {
  loading.value = true;

  await recipeStore.addRecipe({
    title: title.value,
    url: url.value,
    image: selectedImage.value,
  });

  loading.value = false;

  // if (id) {
  //   router.push(`/recipe/${id}`);
  // }
}
</script>
