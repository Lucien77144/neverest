<template>
  <div ref="landingRef" v-if="landing" class="start">
    <div ref="contentRef" class="start__content">
      <h1>{{ $t('WELCOME') }}</h1>
    </div>
    <div ref="footerRef" class="start__footer">
      <p>{{ $t('LANDING_START') }}</p>
      <div class="start__footer__content">
        <UIBtn @click="start()">
          {{ $t('ENTER') }}
        </UIBtn>
      </div>
    </div>
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

// Store
const landing = computed(() => useExperienceStore().getLanding)

$bus.on('loaded', () => {
  if (!contentRef.value || !footerRef.value) return
  gsap.to(contentRef.value, {
    duration: 0.75,
    opacity: 1,
  })
  gsap.to(footerRef.value, {
    duration: 0.75,
    delay: 0.5,
    opacity: 1,
  })
})

/**
 * Start the experience
 * @param muted - If the audio should be muted
 */
const start = () => {
  $bus.emit('audio:unmute')
  $bus.emit('start')

  if (landingRef.value) {
    gsap.to(landingRef.value, {
      duration: 0.5,
      opacity: 0,
    })
  }
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
