<template>
  <UILoader />
  <div class="start-wrapper">
    <UIBtn @click="$emit('start')"> {{ $t('START') }} </UIBtn>
    <UILangPicker />
  </div>
</template>

<script lang="ts" setup>
// Refs
const panel = ref<HTMLElement | null>(null)
const loader = ref<HTMLElement | null>(null)
</script>

<style src="./style.scss" lang="scss" scoped></style>
