<template>
  <div ref="btn" :class="big && 'big', disable && isDisabled && 'disabled'" class="iconBtn">
    <button :type="type" :disable="disable" :isDisabled="isDisabled" @click="$emit('click', $props.value)">
      <slot />
    </button>
  </div>
</template>

<script lang="ts" setup>
// Emits
const $emit = defineEmits(['click'])

// Refs
const btn = ref<HTMLButtonElement | null>(null)

// Props
const $props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  disable: {
    type: Boolean,
    default: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  big: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: true,
  },
})

/**
 * Toggle disabled class
 */
function toggleDisabled() {
  btn.value?.classList.toggle('disabled')
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
