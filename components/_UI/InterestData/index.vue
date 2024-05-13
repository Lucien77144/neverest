<template>
  <div
    class="ITData"
    :class="{
      'ITData--hidden': !visible,
    }"
  >
    <div v-if="interest" class="ITData__wrapper">
      <h1 class="ITData__date">{{ interest.date }}</h1>
      <h2 class="ITData__title">{{ $t(interest.title) }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Store
const interest = computed(() => useInterestStore().getInterest)
const visible = computed(() => useInterestStore().getVisible)
</script>

<style src="./style.scss" lang="scss" scoped></style>
