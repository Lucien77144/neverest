<template>
  <div id="css-2d-renderer" class="renderer">
    <div
      v-for="(d, i) in list"
      :key="i"
      :id="d?.id"
      :ref="(el) => add({ ...d, el })"
    >
      <component
        :is="{ ...d?.template }"
        :content="d?.content"
        :props="d?.props"
      >
        {{ d?.id }}
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TSceneDialog } from '~/const/scenes.const'

// Bus
const { $bus }: any = useNuxtApp()

// Dialogs list
const list = computed(() => useDialogsStore().getList)

// Add dialog to css renderer
const add = (d: TSceneDialog) => $bus.emit('dialogs:add', d)
</script>

<style src="./style.scss" lang="scss" scoped></style>
