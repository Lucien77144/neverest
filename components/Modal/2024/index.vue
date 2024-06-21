<template>
  <article id="content-1" class="content d-flex d-flex-column h-100">
    <img
      :ref="
        (ref) =>
          addAnimRef(ref, {
            rotate: {
              direction: -1,
              power: 4,
            },
          })
      "
      class="svg__container"
      src="/assets/img/HS-Everest-2024_1.svg"
      alt=""
    />
  </article>
  <article id="content-2" class="content d-grid">
    <div class="position-relative w-max-500">
      <div class="d-flex d-flex-column d-flex-justify-end">
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
          class="img__container w-px-280"
          src="/assets/img/HS-Everest-2024_1.jpg"
          alt=""
        />
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
          class="w-100"
        >
          {{ $t('SHERPA_FLAG_2024') }}
        </p>
      </div>
    </div>
    <div class="position-relative z-3 ml-15">
      <div class="rotate-n1 w-px-500 d-flex">
        <div class="position-relative">
          <img
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  rotate: {
                    direction: -1,
                    power: 3,
                  },
                })
            "
            class="svg__container"
            src="/assets/img/HS-Everest-2024_2.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </article>
  <article id="content-3" class="content d-grid">
    <div class="wrapper">
      <div
        :ref="
          (ref) =>
            addAnimRef(ref, {
              translate: {
                direction: -1,
                power: 50,
              },
            })
        "
        style="width: 903px; height: 507px"
      >
        <UIVideoPlayer
          :value="values?.video2024_1"
          poster="/img/HS-Everest-2024_2.jpg"
        />
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
        class="text-right"
      >
        {{ $t('DIVIN_2024') }}
      </p>
    </div>
  </article>
  <article id="content-4" class="content d-grid">
    <div class="wrapper d-grid ml-15">
      <div class="position-relative d-flex" style="gap: 100px">
        <div>
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
            class="text-right text-nowrap ml-5"
          >
            {{ $t('RITUAL_2024') }}
          </p>
          <div
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  translate: {
                    direction: -1,
                    power: 50,
                  },
                })
            "
            style="width: 387px; height: 387px; margin-right: 60px"
          >
            <UIVideoPlayer
              :value="values?.video2024_2"
              poster="/img/HS-Everest-2024_3.jpg"
            />
          </div>
        </div>
        <div class="rotate-n1 d-flex d-flex-column d-flex-justify-center">
          <div
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  translate: {
                    direction: -1,
                    power: 50,
                  },
                })
            "
            class="position-relative"
          >
            <img
              class="svg__container svg__scotch svg__scotch__right"
              src="/assets/img/scotch.svg"
              alt=""
            />
            <img
              class="img__container m-0 w-px-230"
              src="/assets/img/HS-Everest-2024_5.jpg"
              alt=""
            />
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
            class="text-right w-100"
          >
            {{ $t('STATUE_2024') }}
          </p>
        </div>
      </div>
      <div class="position-relative">
        <div class="rotate-n1 d-flex d-flex-column">
          <div class="position-relative d-flex align-end">
            <img
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: -1,
                    },
                  })
              "
              class="img__container ml-5 w-px-270 h-px-200"
              src="/assets/img/HS-Everest-2024_4.jpg"
              alt=""
            />
            <img
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: 1,
                      power: 50,
                    },
                  })
              "
              class="svg__container music-svg w-pw-670"
              src="/assets/img/HS-Everest-2024_3.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </article>
  <article id="content-5" class="content d-grid">
    <div class="wrapper ml-15 d-grid">
      <div class="position-relative">
        <div class="rotate-n1 w-px-1000 d-flex d-flex-column">
          <div class="position-relative w-px-730">
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
              class="wifi-2024__container absolute z-3 w-px-375"
              style="top: -100px; right: -150px"
            >
              <img
                class="svg__container wifi-svg w-px-375"
                src="/assets/img/HS-Everest-2024_4.svg"
                alt=""
              />
            </div>
            <img
              :ref="
                (ref) =>
                  addAnimRef(ref, {
                    translate: {
                      direction: 1,
                      power: 50,
                    },
                  })
              "
              class="img__container m-0"
              src="/assets/img/HS-Everest-2024_6.jpg"
              alt=""
            />
          </div>
          <p
            :ref="
              (ref) =>
                addAnimRef(ref, {
                  translate: {
                    direction: -1,
                    power: 50,
                  },
                })
            "
            class="w-px-500 ml-n5"
          >
            {{ $t('WIFI_2024') }}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
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
