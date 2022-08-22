<template>
  <q-btn outline label="Log in" @click="login" />
</template>

<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect } = useAuth0();

async function login() {
  loginWithRedirect();
}
</script>
