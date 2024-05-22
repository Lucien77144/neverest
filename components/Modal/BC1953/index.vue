<template>
  <div class="close__btn" @click="$bus.emit('modal:close')">
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <path
        d="M1.34 2.66A1.5 1.5 0 0 1 3.46.54l21.8 19.81 21.3-19.29a1.5 1.5 0 1 1 2.12 2.12l-19.3 21.3 19.58 21.56a1.5 1.5 0 1 1-2.13 2.12L25.27 28.6 3.18 48.68a1.5 1.5 0 1 1-2.12-2.12l20.09-22.09L1.34 2.67Z"
        fill="#F5E5E0"
      />
    </svg>
    <p class="close__btn__text">
      {{ $t('CLOSE') }}
    </p>
  </div>
  <div class="modal" ref="scrollRef">
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
          <div
            class="title__mask"
            :style="{
              width: `${scrollTitleValue || 0}%`,
            }"
          >
            <h2 class="title">{{ $t('SCROLL_TO_EXPLORE') }}</h2>
          </div>
          <h2 class="title">{{ $t('SCROLL_TO_EXPLORE') }}</h2>
        </div>
        <p class="modal__scroll__text">
          {{ $t('TITLE_1953') }}
        </p>
        <img
          class="modal__scroll__bg"
          src="/assets/img/text_scroll_border.svg"
          alt=""
        />
      </div>
    </section>
    <section class="modal__content">
      <article
        class="modal__content__item"
        style="min-width: 692px; height: 835px; transform: rotate(13.63deg)"
      >
        <img
          class="svg__container rotatable"
          src="/assets/img/HS-Everest-1953_1_bg.png"
          alt=""
        />
        <img
          class="img__container translatable"
          src="/assets/img/HS-Everest-1953_1.jpg"
        />
      </article>
      <article class="modal__content__item">
        <div style="margin-left: 15rem; display: grid; gap: 10vh">
          <div class="position-relative" style="max-width: 500px">
            <img
              class="svg__container svg__scotch svg__scotch__left"
              src="/assets/img/scotch.svg"
              alt=""
            />
            <div style="transform: rotate(1deg)">
              <img
                style="width: 375px"
                class="img__container translatableR"
                src="/assets/img/HS-Everest-1953_2.jpg"
              />
              <p class="text-right w-100">{{ $t('PREPARE_1953') }}</p>
            </div>
          </div>
          <div class="position-relative" style="margin-left: 20rem">
            <div
              style="
                transform: rotate(-1deg);
                display: flex;
                flex-direction: column;
                width: 500px;
              "
            >
              <div class="position-relative" style="width: 375px">
                <img
                  class="svg__container svg__scotch svg__scotch__right"
                  src="/assets/img/scotch.svg"
                  alt=""
                />
                <img
                  class="img__container translatableR"
                  src="/assets/img/HS-Everest-1953_2.jpg"
                />
              </div>
              <p style="margin-left: 5rem; width: 500px">
                {{ $t('EXPEDITION_1953') }}
              </p>
            </div>
          </div>
        </div>
      </article>
      <article class="modal__content__item content3">
        <div
          class="position-relative"
          style="min-width: 500px; margin-left: 15rem"
        >
          <div class="content3__wrapper">
            <img
              class="translatableR border"
              src="/assets/img/HS-Everest-1953_3.svg"
              alt=""
            />
            <div class="rotatable">
              <img
                class="img__container translatable"
                src="/assets/img/HS-Everest-1953_3.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </article>
      <article class="modal__content__item content4">
        <div class="content4__wrapper">
          <div class="position-relative" style="max-width: 500px">
            <div style="transform: rotate(1deg)">
              <p class="text-right w-100">{{ $t('ACTORS_1953') }}</p>
              <img
                style="width: 375px"
                class="img__container translatableR"
                src="/assets/img/HS-Everest-1953_4.jpg"
              />
            </div>
          </div>
          <div class="position-relative" style="margin-left: 20rem">
            <div
              style="
                transform: rotate(-1deg);
                display: flex;
                flex-direction: column;
                width: 500px;
              "
            >
              <div class="position-relative" style="width: 375px">
                <img
                  class="img__container translatableR"
                  src="/assets/img/HS-Everest-1953_5.jpg"
                />
                <div class="translatable svg__gaz_mask__container">
                  <img
                    class="svg__container svg__gaz_mask"
                    src="/assets/img/gaz_mask.png"
                    alt=""
                  />
                </div>
              </div>
              <p style="margin-left: 7.5rem; width: 500px">
                {{ $t('MATERIAL_1953') }}
              </p>
            </div>
          </div>
        </div>
      </article>
      <article class="modal__content__item content5">
        <div class="content5__wrapper">
          <div style="width: 781px">
            <UIVideoPlayer :value="values?.return1953" />
          </div>
          <p class="text translatable">
            {{ $t('RETURN_1953') }}
          </p>
        </div>
      </article>
      <article class="modal__content__item content6">
        <div class="content6__wrapper">
          <div class="position-relative">
            <div
              style="
                transform: rotate(-1deg);
                display: flex;
                flex-direction: column;
                width: 1000px;
              "
            >
              <div class="position-relative" style="width: 375px">
                <div class="translatable tent_1953__container">
                  <img
                    class="svg__container tent_1953"
                    src="/assets/img/tent_1953.png"
                    alt=""
                  />
                </div>
                <img
                  class="img__container translatable"
                  src="/assets/img/HS-Everest-1953_6.jpg"
                />
              </div>
              <p style="margin-left: -5rem; width: 500px">
                {{ $t('BASECAMP_1953') }}
              </p>
            </div>
          </div>
          <div
            class="position-relative"
            style="max-width: 600px; margin-left: 20rem"
          >
            <div style="width: 600px">
              <UIVideoPlayer :value="values?.archives1953" />
            </div>
            <p class="text-right w-100 translatableR">{{ $t('ACTORS_1953') }}</p>
          </div>
        </div>
      </article>
    </section>
  </div>
  <div ref="progressRef" class="progress"></div>
