<template>
  <div ref="drag" class="DragBtn">
    <div class="DragBtn__bar"></div>
    <div class="DragBtn__button">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'

// Refs
const drag = ref<HTMLElement | null>()

// Emits
const $emit = defineEmits(['navigate'])

// Props
const { value } = defineProps({
  value: {
    type: [String, Number, Boolean],
    default: true,
  },
})

/**
 * On mounted
 */
onMounted(() => {
  gsap.registerPlugin(Draggable)

  Draggable.create('.DragBtn__button', {
    type: 'y',
    bounds: '.DragBtn',
    onDragEnd: function () {
      if (this.y > 110) {
        $emit('navigate', value)

        gsap.to('.DragBtn', {
          top: -100,
          opacity: 0,
          duration: 1,
          onComplete: () => {
            gsap.set('.DragBtn', { opacity: 1, top: 0 })
            gsap.set('.DragBtn__button', { y: 0 })
          },
        })
      } else {
        gsap.to('.DragBtn__button', { y: 0, duration: 0.5 })
      }
    },
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
