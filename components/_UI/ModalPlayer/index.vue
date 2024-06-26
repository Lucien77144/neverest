<template>
  <div
    ref="modalPlayerRef"
    :key="data?.id"
    class="modal-player"
    @click="toggle(), $bus.emit('audio:click')"
  >
    <div class="modal-player__container">
      <client-only>
        <Vue3Lottie
          ref="lottieRef"
          :animationData="modalAnimation"
          :autoPlay="true"
          :loop="true"
        />
      </client-only>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import modalAnimation from '~/assets/data/modalAnim.json'

// Props
const { data } = defineProps({
  data: Object,
})

// Refs
const lottieRef = ref<InstanceType<typeof Vue3Lottie>>()
const modalPlayerRef = ref<HTMLElement>()
const isOpen = ref(false)
const flag = ref(false)

// Bus
const { $bus }: any = useNuxtApp()

// Toggle audio
const toggle = () => {
  if (flag.value) return
  flag.value = true

  isOpen.value = !isOpen.value
  $bus.emit('modal:toggle', isOpen.value ? data : null)
}

// Event listeners
$bus.on('modal:destroy', () => {
  isOpen.value = false
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
