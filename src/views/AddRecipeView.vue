<template>
  <div class="content">
    <div class="image"><img src="@/assets/cooking.jpg" /></div>
    <div class="text">
      <h4>Recept toevoegen</h4>
      <div class="description">
        <p>Plak hieronder de URL van</p>
        <p>het recept dat je wilt toevoegen</p>
      </div>
      <div>
        <q-input
          outlined
          v-model="url"
          placeholder="http://www.allerhande.nl/lekker-recept"
          dense
        />
      </div>
      <div>
        <q-btn
          class="button"
          flat
          :loading="loading"
          label="Recept Toevoegen"
          @click="addRecipe()"
        />
      </div>
      <div class="error">{{ error }}</div>
      <div class="sources">
        <p>Ondersteunde websites</p>
        <div class="logos"><img class="logo" src="@/assets/AH.png" /></div>
      </div>
    </div>
  </div>
  <div class="copyright">
    Illustration designed by
    <a href="http://www.freepik.com" target="_blank">pch.vector / Freepik</a>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useRecipeStore } from "@/stores/recipe";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const url = ref("");
const loading = ref(false);
const { error } = storeToRefs(useRecipeStore());
const recipeStore = useRecipeStore();

async function addRecipe() {
  loading.value = true;
  const id = await recipeStore.addRecipe(url.value);
  loading.value = false;
  if (id) {
    router.push(`/recipe/${id}`);
  }
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  margin: 0px 20px;
}

.image {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  img {
    max-width: 100%;
    margin: 10%;
  }
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 2;
  margin: 20px 80px;
  max-width: 400px;
}

h4 {
  font-weight: bold;
  margin: 20px;
}

.description {
  margin-bottom: 20px;
}

p {
  margin: 0px;
}

.button {
  background: #f2cc8f;
  margin: 5px 0px;
  width: 100%;
}

.sources {
  margin: 20px 0px;
  p {
    font-size: 13px;
  }
}

.logos {
  margin-top: 10px;
  .logo {
    max-width: 30px;
  }
}

.copyright {
  text-align: center;
  color: gray;
  font-size: 11px;
  font-weight: 100;
  a {
    color: gray;
  }
}

@media screen and (max-width: 600px) {
  .image {
    display: none;
  }

  .copyright {
    display: none;
  }

  .text {
    margin: 20px 0px;
  }
}
</style>
