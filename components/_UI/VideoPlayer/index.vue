<template>
  <div class="video-player">
    <video ref="video" class="video-player__video" loop></video>
    <button v-if="!isPlaying" ref="play" class="video-player__play-button">Play</button>
    <button v-if="isPlaying" ref="pause"class="video-player__pause-button">Pause</button>
  </div>
</template>

<script lang="ts" setup>

// Refs
const video = ref<HTMLVideoElement | null>(null)
const play = ref<HTMLButtonElement | null>(null)
const pause = ref<HTMLButtonElement | null>(null)

const isPlaying = ref(false)

// Props
const { value } = defineProps({
  value: {
    type: Object,
    required: false,
  },
})

// Methods
const togglePlay = () => {
  if (isPlaying.value) {
    video.value?.pause()
  } else {
    video.value?.play()
  }
  isPlaying.value = !isPlaying.value
}

// On mount
onMounted(() => {
  video.value?.addEventListener('click', togglePlay)
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
