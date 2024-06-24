<template>
  <!-- <select @input="change($event)" v-model="I18n.locale.value">
    <option v-for="i in options" :value="i">
      {{ $t('LANG.' + i.toUpperCase() + '.LABEL') }}
    </option>
  </select> -->
  <div class="LP">
    <UIIconBtn
      v-if="!toggleLang"
      :disable="false"
      @click="change({ target: { value: 'fr' } })"
    >
      {{ $t('LANG.FR.TAG') }}
    </UIIconBtn>
    <UIIconBtn
      v-if="toggleLang"
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

const toggleLang = ref<boolean>(false)

/**
 * Change the language of the experience
 * @param target Target element to get value from
 */
const change = ({ target }: any) => {
  I18n.setLocale(target.value)
  $bus.emit('lang:change', target.value)
  toggleLang.value = !toggleLang.value
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
