<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ title }}</div>
      <q-space />
      <q-btn icon="ion-close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      Om gebruik te kunnen maken van {{ title.toLocaleLowerCase() }} moet je
      ingelogd zijn.
      <div class="text-center mt-10 w-full">
        <LoginButton />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import LoginButton from "@/components/buttons/LogInButton.vue";

defineProps<{
  title: string;
}>();
</script>
