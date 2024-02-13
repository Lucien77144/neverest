<template>
  <div id="exp" ref="experience"></div>
</template>

<script lang="js">
import Experience from './Experience/Experience.js';

let exp = null;
export default {
  name: 'WebGL',
  mounted() {
    exp = new Experience({
      targetElement: this.$refs['experience']
    });
  },
  unmounted() {
    exp.destroy();
  }
}
</script>

<style>
#exp > canvas {
  height: 100vh !important;
  width: 100vw !important;
}
</style>
