<template>
  <div class="introData">
    {{ $t(data?.value) }}
  </div>
</template>

<script lang="ts" setup>
// Props
const { data } = defineProps({
  data: Object,
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
