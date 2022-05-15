import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Homeview.vue";
import RecipeView from "@/views/Recipeview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/recipe/:id",
      name: "recipe",
      component: RecipeView,
    },
  ],
});

export default router;
