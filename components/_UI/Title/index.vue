<template>
  <div
    class="title"
    :class="{
      'title--disabled': disabled,
    }"
  >
    <div class="title__wrapper">
      <h1 class="title__item">{{ $t('INTRO_TITLE_1') }}</h1>
      <h1 class="title__item">{{ $t('INTRO_TITLE_2') }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Ref
const disabled = ref<boolean>(true)

// Bus
const { $bus }: any = useNuxtApp()

// Toggle title
$bus.on('title:disable', (val: boolean) => {
  disabled.value = val
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
