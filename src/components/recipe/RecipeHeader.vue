<template>
  <div class="image"><img :src="recipe.image" /></div>
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
  </div>
</template>

<script lang="ts" setup>
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

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

.hide {
  display: none;
}

.image {
  border-radius: 10px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  img {
    border-radius: 10px;
    max-width: 100%;
  }
}

.title-area {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
h3 {
  margin: 10px;
  font-weight: 500;
}

.title {
  margin-bottom: 10px;
}

.tags {
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.source {
  margin: 5px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-underline-offset: 5px;
    color: #384789;
  }
}

.source-logo {
  margin-right: 10px;
  img {
    max-width: 30px;
  }
}

.q-icon {
  &:hover {
    cursor: pointer;
  }
}

.q-icon {
  color: $primary;
}

@media screen and (max-width: 600px) {
  h3 {
    font-size: 25px;
    margin: 0px;
    line-height: 1.8rem;
  }

  .image {
    img {
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 800px) {
  h3 {
    font-size: 32px;
    margin: 0px;
    line-height: 1.8rem;
  }
}
</style>
