import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RecipeView from "@/views/RecipeDetailView.vue";
import AddRecipeView from "@/views/AddRecipeView.vue";
import FavoriteView from "@/views/FavoriteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/recipe/:id",
      name: "recipe",
      props: (route) => ({
        recipeId: +route.params.id,
      }),
      component: RecipeView,
    },
    {
      path: "/addRecipe",
      name: "addRecipe",
      component: AddRecipeView,
    },
    {
      path: "/favourite",
      name: "favourite",
      component: FavoriteView,
    },
  ],
});

export default router;
