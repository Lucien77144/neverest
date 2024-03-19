<template>
  <div
    class="radial-progress"
    :class="{
      'radial-progress--complete': !!complete,
    }"
    :style="{
      top: `${cursor.y}px`,
      left: `${cursor.x}px`,
    }"
  >
    <svg class="radial-progress__svg" :height="radius * 2" :width="radius * 2">
      <circle
        fill="transparent"
        :stroke-dasharray="`${circumference} ${circumference}`"
        :style="`stroke-dashoffset:${offset || circumference}`"
        :stroke-width="stroke"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import type { TCursor } from '~/utils/CursorManager'

// Bus
const { $bus }: any = useNuxtApp()

// Refs
const offset = ref<number>(0)
const cursor = ref<TCursor>({ x: 0, y: 0 })

// Progression
const progress = computed(() => useHoldStore().getProgress)
const complete = computed(() => useHoldStore().getComplete)

// Params of the progress
const stroke = 8
const radius = 40
const normalizedRadius = radius - stroke * 2
const circumference = 2 * Math.PI * normalizedRadius

// Watchers
watch(progress, () => {
  offset.value = circumference - (progress.value / 100) * circumference
})

// $bus
$bus.on('mousemove', ({ position }: { position: TCursor }) => {
  cursor.value = position
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
