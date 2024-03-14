<template>
  <div class="t-25" :class="{ disabled: !scene?.nav }">
    <svg
      class="progress"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 140 1039"
    >
      <mask
        id="mask"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="140"
        height="1040"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.8 1.93a7.5 7.5 0 0 1 10.59.55C41.67 23.9 55.2 44.18 63.96 66.6 72.71 89 76.49 113.1 76.81 141.91c.37 32.87-17.18 55.86-32.76 76.26l-1.95 2.56c-16.41 21.55-29.85 40.67-26.35 68.33 2 15.77 14.32 23.94 33.43 33.73l5.16 2.61c17.13 8.62 37.61 18.94 50.27 38.53 20.97 32.44 31.68 63.82 34.39 96.26 2.7 32.35-2.59 65.33-12.99 100.91-7.85 26.88-25.37 41.32-42.22 54.22l-3.16 2.42c-15.85 12.1-30.58 23.33-40.06 43.01-14.2 29.51-22.14 54.96-24.67 80.74-2.53 25.8.3 52.37 8.2 84.2 5.03 20.31 18.22 34.08 32.32 48.79 1.73 1.8 3.46 3.61 5.2 5.45 15.54 16.46 30.83 35.15 27.14 64.5-2.79 22.15-9.6 40.97-21.12 56.68-11.52 15.72-27.42 27.88-47.7 37.2a7.5 7.5 0 1 1-6.26-13.62c18.44-8.48 32.14-19.17 41.86-32.44 9.73-13.27 15.8-29.55 18.33-49.68 2.78-22.08-7.95-36.24-23.15-52.34a723.23 723.23 0 0 0-5.1-5.32c-13.9-14.42-30.02-31.15-36.09-55.6-8.17-32.93-11.3-61.3-8.56-89.28 2.75-28 11.35-55.17 26.09-85.78 11.09-23.04 28.53-36.32 44.1-48.15l3.51-2.68c16.58-12.7 30.55-24.63 36.94-46.52 10.11-34.57 14.94-65.6 12.44-95.46-2.48-29.76-12.28-58.8-32.03-89.37-10.33-15.98-27.1-24.47-44.75-33.43l-4.93-2.5c-18.3-9.38-38.36-20.68-41.47-45.2-4.35-34.36 13.07-57.99 29.3-79.3l1.15-1.51c16.16-21.22 30.8-40.43 30.5-68.04-.32-27.57-3.92-49.77-11.83-70.04C42.08 51.78 29.69 33 11.24 12.52a7.5 7.5 0 0 1 .56-10.6Z"
          fill="#000"
        />
      </mask>
      <g mask="url(#mask)">
        <path
          class="progress__bar"
          d="M0 0h140v1039H0z"
          :style="{
            transform: `translateY(${100 - position * 100}%)`,
          }"
        />
      </g>
      <g mask="url(#mask)">
        <path class="progress__bg" d="M0 0h140v1039H0z" />
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import scenes from '~/const/scenes.const'

// Props
defineProps({
  current: {
    type: Number,
  },
})

// Position of the scroll from 0 to 100
const position = computed(
  () => Math.round(useScrollStore().getCurrent * 1000) / 100000
)
const scene = computed(() => useNavigationStore().getScene)

// Watchers
watch(
  () => position.value * scenes.nav.total,
  (value) => {
    // console.log(value)
    // console.log(scroll.value)
  }
)
</script>

<style src="./style.scss" lang="scss" scoped></style>
