<template>
  <div
    class="ITData"
    :class="{
      'ITData--hidden': !interest.visible,
    }"
  >
    <div v-if="interest.data" class="ITData__wrapper">
      <h1 class="ITData__date">{{ interest.data.date }}</h1>
      <h2 class="ITData__title">{{ $t(interest.data.title) }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Store
const interest = computed(() => useExperienceStore().getInterest)
</script>

<style src="./style.scss" lang="scss" scoped></style>
