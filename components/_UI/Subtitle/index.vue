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
const isDisabled = ref(false)

isDisabled.value = true

watch(subtitles, (val) => {  
  if (val[0]) {
    isDisabled.value = false
  } else {
    isDisabled.value = true
  }

})
</script>

<style src="./style.scss" lang="scss" scoped></style>
