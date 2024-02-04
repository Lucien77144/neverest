<template>
  <div ref="experience"></div>
</template>

<script lang="js">
import Experience from './Experience/Experience.js';

export default {
  name: 'WebGL',
  mounted() {
    const exp = new Experience({
      targetElement: this.$refs['experience']
    });
  }
}
</script>

<style>
canvas {
  height: 100vh !important;
  width: 100vw !important;
}
</style>
