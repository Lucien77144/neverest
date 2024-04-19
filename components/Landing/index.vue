<template>
  <UILoader />
  <div ref="land" class="start">
    <div class="start__content">
      <p>
        {{ $t('LANDING') }}
      </p>
    </div>
    <div class="start__footer">
      <p>{{ $t('LANDING_START') }}</p>
      <div class="start__footer__content">
        <UIBtn @click="$bus.emit('start'); $bus.emit('audio:unmute')">
          {{ $t('YES') }}
        </UIBtn>
        <UIBtn @click="$bus.emit('start'); $bus.emit('audio:mute')">
          {{ $t('NO') }}
        </UIBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Plugins
const { $bus }: any = useNuxtApp()

// Refs
const land = ref<HTMLElement | null>(null)

/**
 * On click, emit start
 */
$bus.on('start', () => {
  land.value?.classList.add('disabled')
  setTimeout(() => land.value?.remove(), 500)
})

/**
 * On loading end, remove the landing if not in debug mode
 */
$bus.on('loading', (value: number) => {
  // Debug store
  const { getLanding } = useDebugStore()

  if (value === 100 && !getLanding) {
    land.value?.remove()
    $bus.emit('start')
  }
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
