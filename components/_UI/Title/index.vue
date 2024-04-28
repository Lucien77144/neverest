<template>
  <div ref="title" class="title">
    <div class="title__wrapper">
      <h1 class="title__item">{{ $t('INTRO_TITLE_1') }}</h1>
      <h1 class="title__item">{{ $t('INTRO_TITLE_2') }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import gsap from 'gsap'

// Refs
const title = ref<HTMLElement | null>(null)

// get active scene
const scene = computed(() => useNavigationStore().getScene)

// Watch scene navigation
watch(scene, (v) => {
  const isIntro = v?.name === 'intro'
  const classList = title.value?.classList

  if (v?.name == 'intro') {
    gsap.to(title.value, {
      duration: 1,
      y: isIntro ? 0 : -100,
      opacity: isIntro ? 1 : 0,
      ease: 'power2.inOut',
      onComplete: () => {
        isIntro ? classList?.add('active') : classList?.remove('active')
      },
    })
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
