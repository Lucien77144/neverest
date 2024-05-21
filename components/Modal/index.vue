<template>
  <div class="modal_dialog" v-if="template">
    <component :is="{ ...template }"></component>
  </div>
</template>

<script lang="ts" setup>
// Props
const template = ref<any>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:open', (tpl: any) => {
  template.value = tpl
})

$bus.on('modal:close', () => {
  template.value = null
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
