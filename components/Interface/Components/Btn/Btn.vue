<template>
  <div class="button">
    <button :type="type" @click="$emit('click', $props.value)">
      <slot />
    </button>
  </div>
</template>

<script lang="ts" setup>
// Emits
const $emit = defineEmits(['click'])

// Props
const $props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  value: {
    type: [String, Number, Boolean],
    default: true,
  },
})
</script>

<style lang="scss" scoped>
button {
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: $white-dark;
  }
}
</style>
