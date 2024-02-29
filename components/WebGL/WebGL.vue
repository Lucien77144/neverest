<template>
  <canvas ref="canvas" class="exp t-25" style="opacity: 0" />
</template>

<script setup lang="ts">
import Experience from './Experience/Experience.js'
import gsap from 'gsap'

// Shallow Refs
// const exp = shallowRef<Experience | null>(null)

// Refs
const loadValue = ref<number>(0)
const canvas = ref<HTMLElement | null>(null)
const loader = ref<HTMLElement | null>(null)

// Route
const route = useRoute()

/**
 * Start the experience
 */
const startExperience = () => {
  canvas.value?.style.setProperty('opacity', '1')
  loader.value?.style.setProperty('opacity', '0')
  exp.value?.start()

  // Remove the loader after transition
  setTimeout(() => loader.value?.remove(), 250)
}

// On component mounted, create the experience
onMounted(() => {
  exp.value = new Experience({
    canvas: canvas.value,
    baseScene: route.query.scene,
  })

  // On resources progress, update loadValue
  const resources: any = exp.value.resources
  resources.on('progress', () => {
    gsap.timeline().to(loadValue, {
      value: (resources.loaded / resources.toLoad) * 100,
      duration: 1,
      ease: 'power2.inOut',
    })
  })

  // On component unmounted, dispose the experience
  onUnmounted(() => {
    exp.value?.dispose()
  })
})
</script>

<style lang="scss" scoped>
.exp {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
}
</style>
