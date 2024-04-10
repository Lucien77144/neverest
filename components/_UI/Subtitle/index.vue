<template>
  <div class="subtitles">
    <div class="subtitles__wrapper">
      <div v-for="s in subtitles" class='subtitles__item'>
        {{ s.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Cues
const subtitles = computed(() => useSubtitlesStore().getCues)
</script>

<style src="./style.scss" lang="scss" scoped></style>
