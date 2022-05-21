<template>
  <div class="recipe">
    <div class="container-card">
      <div class="image"><img src="@/assets/food.jpg" /></div>
      <div class="labels">
        <div class="label">
          <q-badge rounded color="" :label="props.recipe.labels" />
        </div>
      </div>
      <div class="title-row">
        <div class="title">{{ props.recipe.title }}</div>
        <div class="logo"><img src="@/assets/AH.png" /></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "@/models/Recipe";

const props = defineProps<{
  recipe: Recipe;
}>();
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
.recipe {
  :hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
  }
}

.container-card {
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 230px;
  border-bottom: 1px solid #eeedec;
  :hover {
    box-shadow: none;
  }
}

.image {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  img {
    max-width: 100%;
  }
}

.labels {
  height: 30px;
  display: flex;
  margin: 10px 10px 5px 10px;
  .label {
    margin-right: 7px;
    padding: 0px;
    .q-badge {
      color: black;
      background-color: $light;
      padding: 5px 20px 5px 20px;
    }
  }
}

.title-row {
  margin: 0px 10px 10px 10px;
  display: flex;
  align-items: center;
}

.title {
  flex: 7;
  font-weight: bold;
}

.logo {
  flex: 1;
  margin-left: 5px;
  img {
    max-width: 90%;
  }
}
</style>
