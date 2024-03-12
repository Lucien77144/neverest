<template>
  <canvas ref="canvas" class="exp" />
</template>

<script setup lang="ts">
import gsap from 'gsap'
import Experience from '~/webgl/Experience'

// Plugins
const { $bus }: any = useNuxtApp()

// Shallow Refs
const exp = shallowRef<Experience | null>(null)

// Refs
const loadValue = ref<number>(0)
const canvas = ref<HTMLElement | null>(null)

// Route
const route = useRoute()

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
      onUpdate: () => {
        $bus.emit('loading', loadValue.value)
        if (loadValue.value === 100) {
          exp.value?.start()
        }
      },
    })
  })

  // On component unmounted, dispose the experience
  onUnmounted(() => {
    exp.value?.dispose()
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
