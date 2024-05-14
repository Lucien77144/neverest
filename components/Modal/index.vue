<template>
  <div ref="modal">
    <section>
      <article v-for="c in data?.content">
        {{ c.type }}
      </article>
    </section>
  </div>
</template>

<script lang="ts" setup>
// Props
const { data } = defineProps({
  data: Object,
})

// Refs
const modal = ref<HTMLElement | null>(null)
</script>

<style src="./style.scss" lang="scss" scoped></style>
