<template>
  <UILoader />
  <div ref="interfaceRef" class="interface">
    <UIRadialProgress />
    <div class="panel">
      <UISubtitle />
      <NextScene />
      <UIProgressBar />
      <UIInputControl />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Refs
const interfaceRef = ref<HTMLElement | null>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:init', () => {
  if (interfaceRef.value) {
    interfaceRef.value.classList.add('hidden')
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
