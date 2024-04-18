<template>
  <div class="IC_text">
    <div class="IC_text-secondary">
      <div class="IC_text-secondaryWrapper">
        <UIIconBtn
          :disable="false"
          @click="I18n.setLocale('fr'); $bus.emit('lang:change', 'fr')"
          >Fr</UIIconBtn
        >
        <UIIconBtn
          :disable="false"
          @click="I18n.setLocale('en'); $bus.emit('lang:change', 'en')"
          >En</UIIconBtn
        >
      </div>
    </div>
    <UIIconBtn :big="true" @click="setDisabled(!disabled)"
      ><img class="icon-big" src="/public/img/icons/subtitle.svg" alt=""
    /></UIIconBtn>
  </div>
  <div class="IC_sound">
    <div class="IC_sound-secondary">
      <div class="IC_sound-secondaryWrapper">
        <UIIconBtn
          ><img src="/public/img/icons/music.svg" alt=""
        /></UIIconBtn>
        <UIIconBtn
          ><img src="/public/img/icons/voice.svg" alt=""
        /></UIIconBtn>
      </div>
    </div>
    <UIIconBtn :big="true"
      ><img class="icon-big" src="/public/img/icons/sound.svg" alt=""
    /></UIIconBtn>
  </div>
</template>

<script lang="ts" setup>
// Translations
const I18n = useI18n()

// Bus
const { $bus }: any = useNuxtApp()

// Store
const disabled = computed(() => useSubtitlesStore().getDisabled)
const setDisabled = (val: boolean) => useSubtitlesStore().setDisabled(val)
</script>

<style src="./style.scss" lang="scss" scoped></style>
