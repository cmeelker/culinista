<template>
  <div
    class="md:shadow-xl flex flex-col lg:flex-row w-full rounded sm:rounded-xl overflow-hidden"
  >
    <div class="basis-2/5">
      <a :href="recipe.url" target="_blank">
        <img class="h-full object-cover" :src="recipe.image" />
      </a>
    </div>
    <div class="basis-3/5">
      <div class="flex flex-col sm:flex-row w-full justify-between">
        <h1
          class="text-2xl sm:text-6xl text-bold text-dark py-4 sm:p-10 m-0 sm:mr-10 basis-4/5"
        >
          {{ recipe.title }}
        </h1>
        <div class="m-auto sm:mt-10 sm:mr-5">
          <ActionsButtons
            :recipe="props.recipe"
            @show-edit-component="showEditComponent"
          />
        </div>
      </div>
      <hr class="my-3 bg-black w-full" />

      <div class="sm:m-10">
        <TagList
          class="justify-center sm:justify-start mb-10"
          :tags="recipe.tags ?? []"
        />
        <div class="sm:flex sm:justify-between">
          <div class="flex flex-col">
            <p class="mb-0">Toegevoegd door <strong>Christa</strong></p>
            <a
              :href="recipe.url"
              target="_blank"
              class="underline underline-offset-2"
            >
              {{ recipe.url as string }}</a
            >
          </div>
          <q-btn class="bg-brand text-white mt-5 sm:mt-0" flat
            ><a :href="recipe.url" target="_blank">Bekijk recept</a></q-btn
          >
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="editingTags">
    <q-card>
      <q-card-section><h4>Tags wijzigen</h4></q-card-section>
      <q-card-section class="row items-center">
        <TagEdit
          v-if="recipe.id"
          :recipe-id="recipe.id"
          :tags="recipe.tags ?? []"
          @close-edit-component="editingTags = false"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import TagList from "@/components/tags/TagList.vue";
import TagEdit from "@/components/tags/TagEdit.vue";
import type { Recipe } from "@/models/Recipe";
import { ref } from "vue";
import ActionsButtons from "./ActionsButtons.vue";

const props = defineProps<{
  recipe: Recipe;
}>();

const editingTags = ref(false);

function showEditComponent() {
  editingTags.value = true;
}
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

.button {
  background: $primary;
  margin: 5px 0px;
  width: 100%;
  color: white;
}
</style>
