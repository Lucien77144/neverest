<template>
  <div ref="drag" class="DragBtn">
    <div class="DragBtn__bar"></div>
    <div
      ref="dragger"
      :style="`margin-top: ${position}px`"
      :data-position="position"
      class="DragBtn__button"
    >
      <div class="label">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import clamp from '~/utils/functions/clamp'

// Refs
const dragger = ref<HTMLElement>()
const drag = ref<HTMLElement>()
const position = ref<number>(10)

// Bus
const { $bus }: any = useNuxtApp()

// Emits
// const $emit = defineEmits(['navigate'])

/**
 * On mounted
 */
onMounted(() => {
  const dragManager = new DragManager({ el: dragger.value })

  let reset: gsap.core.Tween | undefined
  dragManager.on('drag', (e: any) => {
    reset?.kill()
    const max =
      (drag.value?.clientHeight || 0) - (dragger.value?.clientHeight || 0) / 2
    position.value = clamp(10, max, position.value + e.delta.y * -1)

    if (position.value === max) {
      // $emit('navigate')
      $bus.emit('alternativeEnd:show')
      $bus.emit('audio:conclusion')
    }
  })

  dragManager.on('dragend', (e: any) => {
    reset = gsap.to(position, {
      value: 10,
      duration: 0.5,
    })
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
