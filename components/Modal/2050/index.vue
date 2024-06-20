<template>
  <article id="content-1" class="content d-grid ml-15">
    <div class="wrapper d-grid ml-15">
      <div class="position-relative">
        <div class="rotate-n1 w-px-1000 d-flex d-flex-column">
          <div class="position-relative w-px-800">
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
              src="/assets/img/HS-Everest-2050_1.jpg"
              alt=""
            />
            <div
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: 1,
                      power: 50,
                    },
                  })
              "
              class="svg__mountain__container svg__mountain__container_1 w-px-630 absolute"
            >
              <img
                class="svg__container"
                src="/assets/img/HS-Everest-2050_1.svg"
                alt=""
              />
            </div>
            <div
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: 1,
                      power: 10,
                    },
                  })
              "
              class="svg__mountain__container svg__mountain__container_2 w-px-400 absolute"
            >
              <img
                class="svg__container svg__mountain"
                src="/assets/img/HS-Everest-2050_1.svg"
                alt=""
              />
            </div>
          </div>
          <p
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  translate: {
                    direction: 1,
                    power: 50,
                  },
                })
            "
            class="w-px-800 text-right"
          >
            {{ $t('BASECAMP_2050') }}
          </p>
        </div>
      </div>
    </div>
  </article>
  <article id="content-2" class="content d-grid">
    <div class="wrapper d-grid ml-15" style="gap: 100px">
      <div class="position-relative">
        <div class="rotate-1">
          <p
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  translate: {
                    direction: 1,
                    power: 10,
                  },
                })
            "
            class="text-right w-px-500"
          >
            {{ $t('MELTING_ICE_2050') }}
          </p>
          <img
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  translate: {
                    direction: -1,
                    power: 50,
                  },
                })
            "
            class="img__container m-0 w-px-250"
            src="/assets/img/HS-Everest-2050_3.jpg"
            alt=""
          />
        </div>
      </div>
      <div
        :ref="
          (ref) =>
            addAnimRef(ref, {
              translate: {
                direction: 1,
              },
            })
        "
        class="svg_2__container w-px-400 absolute"
      >
        <img
          class="img__container m-0"
          src="/assets/img/HS-Everest-2050_2.svg"
          alt=""
        />
      </div>
      <div
        :ref="
          (ref) =>
            addAnimRef(ref, {
              rotate: {
                direction: 1,
                power: 3,
              },
            })
        "
        class="img_2__container w-px-250 absolute"
      >
        <img
          class="svg__container svg__scotch svg__scotch__left"
          src="/assets/img/scotch.svg"
          alt=""
        />
        <img
          class="img__container m-0"
          src="/assets/img/HS-Everest-2050_2.jpg"
          alt=""
        />
      </div>
      <div class="position-relative ml-15">
        <div class="rotate-n1 w-px-500 d-flex d-flex-column">
          <div class="position-relative w-px-415">
            <img
              class="svg__scotch svg__scotch__right"
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
              class="img__container m-0"
              src="/assets/img/HS-Everest-2050_4.jpg"
              alt=""
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
            class="w-px-500 ml-10"
          >
            {{ $t('BASECAMP_2050') }}
          </p>
        </div>
      </div>
    </div>
  </article>
  <article id="content-3" class="content d-grid ml-5 mr-5 w-px-500">
    <div class="position-relative d-flex align-center">
      <div class="wrapper w-100 absolute">
        <div class="position-relative">
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
                    power: 3,
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
              src="/assets/img/HS-Everest-2050_5.jpg"
              alt=""
            />
          </div>
        </div>
        <p class="text-right w-100" style="margin-top: -10px">
          {{ $t('PREDICTION_2050') }}
        </p>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { pow } from 'three/examples/jsm/nodes/Nodes'

// Props
const { values, scrollManager, viewport } = defineProps({
  values: {
    type: Object,
    required: false,
  },
  scrollManager: {
    type: ScrollManager,
    required: true,
  },
  viewport: {
    type: Viewport,
    required: true,
  },
})

// Refs
const animRefs = ref<TAnimateRef[]>([])
const addAnimRef = (
  el: Element | ComponentPublicInstance | null,
  options: Omit<TAnimateRef['options'], 'rect'>
) => animRefs.value.push({ el: el as HTMLElement, options }) ?? el

// On mount
onMounted(() => {
  setAnimateRects(animRefs)
  animateRefs(animRefs.value, 10, viewport.width)

  scrollManager.on('scroll', (val: TScrollEvent) => {
    if (val.current) {
      animateRefs(animRefs.value, val.current, viewport.width)
    }
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
