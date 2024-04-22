<template>
  <div id="css-2d-renderer" class="renderer">
    <div
      v-for="(el, i) in listRef"
      :key="i"
      :id="el?.id"
      :ref="(r) => (el.el = r)"
    >
      <!-- :ref="(r) => (el.el = r) && el.el.remove()" -->
      <component
        :is="{ ...el?.template }"
        :content="el?.content"
        :props="el?.props"
      >
        {{ el?.id }}
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TSceneDialog } from '~/const/scenes.const'

// Bus
const { $bus }: any = useNuxtApp()

// Refs
const listRef = ref<TSceneDialog[]>()

// Dialogs list
const list = computed(() => useDialogsStore().getList)

watch(list, (curr) => {
  listRef.value = curr

  $bus.emit('dialogs:add', listRef.value)
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
