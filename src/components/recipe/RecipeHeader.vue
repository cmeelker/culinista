<template>
  <div class="image"><img src="@/assets/food.jpg" /></div>
  <div class="title-area">
    <div class="title">
      <h3>{{ recipe.title }}</h3>
    </div>
    <div class="labels">
      <q-badge rounded color="" :label="recipe.labels" />
    </div>
    <div class="source">
      <div class="source-title">
        {{ toDisplayName(recipe.source as string) }}
      </div>
      <div class="source-logo"><img src="@/assets/AH.png" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toDisplayName } from "@/models/Source";
import type { Recipe } from "@/models/Recipe";

defineProps<{
  recipe: Recipe;
}>();
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";

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

.labels {
  margin: 5px;
  .q-badge {
    color: black;
    background-color: $light;
    padding: 5px 20px 5px 20px;
  }
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
