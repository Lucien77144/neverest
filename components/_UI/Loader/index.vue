<template>
  <div ref="loader" class="loader t-25">
    <client-only>
      <Vue3Lottie
        ref="lottieAnimation"
        :animationData="robotJSON"
        :height="200"
        :width="200"
      />
    </client-only>
    <h1>{{ Math.floor(loadValue) }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import robotJSON from '~/assets/data/animRobot.json'

// Router
const $route = useRoute()

// Refs
const loader = ref<HTMLElement>()
const loadValue = ref<number>(0)
const lottieAnimation = ref<InstanceType<typeof Vue3Lottie>>()

// Plugins
const { $bus }: any = useNuxtApp()
$bus.on('loading', (value: number) => {
  loadValue.value = value

  // Si la valeur de chargement augmente, augmentez le temps de lecture de l'animation
  const animationDuration = lottieAnimation?.value?.getDuration() || 0
  const newFrame = (loadValue.value / 100) * animationDuration
  lottieAnimation.value?.goToAndStop(newFrame, true)

  if (loadValue.value === 100) {
    loader.value?.classList.add('disabled')
    setTimeout(() => loader.value?.remove(), 500)
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
