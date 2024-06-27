<template>
  <div
    v-if="navigation?.scene?.nav"
    ref="next"
    class="next"
    :class="
      scroll > 100 - GAP &&
      navigation.scene.nav.end == scenes.nav.total &&
      'active'
    "
  >
    <UIText style="top: 10rem; right: 5rem"
      >{{ $t('PREVISIONS_2050') }}</UIText
    >
    <UIDragBtn>
      {{ $t('DRAG') }}
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

$bus.on('modal:init', () => {
  console.log(navigation.value?.scene?.nav?.end, scenes.nav.total);
  
  if (
    scroll.value > 100 - GAP &&
    navigation.value?.scene?.nav?.end == scenes.nav.total
  ) {    
    next.value?.classList.remove('active')
  }
})
$bus.on('modal:destroy', () => {
  setTimeout(() => {
    if (
      scroll.value > 100 - GAP &&
      navigation.value?.scene?.nav?.end == scenes.nav.total
    ) {
      console.log('yes');
      
      next.value?.classList.add('active')
    }
  }, 1000)
})

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
