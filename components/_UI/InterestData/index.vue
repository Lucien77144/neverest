<template>
  <div
    ref="interestRef"
    class="ITData"
    :class="{
      'ITData--hidden': !interest.visible,
    }"
  >
    <div v-if="interest.data" class="ITData__wrapper">
      <h1 class="ITData__date">{{ Math.round(date) }}</h1>
      <!-- <h2 class="ITData__title">{{ $t(interest.data.title) }}</h2> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';

// Store
const interest = computed(() => useExperienceStore().getInterest)
const date = ref<number>(0)
const interestRef = ref<HTMLElement | null>(null)

// Bus
const { $bus }: any = useNuxtApp()

$bus.on('tempo:change', (value: number) => {
  // date.value = value.toString()
  gsap.to(date, { value: value, duration: 1, ease: 'power2.out'})
})
$bus.on('modal:init', () => {  
  interestRef.value?.classList.add('ITData--none')
})
$bus.on('modal:destroy', () => {
  setTimeout(() => {
    interestRef.value?.classList.remove('ITData--none')
  }, 1000)
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