</template>

<script lang="ts" setup>
import { ScrollManager, type TScrollEvent } from '#imports'
import { Vue3Lottie } from 'vue3-lottie'
import scrollAnimation from '~/assets/data/scroll.json'
import clamp from '~/utils/functions/clamp'

// Props
const { values } = defineProps({
  values: {
    type: Object,
    required: false,
  },
})

// Bus
const { $bus }: any = useNuxtApp()

// Refs
const progressRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)
const skewValue = ref<number>(0)
const progressValue = ref<number>(0)
const scrollManager = ref<ScrollManager | null>(null)
const scrollTitleValue = ref<number>(0)

// On mount
onMounted(() => {
  const viewport = new Viewport()
  const maxScroll = (scrollRef.value?.clientWidth || 0) + 1

  scrollManager.value = new ScrollManager({
    factor: 25,
    ...(maxScroll && {
      limit: {
        min: 0,
        max: maxScroll - viewport.width,
      },
    }),
  })
  scrollManager.value.on('scroll', (val: TScrollEvent) => {
    progressValue.value = val.current / viewport.width
    scrollTitleValue.value = clamp(0, 100, progressValue.value * 300)

    skewValue.value = Math.floor((val.current - val.target) * 10) * 0.002
    skewValue.value -= skewValue.value / 2

    document.querySelectorAll('.translatable').forEach((el: any) => {
      const pos = el.getBoundingClientRect().left
      if (pos < 0 || pos > viewport.width) return

      el.style.transform = `translateX(${(pos / viewport.width - 0.5) * 50}px)`
    })

    document.querySelectorAll('.translatableR').forEach((el: any) => {
      const pos = el.getBoundingClientRect().left
      if (pos < 0 || pos > viewport.width) return

      el.style.transform = `translateX(-${(pos / viewport.width - 0.5) * 50}px)`
    })

    document.querySelectorAll('.rotatable').forEach((el: any) => {
      const pos = el.getBoundingClientRect().left
      if (pos < 0 || pos > viewport.width) return

      el.style.transform = `rotate(${Math.abs(pos / viewport.width - 0.5)}deg)`
    })

    // Scroll :
    if (scrollRef.value) {
      scrollRef.value.style.transform = `translateX(-${val.current}px)`

      if (progressRef.value && maxScroll) {
        const progress = val.current / (maxScroll - viewport.width) * 100
        // Math.round((val.current / (maxScroll - viewport.width)) * 10000) / 100
        progressRef.value.style.width = `${progress}%`
      }
    }
  })
})

// On unmount
onUnmounted(() => {
  scrollManager.value?.off('scroll')
  scrollManager.value?.destroy()
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
