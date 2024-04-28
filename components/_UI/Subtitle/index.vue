<template>
  <div v-if="!disabled" class="subtitles">
    <div class="subtitles__wrapper">
      <div v-for="s in subtitles" class="subtitles__item">
        {{ s.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Cues
const subtitles = computed(() => useSubtitlesStore().getCues)
const disabled = computed(() => useSubtitlesStore().getDisabled)
const isDisabled = ref(false)

// Watch
watch(disabled, (val) => {
  isDisabled.value = val
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
