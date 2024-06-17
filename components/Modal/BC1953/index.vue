<template>
  <div
    class="close__btn"
    @click="$bus.emit('modal:close'), $bus.emit('audio:click')"
  >
    <img src="/assets/img/cross.svg" alt="close" />
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
      <article id="content-1" class="modal__content__item d-grid">
        <img
          :ref="
            (ref) =>
              addAnimRef(ref, {
                rotate: {
                  direction: 1,
                },
              })
          "
          class="svg__container"
          src="/assets/img/HS-Everest-1953_1_bg.png"
          alt=""
        />
        <img
          :ref="
            (ref) =>
              addAnimRef(ref, {
                translate: {
                  direction: 1,
                },
              })
          "
          class="img__container"
          src="/assets/img/HS-Everest-1953_1.jpg"
        />
      </article>
      <article id="content-2" class="modal__content__item d-grid ml-15">
        <div class="position-relative w-max-500">
          <img
            class="svg__container svg__scotch svg__scotch__left"
            src="/assets/img/scotch.svg"
            alt=""
          />
          <div class="rotate-1">
            <img
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: -1,
                    },
                  })
              "
              class="img__container w-px-375"
              src="/assets/img/HS-Everest-1953_2.jpg"
            />
            <p class="text-right w-100">{{ $t('PREPARE_1953') }}</p>
          </div>
        </div>
        <div class="position-relative ml-20">
          <div class="rotate-n1 w-px-500 d-flex d-flex-column">
            <div class="position-relative w-px-375">
              <img
                class="svg__container svg__scotch svg__scotch__right"
                src="/assets/img/scotch.svg"
                alt=""
              />
              <img
                :ref="
                  (ref) =>
                    addAnimRef(ref, {
                      translate: {
                        direction: -1,
                      },
                    })
                "
                class="img__container"
                src="/assets/img/HS-Everest-1953_2.jpg"
              />
            </div>
            <p class="w-px-500 ml-5">
              {{ $t('EXPEDITION_1953') }}
            </p>
          </div>
        </div>
      </article>
      <article id="content-3" class="modal__content__item d-grid">
        <div class="position-relative v-min-500 ml-15">
          <div class="wrapper w-100 d-flex align-center absolute">
            <img
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: -1,
                    },
                  })
              "
              class="border absolute"
              src="/assets/img/HS-Everest-1953_3.svg"
              alt=""
            />
            <div
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    rotate: {
                      direction: 1,
                    },
                  })
              "
            >
              <img
                :ref="
                  (ref) =>
                    addAnimRef(ref, {
                      translate: {
                        direction: 1,
                      },
                    })
                "
                class="img__container m-0"
                src="/assets/img/HS-Everest-1953_3.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </article>
      <article id="content-4" class="modal__content__item d-grid">
        <div class="wrapper d-grid ml-15">
          <div class="position-relative w-max-500">
            <div class="rotate-1">
              <p class="text-right w-100">{{ $t('ACTORS_1953') }}</p>
              <img
                :ref="
                  (ref) =>
                    addAnimRef(ref, {
                      translate: {
                        direction: -1,
                      },
                    })
                "
                class="img__container m-0 w-px-375"
                src="/assets/img/HS-Everest-1953_4.jpg"
              />
            </div>
          </div>
          <div class="position-relative ml-20">
            <div class="rotate-n1 w-px-500 d-flex d-flex-column">
              <div class="position-relative w-px-375">
                <img
                  :ref="
                    (ref) =>
                      addAnimRef(ref, {
                        translate: {
                          direction: -1,
                        },
                      })
                  "
                  class="img__container m-0"
                  src="/assets/img/HS-Everest-1953_5.jpg"
                />
                <div
                  :ref="
                    (ref) =>
                      addAnimRef(ref, {
                        translate: {
                          direction: 1,
                        },
                      })
                  "
                  class="svg__gaz_mask__container w-px-375 absolute"
                >
                  <img
                    class="svg__container svg__gaz_mask"
                    src="/assets/img/gaz_mask.png"
                    alt=""
                  />
                </div>
              </div>
              <p class="w-px-500 ml-10">
                {{ $t('MATERIAL_1953') }}
              </p>
            </div>
          </div>
        </div>
      </article>
      <article id="content-5" class="modal__content__item d-grid">
        <div class="wrapper ml-15">
          <div style="width: 781px; height: 584px">
            <UIVideoPlayer
              :value="values?.return1953"
              poster="/img/preview_video1.jpg"
            />
          </div>
          <p
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  translate: {
                    direction: 1,
                  },
                })
            "
            class="text"
          >
            {{ $t('RETURN_1953') }}
          </p>
        </div>
      </article>
      <article id="content-6" class="modal__content__item d-grid">
        <div class="wrapper ml-15 d-grid">
          <div class="position-relative">
            <div class="rotate-n1 w-px-1000 d-flex d-flex-column">
              <div class="position-relative w-px-375">
                <div
                  :ref="
                    (ref) =>
                      addAnimRef(ref, {
                        translate: {
                          direction: 1,
                        },
                      })
                  "
                  class="tent_1953__container absolute"
                >
                  <img
                    class="svg__container tent_1953"
                    src="/assets/img/tent_1953.png"
                    alt=""
                  />
                </div>
                <img
                  :ref="
                    (ref) =>
                      addAnimRef(ref, {
                        translate: {
                          direction: 1,
                        },
                      })
                  "
                  class="img__container m-0"
                  src="/assets/img/HS-Everest-1953_6.jpg"
                />
              </div>
              <p class="w-px-500 ml-n5">
                {{ $t('BASECAMP_1953') }}
              </p>
            </div>
          </div>
          <div class="position-relative ml-20 w-px-600">
            <div class="w-px-600">
              <UIVideoPlayer
                :value="values?.archives1953"
                poster="/img/preview_video2.jpg"
              />
            </div>
            <p
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: -1,
                    },
                  })
              "
              class="text-right w-100"
            >
              {{ $t('IMAGE_ARCHIVE') }}
            </p>
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
import type { TAnimateRef } from '~/utils/animateRefs'
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
const progressValue = ref<number>(0)
const scrollManager = ref<ScrollManager | null>(null)
const scrollTitleValue = ref<number>(0)

