<template>
  <div id="webgl" ref="wegbl"></div>
</template>

<script lang="js">
import Experience from './Experience/Experience.js';

export default {
  name: 'WebGL',
  mounted() {
    const exp = new Experience(this.$refs['wegbl']);
  }
}
</script>

<style scoped>
canvas {
  height: 100vh;
  width: 100vw;
}
</style>
