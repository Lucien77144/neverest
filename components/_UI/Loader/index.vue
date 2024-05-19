<template>
  <div ref="loader" class="loader t-25">
    <client-only>
      <Vue3Lottie ref="lottieAnimation" :animationData="loadingLottie" />
    </client-only>
    <h1>{{ Math.floor(loadValue) }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import loadingLottie from '~/assets/data/loader.json'

// Refs
const loader = ref<HTMLElement>()
const loadValue = ref<number>(0)
const lottieAnimation = ref<InstanceType<typeof Vue3Lottie>>()

// Plugins
const { $bus }: any = useNuxtApp()
$bus.on('loading', (value: number) => {
  loadValue.value = value

  // If the loading value increases, increase the animation time
  const animationDuration = lottieAnimation?.value?.getDuration() || 0
  const newFrame = (loadValue.value / 100) * animationDuration
  lottieAnimation.value?.goToAndStop(newFrame, true)

  // On loading end
  if (loadValue.value === 100) {
    loader.value?.classList.add('disabled')
    setTimeout(() => loader.value?.remove(), 500)
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