const animRefs = ref<TAnimateRef[]>([])
const addAnimRef = (
  ref: Element | ComponentPublicInstance | null,
  options: Omit<TAnimateRef['options'], 'rect'>
) => {
  const el = ref as HTMLElement

  const rect = el.getBoundingClientRect()
  const opt = {
    ...options,
    rect: {
      left: rect.left,
      right: rect.right,
      width: rect.width,
    },
  }

  el.classList.add('transformable')
  animRefs.value.push({ el, options: opt })
}

// On mount
onMounted(() => {
  const viewport = new Viewport()
  const maxScroll = (scrollRef.value?.clientWidth || 0) + 1

  animateRefs(animRefs.value, 0, viewport.width)
  scrollManager.value = new ScrollManager({
    factor: 25,
    decimal: 100,
    ...(maxScroll && {
      limit: {
        min: 0,
        max: maxScroll - viewport.width,
      },
    }),
  }).on('scroll', (val: TScrollEvent) => {
    if (!scrollRef.value) return

    //-[START] Scroll content of the modal
    progressValue.value = val.current / viewport.width
    scrollTitleValue.value = clamp(0, 100, progressValue.value * 300) // white animation of the modal

    scrollRef.value.style.transform = `translateX(-${val.current}px)`
    if (progressRef.value && maxScroll) {
      const progress = (val.current / (maxScroll - viewport.width)) * 100
      progressRef.value.style.width = `${progress}%`
    }
    //-[END] Scroll content of the modal

    animateRefs(animRefs.value, val.current, viewport.width)
  })
})

// On unmount
onUnmounted(() => {
  scrollManager.value?.off('scroll')
  scrollManager.value?.destroy()
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
