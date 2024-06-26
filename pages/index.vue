<template>
  <WebGL v-if="isAllowed" />
  <div v-if="!isAllowed">
    $t('NOT_SUPPORTED')
  </div>
</template>

<script setup lang="ts">
const isAllowed = ref(false)

onMounted(() => {
  const viewport = new Viewport()
  isAllowed.value = viewport.width > 920

  onUnmounted(() => {
    viewport.destroy()
  })
})
</script>
