<template>
  <div ref="loaderRef">
    <Loader :loadValue="loadValue" />
  </div>
  <div ref="expRef" class="exp hidden"></div>
</template>

<script setup lang="ts">
import Experience from './Experience/Experience.js'
import gsap from 'gsap'

const loadValue = ref(0)

const expRef = ref<HTMLElement | null>(null)
const loaderRef = ref<HTMLElement | null>(null)

// Set opacity with gsap
const setOpacity = (ref: Ref, opacity: number) => {
  gsap.to(ref.value, {
    opacity,
    duration: 1,
    ease: 'power2.easeInOut',
    onComplete: () => {
      if (opacity === 0) {
        ref.value?.remove()
      }
    },
  })
}

// On component mounted, create the experience
onMounted(() => {
  const exp = new Experience({
    targetElement: expRef.value,
  })
  const resources: any = exp.resources

  // On resources progress, update loadValue
  resources.on('progress', () => {
    gsap.timeline().to(loadValue, {
      value: (resources.loaded / resources.toLoad) * 100,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        if (loadValue.value === 100) {
          setOpacity(expRef, 1)
          setOpacity(loaderRef, 0)
        }
      },
    })
  })

  // On component unmounted, destroy the experience
  onUnmounted(() => {
    exp.destroy()
  })
})
</script>

<style>
.exp > canvas {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
}
.hidden {
  opacity: 0;
}
</style>
