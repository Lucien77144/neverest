<template>
  <div class="audio-player" @click="toggle()">
    <client-only>
      <Vue3Lottie
        ref="lottieAnimation"
        :animationData="audioPlayer"
        :autoPlay="false"
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { MathUtils } from 'three'
import { Vue3Lottie } from 'vue3-lottie'
import audioPlayer from '~/assets/data/audioplayer.json'

// Props
const { data } = defineProps({
  data: Object,
})

// Refs
const lottieAnimation = ref<InstanceType<typeof Vue3Lottie>>()

// Consts
const audio = data?.source

// Audio Events
audio.addEventListener('ended', () => {
  lottieAnimation.value?.stop()
  lottieAnimation.value?.goToAndStop(0)
})
audio.addEventListener('play', () => {
  lottieAnimation.value?.play()
})
audio.addEventListener('pause', () => {
  lottieAnimation.value?.stop()
})

// Toggle audio
const toggle = () => {
  if (!audio) return

  if (audio.paused) {
    audio.play()
    lottieAnimation.value?.play()
  } else {
    audio.pause()
    lottieAnimation.value?.stop()
  }
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
