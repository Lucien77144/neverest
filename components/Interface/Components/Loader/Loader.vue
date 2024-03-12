<template>
  <div ref="panel" class="panel">
    <h1>{{ Math.floor(loadValue) }}</h1>
  </div>
</template>

<script lang="ts" setup>
// Refs
const panel = ref<HTMLElement | null>(null)
const loadValue = ref<number>(0)

// Plugins
const { $bus }: any = useNuxtApp()
$bus.on('loading', (value: number) => {
  loadValue.value = value
  if (value === 100) {
    panel.value?.classList.add('disabled')
    setTimeout(() => panel.value?.remove(), 500)
  }
})
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
