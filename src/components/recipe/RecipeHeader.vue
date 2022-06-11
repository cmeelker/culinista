<template>
  <div class="image"><img :src="recipe.image" /></div>
  <div class="title-area">
    <div class="title">
      <h3>{{ recipe.title }}</h3>
    </div>
    <div class="tags">
      <TagList
        :class="{ hide: showEditComponent }"
        :tags="[Tag.Gezond, Tag.Bakken]"
        @show-edit-component="showEditComponent = true"
      />
      <TagEdit
        :class="{ hide: !showEditComponent }"
        @save-tags="showEditComponent = false"
      />
    </div>
    <div class="source">
      <div class="source-title">
        <a :href="recipe.url" target="_blank">
          {{ toDisplayName(recipe.source as string) }}</a
        >
      </div>
      <div class="source-logo"><img src="@/assets/AH.png" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toDisplayName } from "@/models/Source";
import TagList from "@/components/tags/TagList.vue";
import TagEdit from "@/components/tags/TagEdit.vue";
import type { Recipe } from "@/models/Recipe";
import { Tag } from "@/models/Tag";
import { ref } from "vue";

defineProps<{
  recipe: Recipe;
}>();

const showEditComponent = ref(false);
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
}

.source-logo {
  margin-left: 5px;
  img {
    max-width: 30px;
  }
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
</style>
