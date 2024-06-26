<template>
  <div class="IC_text">
    <UIIconBtn
      :big="false"
      :is-disabled="disabled"
      @click="setDisabled(!disabled)"
    >
      <svg
        width="22"
        height="21"
        viewBox="0 0 30 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.6087 1.466C1.64815 1.16393 4.56736 1.28805 5.01739 1.22653C6.2652 1.05594 7.57268 1.1165 8.85217 1.1165C11.0037 1.1165 13.1675 1.23264 15.2435 1.3495C16.8919 1.44229 18.4922 1.1165 20.113 1.1165C21.7547 1.1165 23.3326 1 24.9826 1C25.4696 1 25.9565 1 26.4435 1C26.8298 1 27.2181 1.233 27.6 1.233C28.2461 1.233 29 1.60975 29 2.33976C29 3.99018 29 5.64061 29 7.29104C29 10.922 29 14.5529 29 18.1838C29 18.5313 28.9827 18.8452 28.7565 19.1159C28.6945 19.1901 28.3725 19.2851 28.2696 19.2906C26.6135 19.3787 24.9647 19.8518 23.2918 19.9637C22.3677 20.0256 21.4314 19.9896 20.5053 19.9896C19.6644 19.9896 18.8235 19.9896 17.9826 19.9896C17.0351 19.9896 16.1332 19.7566 15.1826 19.7566C13.3722 19.7566 11.5945 19.8731 9.76522 19.8731C9.01449 19.8731 8.26377 19.8731 7.51304 19.8731C6.54585 19.8731 5.65534 19.6401 4.71304 19.6401C3.92174 19.6401 3.13043 19.6401 2.33913 19.6401C1.6841 19.6401 1.36522 18.7512 1.36522 18.1256C1.36522 17.0965 1.36522 16.0674 1.36522 15.0383C1.36522 14.3346 1.65274 12.9589 1.30435 12.3588C1.12806 12.0551 1.31309 11.6392 1.23671 11.3103C1.13196 10.8592 1.12174 10.4404 1.12174 9.97055C1.12174 9.06902 1 8.20216 1 7.29104C1 6.24253 1 5.19402 1 4.14552C1 3.42222 1.03639 2.44486 1.36522 1.8155"
          stroke="#41545A"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          class="input-subtitle__line"
          d="M5.46289 12.8359H10.2755"
          stroke="#41545A"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          class="input-subtitle__line"
          d="M20 16H24.8126"
          stroke="#41545A"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          class="input-subtitle__line"
          d="M14 13H25"
          stroke="#41545A"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          class="input-subtitle__line"
          d="M5 16L15.9999 16.0342"
          stroke="#41545A"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </UIIconBtn>
  </div>
  <div class="IC_sound">
    <UIIconBtn :big="false" :is-disabled="isMuted" @click="toggleMute()">
      <div class="audio-wave">
        <svg
          class="audio-wave__svg"
          :class="
            isMuted ? 'audio-wave__svg--muted' : 'audio-wave__svg--unmuted'
          "
          width="128"
          height="48"
          viewBox="0 0 128 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 28.1905C3 37.5 3.12195 39.7143 6.4878 39.7143C13.2195 39.7143 9.85366 9.33333 14.3415 9.33333C18.8293 9.33333 15.4634 46 21.0732 46C26.6829 46 22.1951 2 27.8049 2C33.4146 2 31.1707 42.8571 35.6585 42.8571C40.1463 42.8571 39.0244 12.4762 42.3902 12.4762C45.7561 12.4762 48 32.381 48 32.381C48 32.381 49.122 43.9048 52.4878 43.9048C59.2195 43.9048 55.8537 4.72381 60.3415 4.72381C63.2883 4.72381 63 19.5 64 28.5C65 37.8095 65.122 39.7143 68.4878 39.7143C75.2195 39.7143 71.8537 9.33333 76.3415 9.33333C80.8293 9.33333 77.4634 46 83.0732 46C88.6829 46 84.1951 2 89.8049 2C95.4146 2 93.1707 42.8571 97.6585 42.8571C102.146 42.8571 101.024 12.4762 104.39 12.4762C107.756 12.4762 110 32.381 110 32.381C110 32.381 111.122 43.9048 114.488 43.9048C121.22 43.9048 117.854 4.72381 122.341 4.72381C125.288 4.72381 125 19.5 126 28.5"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </UIIconBtn>
  </div>
</template>

<script lang="ts" setup>
// Translations
const I18n = useI18n()

// Bus
const { $bus }: any = useNuxtApp()

// Refs
const subtitlesRef = ref<HTMLElement | null>(null)
const soundRef = ref<HTMLElement | null>(null)

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

$bus.on('tempo:change', (tempo: string) => {  
  if (tempo === '1953') {
    subtitlesRef.value?.classList.remove('color-secondary')
    soundRef.value?.classList.remove('color-secondary')
  }
  if (tempo === '2024' || tempo === '2050') {
    subtitlesRef.value?.classList.add('color-secondary')
    soundRef.value?.classList.add('color-secondary')
  }
})

function toggleMute() {
  isMuted.value ? $bus.emit('audio:unmute') : $bus.emit('audio:mute')
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
