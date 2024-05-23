<template>
  <div :key="data?.id" class="audio-player" @click="toggle()">
    <client-only>
      <Vue3Lottie
        ref="lottieRef"
        :animationData="audioPlayer"
        :autoPlay="false"
        :speed="1 / audio.duration"
        @onLoopComplete="resetLottie"
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { Vue3Lottie } from 'vue3-lottie'
import audioPlayer from '~/assets/data/audioplayer.json'

// Props
const { data } = defineProps({
  data: Object,
})

// Const
const audio = data?.source

// Refs
const lottieRef = ref<InstanceType<typeof Vue3Lottie>>()
const audioEnd = ref(true)

// Reset the lottie animation
const resetLottie = () => {
  const to = { value: lottieRef.value?.getDuration() || 1 }
  gsap.to(to, {
    duration: 0.25,
    ease: 'power2.inOut',
    value: 0,
    onUpdate: () => lottieRef.value?.goToAndStop(to.value),
  })
}

// Audio Events
audio.addEventListener('play', () => {
  if (audioEnd.value) lottieRef.value?.goToAndStop(1)
  audioEnd.value = false

  lottieRef.value?.play()
})
audio.addEventListener('pause', () => lottieRef.value?.pause())
audio.addEventListener('ended', () => {
  audioEnd.value = true
})

// Toggle audio
const toggle = () => (audio?.paused ? audio?.play() : audio?.pause())

// On mounted
onMounted(() => lottieRef.value?.setSpeed(1 / audio.duration))
</script>

<style src="./style.scss" lang="scss" scoped></style>
