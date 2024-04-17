<template>
  <div class="ITData">
    <div ref="dataRef" v-if="data?.title" class="ITData__wrapper">
      <h1 class="ITData__date">{{ data.date }}</h1>
      <h2 class="ITData__title">{{ $t(data.title) }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TSceneInterest } from '~/const/scenes.const'

// Refs
const dataRef = ref<HTMLElement>()
const data = ref<TSceneInterest['data']>()

// bus event
const { $bus }: any = useNuxtApp()

// On component mounted, create the experience
onMounted(() => {
  $bus.on('interest', (val?: TSceneInterest['data']) => {
    if (val) {
      data.value = val
      dataRef.value?.classList.remove('ITData__wrapper--hidden')
    } else {
      dataRef.value?.classList.add('ITData__wrapper--hidden')
    }
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
