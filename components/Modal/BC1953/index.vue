<template>
  <div class="modal" style="overflow: scroll;">
    <section class="modal__scroll">
      <div class="modal__scroll__wrapper">
        <div class="modal__scroll__lottie">
          <client-only>
            <Vue3Lottie
              ref="lottieRef"
              :animationData="scrollAnimation"
              :autoPlay="true"
              :loop="true"
            />
          </client-only>
        </div>
        <div class="title__wrapper">
          <div
            class="title__mask"
            :style="{
              width: `${scrollTitleValue || 0}%`,
            }"
          >
            <h2 class="title">SROLL TO EXPLORE</h2>
          </div>
          <h2 class="title">SROLL TO EXPLORE</h2>
        </div>
        <p class="modal__scroll__text">
          Participer à la première ascension à travers les archives de 1953
        </p>
      </div>
    </section>
    <section class="modal__content">
      <!-- <article v-for="c in data">
        {{ c.type }}
      </article> -->
      <div style="height: 300px; width: 200px;">
        <UIVideoPlayer url="/video/gniii.mp4" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ScrollManager } from '#imports'
import { Vue3Lottie } from 'vue3-lottie'
import scrollAnimation from '~/assets/data/scroll.json'
import clamp from '~/utils/functions/clamp'

// Refs
const data = ref<any>(null)
const scrollManager = ref<ScrollManager | null>(null)
const scrollValue = ref<TScrollEvent>()
const scrollTitleValue = ref<number>(0)

// On mount
onMounted(() => {
  scrollManager.value = new ScrollManager({
    factor: 4,
  })
  scrollManager.value.on('scroll', (val: TScrollEvent) => {
    scrollValue.value = val
    scrollTitleValue.value += val.delta / 100
    scrollTitleValue.value = clamp(0, 100, scrollTitleValue.value)
  })
})

// On unmount
onUnmounted(() => {
  scrollManager.value?.off('scroll')
  scrollManager.value?.destroy()
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
