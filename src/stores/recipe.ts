import { defineStore } from "pinia";
import axios from "@/services/ApiClient";

import type { Tag } from "@/models/Tag";

export const useRecipeStore = defineStore({
  id: "recipe",
  state: () => ({}),
  actions: {
    async editTags(id: number, tags: Tag[]): Promise<void> {
      const tagString = tags?.length > 0 ? tags.toString() : null;

      try {
        await axios.patch(`/Recipe/${id}`, { tags: tagString });
      } catch (error) {
        console.log(error);
      }
      //await this.fetchRecipe(id, false);
    },
  },
});
