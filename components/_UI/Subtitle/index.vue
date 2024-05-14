<template>
  <div v-if="!isDisabled" class="subtitles">
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

// isDisabled.value = true
onMounted(() => {
  if (document.querySelector('.subtitles__wrapper')?.innerHTML != '') {
    isDisabled.value = false
  } else {
    isDisabled.value = true
  }
})

// Watch
watch(disabled, (val) => {
  isDisabled.value = val
})

watch(subtitles, (val) => {
  isDisabled.value = !val
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
