<template>
  <Landing v-if="!activeStatus && landing" />
  <Interface />
  <div ref="webGlCSSRef" id="webgl-css-wrapper" class="webGlCSS">
    <WebGLCSS2DRenderer />
    <WebGLCSS3DRenderer />
  </div>
  <canvas ref="canvasRef" class="canvas" />
  <div id="webgl-interface">
    <UIInterestData />
    <UITitle />
    <div ref="startBtnRef" class="start__btn" :class="sceneRef && 'hidden'">
      <UIBtn
        @click="start(), $bus.emit('audio:unmute')"
      >
        {{ $t('START') }}
      </UIBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import Experience from '~/webgl/Experience'

// Scene
import scenes, { type TSceneInfos } from '~/const/scenes.const'

// Plugins
const { $bus }: any = useNuxtApp()

// Shallow Refs
const exp = shallowRef<Experience | null>(null)

// Refs
const canvasRef = ref<HTMLElement | null>(null)
const webGlCSSRef = ref<HTMLElement | null>(null)
const activeStatus = ref<boolean>(false)
const sceneRef = ref<TSceneInfos | null>()
const startBtnRef = ref<HTMLElement | null>(null)

// Route
const route = useRoute()

// get active scene
const active = computed(() => useExperienceStore().getActive)
const landing = computed(() => useExperienceStore().getLanding)

watch(active, (v: boolean) =>
  setTimeout(() => {
    activeStatus.value = v
  }, 750)
)

/**
 * Start the experience
 */
function start() {
  $bus.emit('audio:unmute')
  sceneRef.value = scenes.nav.list.find((s) => s.name === 'basecamp')
  sceneRef.value && $bus.emit('scene:switch', sceneRef.value)
}

// Events
$bus.on('modal:init', (v: any) => {
  webGlCSSRef.value?.classList.add('webGlCSS--disabled')
})

$bus.on('modal:destroy', () => {
  setTimeout(
    () => webGlCSSRef.value?.classList.remove('webGlCSS--disabled'),
    1000
  )
})

const setVisibility = (name: string) => {
  if (name !== 'intro') {
    startBtnRef.value?.classList.add('hidden')
    setTimeout(() => startBtnRef.value?.classList.add('d-none'), 500)
  } else {
    startBtnRef.value?.classList.remove('hidden')
    setTimeout(() => startBtnRef.value?.classList.remove('d-none'), 500)
  }
}
$bus.on('debug:scene', (name: string) => setVisibility(name))

// On component mounted, create the experience
onMounted(() => {
  exp.value = new Experience({
    canvas: canvasRef.value,
    baseScene: route.query.scene,
    name: 'template',
  })
  // On component unmounted, dispose the experience
  onUnmounted(() => exp.value?.dispose())
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
