<template>
  <Landing v-if="landing" />
  <Interface />
  <div
    ref="webGlCSSRef"
    id="webgl-css-wrapper"
    class="webGlCSS scene"
    :class="sceneClass"
  >
    <WebGLCSS2DRenderer />
    <WebGLCSS3DRenderer />
  </div>
  <canvas ref="canvasRef" class="canvas" />
  <div id="webgl-interface">
    <UICallToScroll />
    <UIInterestData />
    <UITitle />
    <div ref="startBtnRef" class="start__btn hidden">
      <UIBtn class="inverse" @click="start()">
        {{ $t('START') }}
      </UIBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import Experience from '~/webgl/Experience'
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'

// Scene
import scenes, { type TSceneInfos } from '~/const/scenes.const'
import type { TExpStore } from '~/stores/experience.store'

useHead({
  title: 'Neverest',
  meta: [
    {
      name: 'Neverest',
      content:
        "A WebGL experience about the Everest Mount and it's challenges.",
    },
  ],
})

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
const sceneClass = ref<string>('')

// Route
const route = useRoute()

// get active scene
const active = computed(() => useExperienceStore().getActive)
const landing = computed(() => useExperienceStore().getLanding)
const navigation = computed(() => useExperienceStore().getNavigation)

watch(active, (v: boolean) =>
  setTimeout(() => {
    activeStatus.value = v
  }, 750)
)
watch(navigation, ({ scene }: TExpStore['navigation']) => {
  setVisibility(scene?.name || 'intro')
})

/**
 * Start the experience
 */
function start() {
  $bus.emit('audio:start')
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
$bus.on('cssRender:toggle', (name: string) => {
  sceneClass.value = 'scene--' + name
})

const setVisibility = (name: string) => {
  if (name !== 'intro') {
    startBtnRef.value?.classList.add('hidden')
  } else {
    $bus.on('audio:intro', () => {
      setTimeout(() => {
        startBtnRef.value?.classList.remove('hidden')
      }, 10000)
    })
  }
}

// On component mounted, create the experience
onMounted(() => {
  gsap.registerPlugin(CustomEase)

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
