<template>
  <!-- <div v-if="data">
    <section>
      <article v-for="c in data">
        {{ c.type }}
      </article>
    </section>
  </div> -->
</template>

<script lang="ts" setup>
export type ModalData = {
  type: 'text' | 'image' | 'video' | 'audio'
  source: HTMLAudioElement | string
}[]

// Props
const data = ref<ModalData | null>(null)

// Bus
const { $bus }: any = useNuxtApp()

// Events
$bus.on('modal:open', (val: ModalData) => {
  data.value = val
})

$bus.on('modal:close', () => {
  data.value = null
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
