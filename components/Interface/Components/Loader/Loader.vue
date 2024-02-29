<template>
  <div class="panel">
    <h1>{{ Math.floor(loadValue) }}</h1>
  </div>
</template>

<script lang="ts" setup>
// Ref
const loadValue = ref<number>(0)

// Emits
const $emit = defineEmits(['start'])

// Refs
const counter = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)

// On component mounted, get the experience
onMounted(() => {
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

// Watch if loadValue ends
// watch(
//   () => props.loadValue == 100,
//   () => {
//     // Disable the counter and enable the actions panel
//     counter.value?.classList.add('disabled')
//     setTimeout(() => {
//       counter.value?.remove()
//       panel.value?.classList.remove('disabled')
//     }, 500)
//   }
// )
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  color: $white;
  font-size: 5rem;
}
.panel {
  z-index: 1000;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  transition: 0.5s ease-in-out;

  &.disabled {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
