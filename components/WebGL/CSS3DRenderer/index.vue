<template>
  <div id="css-3d-renderer" class="renderer">
    <div
      class="renderer__item"
      v-for="(d, i) in list"
      :key="i"
      :id="d?.id?.toLowerCase()"
      :ref="(el) => add({ ...d, el })"
    >
      <component
        v-if="d?.template"
        :is="{ ...d?.template }"
        :data="d?.data"
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Bus
const { $bus }: any = useNuxtApp()

// Dialogs list
const list = computed(() => useCSSRendererStore().get3DList)

// Add dialog to css renderer
const add = (d: ICSS3DRendererStore) => $bus.emit('CSS3D:add', d)
</script>

<style src="./style.scss" lang="scss" scoped></style>
