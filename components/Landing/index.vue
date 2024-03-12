<template>
  <UILoader />
  <div ref="landing" class="start-wrapper">
    <div class="title">
      <img src="/assets/images/icons/countries/fr.png" alt="" />
    </div>
    <div class="content">
      <p>
        {{ $t('INTRO') }}
      </p>
    </div>
    <div class="footer">
      <UIBtn @click="onClick()">
        {{ $t('START') }}
      </UIBtn>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Plugins
const { $bus }: any = useNuxtApp()

// Refs
const landing = ref<HTMLElement | null>(null)

/**
 * On click, emit start
 */
function onClick() {
  $bus.emit('start')
  landing.value?.classList.add('disabled')
  setTimeout(() => landing.value?.remove(), 500)
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
