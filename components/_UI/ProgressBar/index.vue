<template>
  <div class="t-25">
    <svg
      class="progress t-25"
      :class="{ disabled: !navigation.scene?.nav }"
      ref="progressRef"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 424"
    >
      <g class="grp" clip-path="url(#a)" stroke-width="2">
        <path
          class="grp__fill"
          d="M24.2 1.06c32.96 0 27.55 45.88 0 45.88-27.53 0-34-45.88 0-45.88Z"
          stroke-miterlimit="10"
        />
        <path
          d="M31.5 27.57 24.25 14.9 17 27.57h14.5Z"
          stroke-linejoin="round"
        />
        <path d="M19 33.26h10" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <circle
        class="pt"
        :class="{ 'pt--active': scroll >= 100 }"
        cx="24"
        cy="82"
        r="1"
        stroke-width="2"
      />
      <circle
        class="pt"
        :class="{ 'pt--active': scroll >= 75 }"
        cx="24"
        cy="118"
        r="1"
        stroke-width="2"
      />
      <circle
        class="pt"
        :class="{ 'pt--active': scroll >= 51 }"
        cx="24"
        cy="154"
        r="1"
        stroke-width="2"
      />
      <g
        class="grp"
        :class="{ 'grp--active': scroll >= 51 }"
        @click.stop="navigate('icefall')"
        clip-path="url(#b)"
        stroke-width="2"
      >
        <path
          class="grp__fill"
          d="M24.2 189.06c32.96 0 27.55 45.88 0 45.88-27.53 0-34-45.88 0-45.88Z"
          stroke-miterlimit="10"
        />
        <path
          d="M31 216.96H17l4.83-8.73h4.34l4.83 8.73Z"
          stroke-linejoin="round"
        />
        <path d="M22 203.97h4" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <circle
        class="pt"
        :class="{ 'pt--active': scroll >= (50 / 3) * 2 }"
        cx="24"
        cy="270"
        r="1"
        stroke-width="2"
      />
      <circle
        class="pt"
        :class="{ 'pt--active': scroll >= 50 / 3 }"
        cx="24"
        cy="306"
        r="1"
        stroke-width="2"
      />
      <circle class="pt pt--active" cx="24" cy="342" r="1" stroke-width="2" />
      <g
        class="grp"
        :class="{ 'grp--active': scroll >= 0 }"
        @click.stop="navigate('basecamp')"
        clip-path="url(#c)"
        stroke-width="2"
      >
        <path
          d="M24.2 377.06c32.96 0 27.55 45.88 0 45.88-27.53 0-34-45.88 0-45.88Z"
          class="grp__fill"
          stroke-miterlimit="10"
        />
        <path d="m15 394 8 13 8-13H15Z" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h48v48H0z" />
        </clipPath>
        <clipPath id="b">
          <path fill="#fff" transform="translate(0 188)" d="M0 0h48v48H0z" />
        </clipPath>
        <clipPath id="c">
          <path fill="#fff" transform="translate(0 376)" d="M0 0h48v48H0z" />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import scenes from '~/const/scenes.const'

// Refs
const progressRef = ref<HTMLElement | null>(null)

// Bus event
const { $bus }: any = useNuxtApp()

// Props
defineProps({
  current: {
    type: Number,
  },
})

// Getters
const scroll = computed(() =>
  formatScroll(Math.round(useExperienceStore().getScroll))
)
const navigation = computed(() => useExperienceStore().getNavigation)

/**
 * Format scroll values
 */
function formatScroll(value: number): number {
  const total = scenes.nav.total
  const prev = (navigation.value.start / total) * 100

  return (value / total) * navigation.value.scale + prev
}

/**
 * Switch scene
 */
function navigate(name: string) {
  const next = scenes.nav.list.find((s) => s.name === name)

  const scene = navigation.value.scene
  if (scene?.name === next?.name) return
  scene && $bus.emit('scene:switch', next)
}

// Events
$bus.on('modal:init', () => progressRef.value?.classList.add('disabled'))
</script>

<style src="./style.scss" lang="scss" scoped></style>
