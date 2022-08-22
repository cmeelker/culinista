<template>
  <q-btn v-if="isAuthenticated" outline
    ><q-icon name="ion-person" size="sm" class="mr-3" color="dark" />{{
      user.given_name || user.nickname
    }}
    <q-menu fit class="text-center">
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup @click="logoutUser">
          <q-item-section>Uitloggen</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <LoginButton v-else />
</template>

<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import LoginButton from "./LogInButton.vue";

const { logout, isAuthenticated, user } = useAuth0();

function logoutUser() {
  logout({ returnTo: window.location.origin });
}
</script>
