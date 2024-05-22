<template>
  <div ref="modalRef" class="modal_dialog" v-if="template">
    <component :is="{ ...template }"></component>
  </div>
</template>

<script lang="ts" setup>
// Refs
const modalRef = ref<HTMLElement | null>(null)

// Props
const template = ref<any>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:open', (tpl: any) => {
  template.value = tpl
})

$bus.on('modal:destroy', () => {
  modalRef.value?.classList.add('modal_dialog--close')
  setTimeout(() => {
    template.value = null
  }, 250)
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
