import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RecipeView from "@/views/RecipeDetailView.vue";
import AddRecipeView from "@/views/AddRecipeView.vue";
import FavoriteView from "@/views/FavoriteView.vue";
import { authGuard } from "@auth0/auth0-vue";

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
      path: "/add-recipe",
      name: "addRecipe",
      component: AddRecipeView,
      beforeEnter: authGuard,
    },
    {
      path: "/favorite",
      name: "favorite",
      component: FavoriteView,
      beforeEnter: authGuard,
    },
  ],
});

export default router;
