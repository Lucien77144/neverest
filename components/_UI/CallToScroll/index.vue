<template>
  <div class="call-to-scroll hidden" ref="callToScrollRef">
    <div class="lottie">
      <client-only>
        <Vue3Lottie
          ref="lottieRef"
          :animationData="callToScroll"
          :autoPlay="true"
          :loop="true"
        />
      </client-only>
    </div>
    <h6 class="label">
      {{ $t('SCROLL') }}
    </h6>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import callToScroll from '~/assets/data/callToScroll.json'

// Refs
const lottieRef = ref<InstanceType<typeof Vue3Lottie>>()
const callToScrollRef = ref<HTMLElement>()

// Bus
const { $bus }: any = useNuxtApp()

$bus.on('audio:start', () => {
  setTimeout(() => {
    callToScrollRef.value?.classList.remove('hidden')
  }, 1000)
})

$bus.on('callScroll:stop', () => {
  callToScrollRef.value?.classList.add('hidden')
  $bus.off('callScroll:stop')
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
