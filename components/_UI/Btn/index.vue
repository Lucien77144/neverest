<template>
  <div class="button">
    <button :type="type" @click="$emit('click', $props.value), $bus.emit('audio:click')">
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
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
