<template>
  <div id="webgl-css-wrapper">
    <WebGLCSS2DRenderer />
    <WebGLCSS3DRenderer />
  </div>
  <canvas ref="canvasRef" class="canvas" />
  <div id="webgl-interface">
    <UIInterestData />
    <UITitle />
  </div>
</template>

<script setup lang="ts">
import Experience from '~/webgl/Experience'

// Shallow Refs
const exp = shallowRef<Experience | null>(null)

// Refs
const canvasRef = ref<HTMLElement | null>(null)

// Route
const route = useRoute()

// On component mounted, create the experience
onMounted(() => {
  exp.value = new Experience({
    canvas: canvasRef.value,
    baseScene: route.query.scene,
  })

  // On component unmounted, dispose the experience
  onUnmounted(() => {
    exp.value?.dispose()
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
