<template>
  <div v-if="sceneNavigation?.nav">
    <div
      ref="action"
      class="action next"
      :class="{
        active:
          currentScroll > 100 - GAP &&
          (sceneNavigation.nav.end || scenes.nav.total),
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
        active: currentScroll < GAP && sceneNavigation.nav.start !== 0,
      }"
    >
      <UIBtn @click="switchScene(false)">
        {{ $t('PREV') }}
      </UIBtn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import scenes from '~/const/scenes.const'

// Const
const GAP = 10

// Plugins
const { $bus }: any = useNuxtApp()

// Refs
const action = ref<HTMLElement | null>(null)

// Getters
const currentScroll = computed(() => useScrollStore().getCurrent)
const sceneNavigation = computed(() => useNavigationStore().getScene)

/**
 * Switch scene
 */
const switchScene = (next: boolean) => {
  const index = scenes.nav.list.findIndex(
    ({ id }) => id === sceneNavigation.value?.id
  )
  const scene = next ? scenes.nav.list[index + 1] : scenes.nav.list[index - 1]

  scene && $bus.emit('scene:switch', scene)
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
