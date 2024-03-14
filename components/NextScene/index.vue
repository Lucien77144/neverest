<template>
  <div
    ref="action"
    class="action next"
    :class="{
      active:
        progressNavigation > 99 &&
        (sceneNavigation?.nav?.end || scenes.nav.total),
    }"
  >
    <UIBtn @click="switchScene(true)">
      {{ $t('NEXT') }}
    </UIBtn>
  </div>

  <div
    ref="action"
    class="action prev"
    :class="{
      active: progressNavigation < 1 && sceneNavigation?.nav?.start !== 0,
    }"
  >
    <UIBtn @click="switchScene(false)">
      {{ $t('PREV') }}
    </UIBtn>
  </div>
</template>

<script lang="ts" setup>
import scenes from '~/const/scenes.const'

// Plugins
const { $bus }: any = useNuxtApp()

// Refs
const action = ref<HTMLElement | null>(null)

// Computed
const progressNavigation = computed(() => useNavigationStore().getProgress)
const sceneNavigation = computed(() => useNavigationStore().getScene)

/**
 * Switch scene
 */
const switchScene = (next: boolean) => {
  const index = scenes.nav.list.findIndex(
    ({ id }) => id === sceneNavigation.value?.id
  )
  const scene = next ? scenes.nav.list[index + 1] : scenes.nav.list[index - 1]

  if (scene) {
    $bus.emit('scene:switch', { scene, scroll: false })
  }
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
