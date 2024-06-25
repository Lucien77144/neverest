<template>
  <div
    ref="audioPlayerRef"
    :key="data?.id"
    class="audio-player"
    @click="toggle(), $bus.emit('audio:click')"
  >
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
import { Vue3Lottie } from 'vue3-lottie'
import audioPlayer from '~/assets/data/audioplayer.json'

// Store
const setCues = useSubtitlesStore().setCues

// Props
const { data } = defineProps({
  data: Object,
})

// Const
const audio = data?.source

// Refs
const lottieRef = ref<InstanceType<typeof Vue3Lottie>>()
const audioEnd = ref(true)
const audioPlayerRef = ref<HTMLElement>()
const isPaused = ref(true)

// Bus
const { $bus }: any = useNuxtApp()

$bus.on('scene:switch', () => audioPlayerRef.value?.classList.add('hidden'))
$bus.on('audio-voix-off:muteAll', () => {
  audio.pause()

  // if (!isPaused.value) {
  audio.currentTime = 0
  lottieRef.value?.goToAndStop(0)
  // }
})

// Reset the lottie animation
const resetLottie = () => {
  audio.pause()
  lottieRef.value?.goToAndStop(1)
  audio.currentTime = 0
}

// Fade in/out the audio volume
const fadeAudio = (
  audio: HTMLAudioElement,
  duration: number,
  targetVolume: number
) => {
  const volume = audio.volume
  const steps = 50
  const stepDuration = duration / steps
  const stepVolume = (targetVolume - volume) / steps

  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      audio.volume = volume + stepVolume * i
    }, stepDuration * i)
  }
}

// Audio Events
audio.addEventListener('play', () => {
  audioEnd.value = false

  lottieRef.value?.play()
})
audio.addEventListener('pause', () => {
  lottieRef.value?.pause()
  isPaused.value = true
  setCues([])
})
audio.addEventListener('ended', () => {
  audioEnd.value = true
  setCues([])
})

// Toggle audio
const toggle = () =>
  audio?.paused
    ? ($bus.emit('audio-voix-off:muteAll'), audio?.play())
    : (lottieRef.value?.goToAndStop(0), audio?.pause())

// On mounted
onMounted(() => lottieRef.value?.setSpeed(1 / audio.duration))
</script>

<style src="./style.scss" lang="scss" scoped></style>
