<template>
  <UILoader />
  <UIRadialProgress />
  <div class="panel">
    <NextScene />
    <UILangPicker />
    <UIProgressBar />
  </div>
</template>

<script lang="ts" setup>
const audioRef = ref<HTMLAudioElement>()

onMounted(() => {
  console.log(audioRef.value)
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
