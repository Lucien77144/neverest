<template>
  <UILoader />
  <div ref="land" class="start">
    <div class="start__title">
      <img src="/assets/images/icons/countries/fr.png" alt="" />
    </div>
    <div class="start__content">
      <p>
        {{ $t('INTRO') }}
      </p>
    </div>
    <div class="start__footer">
      <UILangPicker />
      <UIBtn @click="$bus.emit('start')">
        {{ $t('START') }}
      </UIBtn>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Plugins
const { $bus }: any = useNuxtApp()

// Refs
const land = ref<HTMLElement | null>(null)

/**
 * On click, emit start
 */
$bus.on('start', () => {
  land.value?.classList.add('disabled')
  setTimeout(() => land.value?.remove(), 500)
})

/**
 * On loading end, remove the landing if not in debug mode
 */
$bus.on('loading', (value: number) => {
  // Debug store
  const { getLanding } = useDebugStore()

  if (value === 100 && !getLanding) {
    land.value?.remove()
    $bus.emit('start')
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
