<template>
  <article id="content-1" class="content d-flex d-flex-column w-px-750">
    <img
      :ref="
        (ref) =>
          addAnimRef(ref, {
            rotate: {
              direction: 1,
              power: 3,
            },
          })
      "
      class="svg__container"
      src="/assets/img/HS-Everest-1953_1.svg"
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
      class="img__container m-0"
      src="/assets/img/HS-Everest-1953_1.jpg"
      alt=""
    />
  </article>
  <article id="content-2" class="content d-grid ml-15">
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
            alt=""
          />
        </div>
        <p class="w-px-500 ml-5">
          {{ $t('EXPEDITION_1953') }}
        </p>
      </div>
    </div>
  </article>
  <article id="content-3" class="content d-grid ml-5 w-px-375">
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
              src="/assets/img/HS-Everest-1953_3.jpg"
              alt=""
            />
          </div>
        </div>
        <p class="text-right w-100">{{ $t('HEROS_1953') }}</p>
      </div>
    </div>
  </article>
  <article id="content-4" class="content d-grid">
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
            alt=""
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
              alt=""
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
                src="/assets/img/gaz_mask.svg"
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
  <article id="content-5" class="content d-grid">
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
  <article id="content-6" class="content d-grid">
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
                src="/assets/img/tent_1953.svg"
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
                  power: 30,
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
