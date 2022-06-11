<template>
  <div class="content">
    <div class="tags-input">
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :autocomplete-items="autocompleteItems"
        :placeholder="'Tag zoeken'"
        :add-only-from-autocomplete="true"
        @tags-changed="(newTags: any) => (tags = newTags)"
      />
    </div>
    <div class="save">
      <q-btn flat color="brand" @click="$emit('saveTags')">Opslaan</q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueTagsInput from "@sipec/vue3-tags-input";
import { Tag } from "@/models/Tag";
import { ref } from "vue";

defineEmits(["saveTags"]);

const tag = ref("");
const tags = ref(["Snel"]);

const autocompleteItems = ref(
  Object.keys(Tag)
    .filter((v) => isNaN(Number(v)))
    .map((tag) => {
      return { text: tag };
    })
);
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  margin: auto;
  align-items: flex-end;
  max-width: 500px;
}
</style>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

.vue-tags-input {
  .ti-tag {
    position: relative;
    background: $light;
    color: black;
    border-radius: 16px;
    padding: 5px 15px 5px 15px;
  }
  .ti-input {
    border: none;
  }
}
</style>
