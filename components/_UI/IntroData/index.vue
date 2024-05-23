<template>
  <div ref="introRef" class="introData">
    {{ $t(data?.value) }}
  </div>
</template>

<script lang="ts" setup>
// Props
const { data } = defineProps({
  data: Object,
})

// Refs
const introRef = ref<HTMLElement>()

// Bus
const { $bus }: any = useNuxtApp()

$bus.on('scene:switch', () => {
  console.log('scene:switch')
  introRef.value?.classList.add('disabled')
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
