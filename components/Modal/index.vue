<template>
  <div class="modal_dialog" v-if="data">
    <component :is="{ ...data.template }" :data="data.value"></component>
  </div>
</template>

<script lang="ts" setup>
// Props
const data = ref<any>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:open', (v: any) => {
  data.value = v
})

$bus.on('modal:close', () => {
  data.value = null
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
