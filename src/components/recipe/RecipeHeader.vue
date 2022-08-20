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
        <div
          class="px-4 sm:px-10 flex flex-col sm:flex-row justify-between w-full"
        >
          <TagList
            class="m-auto mt-2 sm:m-0 sm:mr-4 basis-3/5"
            :tags="recipe.tags ?? []"
            @show-edit-component="showEditComponent = true"
          />
          <div class="m-auto mt-6 sm:m-0 sm:self-end w-54 text-right">
            Toegevoegd door <strong>Christa</strong>
          </div>
        </div>
      </div>
      <div
        class="sm:bg-background w-full sm:h-10 flex flex-col md:flex-row px-4 sm:px-10 justify-between items-center"
      >
        <div class="flex mx-auto mt-8 sm:m-0 order-2 sm:order-1">
          <q-btn flat disable>
            <q-icon name="ion-heart" size="sm" color="grey" />
          </q-btn>

          <q-btn flat disable>
            <q-icon name="ion-share" size="sm" color="grey" />
          </q-btn>

          <q-btn flat>
            <q-icon name="ion-create" size="sm" color="grey" />
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  @click="showEditComponent = true"
                >
                  <q-item-section>Tags wijzigen</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="deleteRecipe()">
                  <q-item-section>Recept verwijderen</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <a
          :href="recipe.url"
          target="_blank"
          class="underline underline-offset-2 m-auto md:m-0 order-1 sm:order-2"
        >
          {{ toDisplayName(recipe.source as string) }}</a
        >
      </div>
    </div>
  </div>
  <q-dialog v-model="showEditComponent">
    <q-card>
      <q-card-section><h4>Tags wijzigen</h4></q-card-section>
      <q-card-section class="row items-center">
        <TagEdit
          :recipe-id="recipe.id"
          :tags="recipe.tags ?? []"
          @close-edit-component="showEditComponent = false"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { toDisplayName } from "@/models/Source";
import TagList from "@/components/tags/TagList.vue";
import TagEdit from "@/components/tags/TagEdit.vue";
import type { Recipe } from "@/models/Recipe";
import { ref } from "vue";
import { useFavoriteStore } from "@/stores/favorite";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRecipeStore } from "@/stores/recipe";
import router from "@/router";
import { useQuasar } from "quasar";

const props = defineProps<{
  recipe: Recipe;
}>();

const favoriteStore = useFavoriteStore();
const recipeStore = useRecipeStore();
const { user } = useAuth0();
const $q = useQuasar();

const showEditComponent = ref(false);
const isFavorite = ref(true);

function toggleFavorite() {
  favoriteStore.toggleFavorite(user.value.sub as string, props.recipe.id);
}

function deleteRecipe() {
  $q.dialog({
    title: "Bevestigen",
    message: "Weet je zeker dat je dit recept wilt verwijderen?",
    persistent: true,
    ok: { label: "Oke", flat: true, color: "brand" },
    cancel: { label: "Annuleer", flat: true, color: "black" },
  }).onOk(async () => {
    await recipeStore.deleteRecipe(props.recipe.id);

    // TO DO: Error afhandeling

    $q.notify({
      message: "Recept is verwijderd",
      color: "secondary",
    });
    router.push(`/`);
  });
}
</script>
