<template>
  <div
    v-if="navigation?.scene?.nav"
    ref="next"
    class="next"
    :class="{
      active:
        scroll > 100 - GAP && navigation.scene.nav.end !== scenes.nav.total,
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
const GAP = 2

// Plugins
const { $bus }: any = useNuxtApp()

// Getters
const scroll = computed(() => useExperienceStore().getScroll)
const navigation = computed(() => useExperienceStore().getNavigation)

/**
 * Switch scene
 */
function navigate() {
  const curr = scenes.nav.list.findIndex(
    ({ id }) => id === navigation.value.scene?.id
  )
  const scene = scenes.nav.list[curr + 1]

  next.value?.classList.remove('active')
  scene && $bus.emit('scene:switch', scene)
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
