<template>
  <div ref="modalRef" class="modal_dialog" v-if="data?.template">
    <component :is="{ ...data.template }" :values="data.values"></component>
  </div>
</template>

<script lang="ts" setup>
// Refs
const modalRef = ref<HTMLElement | null>(null)

// Props
const data = ref<{
  template?: any
  values?: any
} | null>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:open', (v: any) => {
  data.value = v
})

$bus.on('modal:destroy', () => {
  modalRef.value?.classList.add('modal_dialog--close')
  setTimeout(() => {
    data.value = null
  }, 250)
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
