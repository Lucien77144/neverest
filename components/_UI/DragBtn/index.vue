<template>
  <div class="DragBtn">
    <div class="DragBtn__bar"></div>
    <div class="DragBtn__button">Drag</div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'

const $emit = defineEmits(['navigate'])

onMounted(() => {
  gsap.registerPlugin(Draggable)

  Draggable.create('.DragBtn__button', {
    type: 'y',
    bounds: '.DragBtn',
    onDragEnd: function () {
      if (this.y > 110) {
        // Suppose que 110 est la position de fin souhaitée
        console.log("Bouton glissé jusqu'au bout !")
      } else {
        console.log("Le bouton n'a pas été glissé jusqu'au bout.")
        $emit('navigate')
      }
    },
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
