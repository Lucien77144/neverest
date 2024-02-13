<template>
  <Loader v-if="loadValue !== 100" :loadValue="loadValue" />
  <div id="exp" ref="experience"></div>
</template>

<script setup lang="ts">
import Experience from './Experience/Experience.js'

const loadValue = ref(0)
onMounted(() => {
  const exp: any = new Experience({
    targetElement: document.getElementById('exp'),
  })

  exp.resources.on('progress', () => {
    loadValue.value = (exp.resources.loaded / exp.resources.toLoad) * 100
  })

  onUnmounted(() => {
    exp.destroy()
  })
})
</script>

<style>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
}
</style>
