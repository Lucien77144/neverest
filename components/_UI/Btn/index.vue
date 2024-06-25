<template>
  <div class="button">
    <button :class="secondary && 'secondary', round && 'round', inverse && 'inverse'" :type="type" @click="$emit('click', $props.value), $bus.emit('audio:click')">
      <img id="bg1" class="bg" src="/assets/img/btnBg.svg" alt="">
      <img id="bg2" class="bg" src="/assets/img/btnBgWhite.svg" alt="">
      <slot />
    </button>
  </div>
</template>

<script lang="ts" setup>
// Emits
const $emit = defineEmits(['click'])

// Bus
const { $bus }: any = useNuxtApp()

// Props
const $props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  value: {
    type: [String, Number, Boolean],
    default: true,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  inverse: {
    type: Boolean,
    default: false,
  },
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
