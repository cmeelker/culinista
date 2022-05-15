<template>
  <div class="container">
    <div class="title"><h5>Bereidingswijze</h5></div>
    <div class="instruction" v-for="index in instructions.length" :key="index">
      <div class="number">{{ index }}.</div>
      <div class="text">{{ instructions[index - 1] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  instructions: string[];
}>();
</script>

<style scoped lang="scss">
.title {
  h5 {
    margin: 0px 0px 15px 0px;
    font-weight: 500;
  }
  border-bottom: 1px solid black;
}

.instruction {
  display: flex;
  margin: 20px 0px;
}

.number {
  font-size: 30px;
  margin-right: 20px;
  font-weight: 100;
}

.text {
  padding-top: 5px;
}
</style>
