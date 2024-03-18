<template>
  <div ref="loader" class="loader t-25">
    <h1>{{ Math.floor(loadValue) }}</h1>
  </div>
</template>

<script lang="ts" setup>
// Router
const $route = useRoute()

// Refs
const loader = ref<HTMLElement | null>(null)
const loadValue = ref<number>(0)

// Plugins
const { $bus }: any = useNuxtApp()
$bus.on('loading', (value: number) => {
  loadValue.value = value
  if (value === 100) {
    loader.value?.classList.add('disabled')
    setTimeout(() => loader.value?.remove(), 500)
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
