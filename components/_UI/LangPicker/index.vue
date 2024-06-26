<template>
  <!-- <select @input="change($event)" v-model="I18n.locale.value">
    <option v-for="i in options" :value="i">
      {{ $t('LANG.' + i.toUpperCase() + '.LABEL') }}
    </option>
  </select> -->
  <div class="LP">
    <p ref="langsRef" class="LP__text">
        {{ $t('LANGS') }}
      </p>
    <UIIconBtn
      v-if="I18n.locale.value == 'en'"
      :disable="false"
      @click="change({ target: { value: 'fr' } })"
    >
      {{ $t('LANG.FR.TAG') }}
    </UIIconBtn>
    <UIIconBtn
      v-if="I18n.locale.value == 'fr'"
      :disable="false"
      @click="change({ target: { value: 'en' } })"
    >
      {{ $t('LANG.EN.TAG') }}
    </UIIconBtn>
  </div>
</template>

<script lang="ts" setup>
// Bus
const { $bus }: any = useNuxtApp()

// Translations
const I18n = useI18n()

// Refs
const options = ref<string[]>(
  Object.values(I18n.locales.value).map(({ code }) => code)
)
const langsRef = ref<HTMLElement | null>(null)

/**
 * Change the language of the experience
 * @param target Target element to get value from
 */
const change = ({ target }: any) => {  
  I18n.setLocale(target.value)
  $bus.emit('lang:change', target.value)
}

$bus.on('tempo:change', (tempo: string) => {  
  if (tempo === '1953') {
    langsRef.value?.classList.remove('color-secondary')
  }
  if (tempo === '2024' || tempo === '2050') {
    langsRef.value?.classList.add('color-secondary')
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
