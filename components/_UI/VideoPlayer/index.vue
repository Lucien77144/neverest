<template>
  <div
    ref="videoPlayer"
    class="video-player"
    @click="togglePlay()"
    @mouseenter="animateEnter"
    @mousemove="animate"
  >
    <div ref="videoWrapper" class="video-player__wrapper"></div>
    <div ref="glow" class="video-player__glow"></div>
    <button v-if="!isPlaying" ref="play" class="video-player__play-button">
      <img class="video-player__icon" src="/assets/img/Play.svg" alt="" />
    </button>
    <button v-if="isPlaying" ref="pause" class="video-player__pause-button">
      <img class="video-player__icon" src="/assets/img/Pause.svg" alt="" />
    </button>
  </div>
</template>

<script lang="ts" setup>
// Bus
const { $bus }: any = useNuxtApp()

// Refs
const videoPlayer = ref<HTMLDivElement>()
const videoWrapper = ref<HTMLDivElement>()
const play = ref<HTMLButtonElement>()
const pause = ref<HTMLButtonElement>()
const glow = ref<HTMLDivElement>()

const isPlaying = ref(false)
const bounds = ref<DOMRect | null>(null)

interface Props {
  value: HTMLVideoElement
}

// Props
const { value } = defineProps<Props>()

// Methods
const togglePlay = () => {
  isPlaying.value ? value?.pause() : value?.play()
  isPlaying.value = !isPlaying.value
}

const animateEnter = () => {
  bounds.value = videoPlayer.value?.getBoundingClientRect() ?? null
}

const animate = (e: any) => {
  if (!videoPlayer.value || !glow.value || !bounds.value) return

  const leftX = e.clientX - bounds.value.x
  const topY = e.clientY - bounds.value.y
  const center = {
    x: leftX - bounds.value.width / 2,
    y: topY - bounds.value.height / 2,
  }

  glow.value.style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.value.width / 2}px
      ${center.y * 2 + bounds.value.height / 2}px,
      #ffffff22,
      #0000000f
    )
  `
}

// On mount
onMounted(() => {
  videoWrapper.value?.appendChild(value)
  value.style.width = '100%'

  $bus.on('audio:mute', () => {
    value.muted = true
  })

  $bus.on('audio:unmute', () => {
    value.muted = false
  })

  value.addEventListener('ended', () => {
    isPlaying.value = false
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
