<template>
  {{ formatCoord((target / 100) * progress) }}
</template>

<script lang="ts" setup>
// Props
const { target } = defineProps({
  target: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
})

const formatCoord = (value: number = 0) => {
  value = Math.floor(value)
  return value < 10 ? `0${value}` : `${value}`
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
