<template>
  <div class="video-player">
    <!-- <video ref="video" class="video-player__video" loop></video> -->
    <div ref="videoWrapper" @click="togglePlay()"></div>

    <button v-if="!isPlaying" ref="play" class="video-player__play-button">
      Play
    </button>
    <button v-if="isPlaying" ref="pause" class="video-player__pause-button">
      Pause
    </button>
  </div>
</template>

<script lang="ts" setup>
// Refs
const videoWrapper = ref<HTMLDivElement>()
const play = ref<HTMLButtonElement>()
const pause = ref<HTMLButtonElement>()

const isPlaying = ref(false)

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

// On mount
onMounted(() => {
  videoWrapper.value?.appendChild(value)
  value.loop = true
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
