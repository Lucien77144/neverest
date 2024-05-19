<template>
  <div class="modal" v-if="data">
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
          <div class="title__mask">
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
      <article v-for="c in data">
        {{ c.type }}
      </article>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import scrollAnimation from '~/assets/data/scroll.json'

export type ModalData = {
  type: 'text' | 'image' | 'video' | 'audio'
  source: HTMLAudioElement | string
}[]

// Props
const data = ref<ModalData | null>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:open', (val: ModalData) => {
  data.value = val
})

$bus.on('modal:close', () => {
  data.value = null
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
