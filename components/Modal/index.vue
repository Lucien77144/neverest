<template>
  <div v-if="data" ref="modalRef" class="modal_dialog modal_dialog--close">
    <div
      class="close__btn"
      @click="$bus.emit('modal:toggle'), $bus.emit('audio:click')"
    >
      <img class="close__btn__icon" src="/assets/img/cross.svg" alt="close" />
      <p class="close__btn__text">
        {{ $t('CLOSE') }}
      </p>
    </div>
    <div class="modal transformable" ref="scrollRef">
      <section class="modal__scroll">
        <div class="modal__scroll__wrapper">
          <div class="lottie">
            <client-only>
              <Vue3Lottie
                ref="lottieRef"
                :animationData="scrollAnimation"
                :autoPlay="true"
                :loop="true"
              />
            </client-only>
            <img
              class="lottie__bg"
              src="/assets/img/call_scroll_border.svg"
              alt=""
            />
          </div>
          <div class="title__wrapper">
            <div ref="titleMaskRef" class="title__mask">
              <h2 class="title">{{ $t('SCROLL_TO_EXPLORE') }}</h2>
            </div>
            <h2 class="title">{{ $t('SCROLL_TO_EXPLORE') }}</h2>
          </div>
          <p class="modal__scroll__text">
            {{ $t(data.title || 'TITLE_1953') }}
          </p>
          <img
            class="modal__scroll__bg"
            src="/assets/img/text_scroll_border.svg"
            alt=""
          />
        </div>
      </section>
      <section class="modal__content">
        <component
          :is="{ ...data.template }"
          :values="data.values"
          :scrollManager="scrollManager"
          :viewport="viewport"
        ></component>
      </section>
    </div>
    <div ref="progressRef" class="progress"></div>
  </div>
</template>

<script lang="ts" setup>
import { ScrollManager, Viewport } from '#imports'
import { Vue3Lottie } from 'vue3-lottie'
import scrollAnimation from '~/assets/data/scroll.json'
import clamp from '~/utils/functions/clamp'

// Refs
const modalRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const titleMaskRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)
const viewport = ref<Viewport>(new Viewport())
const scrollManager = ref<ScrollManager | null>(null)
const maxScrollValue = ref<number>(0)
const progressValue = ref<number>(0)

// Props
const data = ref<{
  template?: any
  title?: string
  values?: any
} | null>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:open', (v: any) => {
  data.value = v
  progressValue.value = 0
  titleMaskRef.value?.style.setProperty('width', '0%')
  modalRef.value?.classList.remove('modal_dialog--close')

  if (scrollManager?.value?.limit?.max) {
    scrollManager.value.target = 0
    scrollManager.value.current = 0

    const max = (scrollRef.value?.clientWidth || 0) + 1
    maxScrollValue.value = max
    scrollManager.value.limit.max = max - viewport.value.width
  }
})

$bus.on('modal:destroy', () => {
  modalRef.value?.classList.add('modal_dialog--close')
  setTimeout(() => {
    data.value = null
  }, 250)
})

// On mount
onMounted(() => {
  scrollManager.value = new ScrollManager({
    factor: 25,
    decimal: 100,
    limit: {
      min: 0,
      max: viewport.value.width,
    },
  }).on('scroll', (val: TScrollEvent) => {
    if (!scrollRef.value || !data.value) return
    //-[START] Scroll content of the modal
    progressValue.value = val.current / viewport.value.width

    if (titleMaskRef.value) {
      titleMaskRef.value.style.animation = 'none'
      titleMaskRef.value.style.setProperty(
        'width',
        `${clamp(0, 100, progressValue.value * 300)}%`
      )
    }

    scrollRef.value.style.transform = `translateX(-${val.current}px)`
    if (progressRef.value && maxScrollValue.value) {
      const progress =
        (val.current / (maxScrollValue.value - viewport.value.width)) * 100
      progressRef.value.style.setProperty('width', `${progress}%`)
    }
    //-[END] Scroll content of the modal
  })
})

// On unmount
onUnmounted(() => scrollManager.value?.destroy())
</script>

<style src="./style.scss" lang="scss" scoped></style>
