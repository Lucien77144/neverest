<template>
  <WebGL v-if="isAllowed" />
  <div class="not-supported" v-if="!isAllowed">
    <div class="not-supported__container">{{ $t('NOT_SUPPORTED') }}</div>
    <div class="reload-btn" @click="reload()">
      <UIBtn>
        {{ $t('RELOAD') }}
      </UIBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
const isAllowed = ref(false)

const reload = () => {
  location.reload()
}

onMounted(() => {
  const viewport = new Viewport()
  isAllowed.value = viewport.width > 920

  onUnmounted(() => {
    viewport.destroy()
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
