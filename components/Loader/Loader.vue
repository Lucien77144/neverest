<script lang="ts" setup>
defineProps<{
  loadValue: number
}>()
</script>

<template>
  <div class="loader">
    <h1>{{ Math.floor(loadValue) }}</h1>
  </div>
</template>

<style>
.loader {
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  h1 {
    margin: 0;
    color: white;
    font-family: 'Lato', sans-serif;
    font-size: 5rem;
  }
}
</style>
