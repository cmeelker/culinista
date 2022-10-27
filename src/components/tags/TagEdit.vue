<template>
  <div class="tags-edit-content">
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
      <q-btn
        flat
        color="brand"
        @click="
          $emit('closeEditComponent');
          saveTags();
        "
        >Opslaan</q-btn
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VueTagsInput } from "@sipec/vue3-tags-input";
import { Tag } from "@/models/Tag";
import { ref } from "vue";
import { patchTags } from "@/services/RecipeService";
import { QBtn } from "quasar";
import { useMutation, useQueryClient } from "vue-query";

const queryClient = useQueryClient();

defineEmits(["closeEditComponent"]);
const props = defineProps<{
  recipeId: number;
  tags: Tag[];
}>();

const tag = ref("");
const tags = ref(
  props.tags.map((tag) => {
    return { text: tag };
  })
);

const autocompleteItems = ref(
  Object.keys(Tag)
    .filter((v) => isNaN(Number(v)))
    .map((tag) => {
      return { text: tag };
    })
);

const { mutate } = useMutation(
  (data: { recipeId: number; tags: Tag[] }) => {
    return patchTags(data);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["recipe", props.recipeId]);
    },
  }
);

async function saveTags() {
  const tagList = tags.value.map((tag) => {
    return tag.text;
  });

  mutate({ recipeId: props.recipeId, tags: tagList });
}
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

.tags-edit-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
}

.vue-tags-input {
  .ti-tag {
    position: relative;
    background: $light;
    color: black;
    border-radius: 16px;
    padding: 5px 20px 5px 20px;
  }
  .ti-input {
    border: none;
  }

  .ti-item.ti-selected-item {
    background: $background;
    color: black;
  }
}
</style>
