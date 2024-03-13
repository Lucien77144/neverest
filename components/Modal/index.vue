<template>
  <div ref="modal" class="modal hidden">
    <UIBtn class="modal__button" @click="$bus.emit('close')">
        X
      </UIBtn>
    <div class="modal__content">
      <div>{{ text }}</div>
    </div>
  </div>
      
</template>

<script lang="ts" setup>
// Plugins
const { $bus }: any = useNuxtApp()

// Refs
const modal = ref<HTMLElement | null>(null)
const text = ref<string>('')

/**
 * On click, hide the modal
 */
 $bus.on('close', () => {
  modal.value?.classList.add('hidden')
})

/**
 * Open Modal
 */
 $bus.on('openModal', (value: string) => {
  console.log(value);
  
  text.value = value
  modal.value?.classList.remove('hidden')
})

</script>

<style src="./style.scss" lang="scss" scoped></style>
