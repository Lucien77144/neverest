<script setup lang="ts">
// Props
const props = defineProps({
  error: Object,
})

if (props?.error?.url != '/' && props?.error?.statusCode == 404) {
  window.location.href = '/'
}
</script>

<template>
  <div class="error">
    <div class="error-wrapper">
      <h1 class="error-title">{{ props?.error?.statusCode }}</h1>
      <p class="error-message">{{ props?.error?.message }}</p>
      <small class="error-stack" v-html="props?.error?.stack"></small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $black;
  color: $white;
  font-family: 'Lato', sans-serif;
  font-weight: light;

  &-wrapper {
    max-width: 50%;
  }

  &-title,
  &-message {
    text-align: center;
    margin: 0;
  }
  &-title {
    font-size: 8rem;
  }
  &-message {
    font-size: 1.5rem;
  }
  &-stack {
    margin-top: 2rem;
    width: 100%;
    display: block;
    overflow: auto;
  }
}
</style>
