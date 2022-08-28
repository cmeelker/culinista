<template>
  <div class="flex flex-col items-center">
    <img src="../assets/fork-knive-icon.png" width="70" class="my-6" />
    <h1 class="text-5xl font-bold mb-12">Recept toevoegen</h1>

    <InputCard
      :title="'Vul de link naar het recept in'"
      :number="1"
      :isDone="false"
      ><q-input
        class="bg-white mt-4"
        outlined
        v-model="url"
        placeholder="https://www.allerhande.nl/lekker-recept"
        dense
        color="brand"
    /></InputCard>

    <a
      class="text-grey text-xs"
      href="https://www.flaticon.com/free-icons/restaurant"
      title="restaurant icons"
      >Restaurant icons created by Freepik - Flaticon</a
    >
  </div>
</template>

<script setup lang="ts">
import InputCard from "@/components/forms/InputCard.vue";
</script>
