<template>
  <div class="IC_text">
    <div class="IC_text-secondary">
      <div class="IC_text-secondaryWrapper">
        <UIIconBtn
          :disable="false"
          @click="I18n.setLocale('fr'), $bus.emit('lang:change', 'fr')"
        >
          {{ $t('LANG.FR.TAG') }}
        </UIIconBtn>
        <UIIconBtn
          :disable="false"
          @click="I18n.setLocale('en'), $bus.emit('lang:change', 'en')"
        >
          {{ $t('LANG.EN.TAG') }}
        </UIIconBtn>
      </div>
    </div>
    <UIIconBtn
      :big="true"
      :is-disabled="disabled"
      @click="setDisabled(!disabled)"
      ><img class="icon-big" src="/img/icons/subtitle.svg" alt=""
    /></UIIconBtn>
  </div>
  <div class="IC_sound">
    <div class="IC_sound-secondary">
      <div class="IC_sound-secondaryWrapper">
        <UIIconBtn><img src="/img/icons/music.svg" alt="" /></UIIconBtn>
        <UIIconBtn><img src="/img/icons/voice.svg" alt="" /></UIIconBtn>
      </div>
    </div>
    <UIIconBtn :big="true" :is-disabled="isMuted" @click="toggleMute()"
      ><img class="icon-big" src="/img/icons/sound.svg" alt=""
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
const isMuted = ref(true)

$bus.on('audio:mute', () => {
  isMuted.value = true
})

$bus.on('audio:unmute', () => {
  isMuted.value = false
})

function toggleMute() {
  isMuted.value ? $bus.emit('audio:unmute') : $bus.emit('audio:mute')
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
