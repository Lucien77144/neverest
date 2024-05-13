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
    console.log('ui')
    isDisabled.value = false
  } else {
    console.log('no')
    isDisabled.value = true
  }
})

// Watch
watch(disabled, (val) => {
  console.log(val)
  isDisabled.value = val
})

watch(subtitles, (val) => {
  if (val) {
    console.log('yes')
    isDisabled.value = false
  } else {
    console.log('c chud en vré')
    isDisabled.value = true
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
