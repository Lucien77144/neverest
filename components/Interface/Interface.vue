<template>
  <div class="loader">
    <ILoader />
    <!-- <div ref="panel" class="panel disabled t-25">
      <IBtn @click="$emit('start')"> {{ $t('START') }} </IBtn>
      <ILangPicker />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
// Emits
const $emit = defineEmits(['start'])

// Refs
const panel = ref<HTMLElement | null>(null)
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  color: $white;
  font-size: 5rem;
}
.panel {
  z-index: 1000;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  transition: 0.5s ease-in-out;

  &.disabled {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
