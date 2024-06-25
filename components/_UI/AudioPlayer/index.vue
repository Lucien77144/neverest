<template>
  <div
    ref="audioPlayerRef"
    :key="data?.id"
    class="audio-player"
    @click="toggle(), $bus.emit('audio:click')"
  >
    <!-- <client-only>
      <Vue3Lottie
        ref="lottieRef"
        :animationData="audioPlayer"
        :autoPlay="false"
        :speed="1 / audio.duration"
        @onLoopComplete="resetLottie"
      />
    </client-only> -->
    <svg
      class="audio-player__svg"
      width="128"
      height="48"
      viewBox="0 0 128 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 28.1905C3 37.5 3.12195 39.7143 6.4878 39.7143C13.2195 39.7143 9.85366 9.33333 14.3415 9.33333C18.8293 9.33333 15.4634 46 21.0732 46C26.6829 46 22.1951 2 27.8049 2C33.4146 2 31.1707 42.8571 35.6585 42.8571C40.1463 42.8571 39.0244 12.4762 42.3902 12.4762C45.7561 12.4762 48 32.381 48 32.381C48 32.381 49.122 43.9048 52.4878 43.9048C59.2195 43.9048 55.8537 4.72381 60.3415 4.72381C63.2883 4.72381 63 19.5 64 28.5C65 37.8095 65.122 39.7143 68.4878 39.7143C75.2195 39.7143 71.8537 9.33333 76.3415 9.33333C80.8293 9.33333 77.4634 46 83.0732 46C88.6829 46 84.1951 2 89.8049 2C95.4146 2 93.1707 42.8571 97.6585 42.8571C102.146 42.8571 101.024 12.4762 104.39 12.4762C107.756 12.4762 110 32.381 110 32.381C110 32.381 111.122 43.9048 114.488 43.9048C121.22 43.9048 117.854 4.72381 122.341 4.72381C125.288 4.72381 125 19.5 126 28.5"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
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
