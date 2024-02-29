<template>
  <select @input="change($event)" v-model="I18n.locale.value">
    <option v-for="i in options" :value="i">
      {{ $t('LANG.' + i.toUpperCase()) }}
    </option>
  </select>
</template>

<script lang="ts" setup>
// Translations
const I18n = useI18n()

// Refs
const options = ref<string[]>(
  Object.values(I18n.locales.value).map(({ code }) => code)
)

/**
 * Change the language of the experience
 * @param target Target element to get value from
 */
const change = ({ target }: any) => {
  I18n.setLocale(target.value)
}
</script>

<style lang="scss" scoped>
select {
  border: solid $black 1px;
  border-radius: 3px;
  min-width: 300px;
  height: 32px;
}
</style>
