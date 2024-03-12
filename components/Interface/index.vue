<template>
  <ILoader />
  <div class="panel">
    <IBtn @click="$emit('start')"> {{ $t('START') }} </IBtn>
    <ILangPicker />
  </div>
</template>

<script lang="ts" setup>
// Refs
const panel = ref<HTMLElement | null>(null)
const loader = ref<HTMLElement | null>(null)
</script>

<style src="./style.scss" lang="scss" scoped></style>
