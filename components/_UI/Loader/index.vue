<template>
  <div ref="loader" class="loader t-25">
    <client-only>
      <Vue3Lottie ref="lottieAnimation" :animationData="loadingLottie" />
      <p>
        <UIIncrementator
          :target="28"
          :progress="loadValue"
        />°00′<UIIncrementator :target="26" :progress="loadValue" />″N,
        <UIIncrementator :target="86" :progress="loadValue" />°<UIIncrementator
          :target="51"
          :progress="loadValue"
        />′<UIIncrementator :target="34" :progress="loadValue" />″E
      </p>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import loadingLottie from '~/assets/data/loaderAnim.json'
import gsap from 'gsap'

// Refs
const loader = ref<HTMLElement>()
const loadValue = ref<number>(0)
const lottieAnimation = ref<InstanceType<typeof Vue3Lottie>>()
const coordRef = ref<{ current: number; target: number }[]>([])
const coord1Ref = ref<number>(0)

// Plugins
const { $bus }: any = useNuxtApp()
$bus.on('loading', (value: number) => {
  loadValue.value = value

  // If the loading value increases, increase the animation time
  const animationDuration = lottieAnimation?.value?.getDuration() || 0
  const newFrame = (loadValue.value / 100) * animationDuration
  lottieAnimation.value?.goToAndStop(newFrame, true)
})
$bus.on('loading:complete', () => {
  // On loading end
  loader.value?.classList.add('disabled')
  setTimeout(() => $bus.emit('loaded'), 300)
  setTimeout(() => loader.value?.remove(), 500)
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
