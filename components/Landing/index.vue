<template>
  <div ref="landingRef" v-if="landing" class="start">
    <img ref="logoRef"class="start__logo" src="/assets/img/logo.svg" alt="Logo" />
    <div ref="contentRef" class="start__content">
      <p>{{ $t('LANDING_START') }}</p>
    </div>
    <div ref="footerRef" class="start__footer">
      <p>{{ $t('LANDING_START_2') }}</p>
      <div class="start__footer__content">
        <UIBtn :secondary="true" @click="enter(), $bus.emit('audio:mute')">
          {{ $t('NO_ACTIVATE') }}
        </UIBtn>
        <UIBtn @click="enter(), $bus.emit('audio:unmute')">
          {{ $t('ACTIVATE') }}
        </UIBtn>
      </div>
    </div>
    <span>28°00′26″N, 86°51′34″E</span>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'

// Plugins
const { $bus }: any = useNuxtApp()

// Refs
const landingRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)

// Store
const landing = computed(() => useExperienceStore().getLanding)

$bus.on('loaded', () => {
  if (!contentRef.value || !footerRef.value || !logoRef.value) return
  gsap.to(logoRef.value, {
    duration: 0.75,
    opacity: 1,
  })
  gsap.to(contentRef.value, {
    duration: 0.75,
    delay: 0.5,
    opacity: 1,
  })
  gsap.to(footerRef.value, {
    duration: 0.75,
    delay: 1,
    opacity: 1,
  })
})

/**
 * Start the experience
 * @param muted - If the audio should be muted
 */
const enter = () => {
  $bus.emit('audio:intro')

  if (landingRef.value) {
    gsap.to(landingRef.value, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => landingRef.value?.remove(),
    })
  }
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
