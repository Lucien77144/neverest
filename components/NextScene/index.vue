<template>
  <div
    v-if="sceneNavigation?.nav"
    ref="next"
    class="next"
    :class="{
      active:
        currentScroll > 100 - GAP &&
        sceneNavigation.nav.end !== scenes.nav.total,
    }"
  >
    <UIDragBtn @navigate="navigate">
      {{ $t('NEXT') }}
    </UIDragBtn>
  </div>
</template>

<script lang="ts" setup>
import scenes from '~/const/scenes.const'

// Ref
const next = ref<HTMLElement>()

// Const
const GAP = 10

// Plugins
const { $bus }: any = useNuxtApp()

// Getters
const currentScroll = computed(() => useScrollStore().getCurrent)
const sceneNavigation = computed(() => useNavigationStore().getScene)

/**
 * Switch scene
 */
function navigate() {
  const curr = scenes.nav.list.findIndex(
    ({ id }) => id === sceneNavigation.value?.id
  )
  const scene = scenes.nav.list[curr + 1]

  next.value?.classList.remove('active')
  scene && $bus.emit('scene:switch', scene)
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
