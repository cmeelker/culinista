<template>
  <div class="container">
    <div class="title"><h5>Boodschappen</h5></div>
    <div class="servings">
      <p>{{ servings }} personen</p>
    </div>
    <div class="ingredients">
      <div class="ingredient" v-for="index in ingredients.length" :key="index">
        <div class="checkboxes">
          <p>
            <q-checkbox
              class="checkbox"
              v-model="checkboxes[index - 1]"
              dense
              checked-icon="ion-checkbox-outline"
              unchecked-icon="ion-square-outline"
              color="grey-7"
            />
          </p>
        </div>
        <div class="unit">
          <p>
            {{ ingredients[index - 1].unit }}
          </p>
        </div>
        <div class="name">
          <p>
            {{ ingredients[index - 1].name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IngredientUnit } from "@/models/Recipe";
import { ref } from "vue";

const props = defineProps<{
  ingredients: IngredientUnit[];
  servings: number;
}>();

const checkboxes = ref(props.ingredients.map((_) => false));
</script>

<style scoped lang="scss">
.container {
  margin-right: 50px;
}
.title {
  h5 {
    margin: 0px 0px 15px 0px;
    font-weight: 500;
  }
  border-bottom: 1px solid black;
}

.servings {
  margin-top: 10px;
  text-align: center;
  display: inline-block;
  p {
    background-color: #f2da37;
    padding: 5px;
  }
}

.ingredients {
  display: flex;
  flex-direction: column;
}

.ingredient {
  display: flex;
  p {
    margin-bottom: 0px;
  }
  margin-bottom: 7px;
}

.checkbox {
  flex: 1;
}

.unit {
  width: 60px;
  margin: 0px 20px;
}

.name {
  flex: 3;
}

@media screen and (max-width: 600px) {
  .container {
    margin-right: 0px;
    margin-bottom: 20px;
  }
}
</style>
