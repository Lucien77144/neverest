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
    <div ref="startBtn" class="start__btn">
      <UIBtn @click="start()">{{ $t('START') }}</UIBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import Experience from '~/webgl/Experience'

// Scene
import scenes from '~/const/scenes.const'

// Plugins
const { $bus }: any = useNuxtApp()

// Shallow Refs
const exp = shallowRef<Experience | null>(null)

// Refs
const canvasRef = ref<HTMLElement | null>(null)
const webGlCSSRef = ref<HTMLElement | null>(null)
const startBtn = ref<HTMLElement | null>(null)
const activeStatus = ref<boolean>(false)

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

watch(navigation, (v) => {
  if (v.scene?.name == 'intro') {
    gsap.to(startBtn.value, {
      duration: 0,
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        startBtn.value?.classList.add('active')
      },
    })
  } else {
    gsap.to(startBtn.value, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => {
        startBtn.value?.classList.remove('active')
      },
    })
  }
})

function start() {
  const scene = scenes.nav.list.find((s) => s.name === 'basecamp')

  scene && $bus.emit('scene:switch', scene)
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

// On component mounted, create the experience
onMounted(() => {
  exp.value = new Experience({
    canvas: canvasRef.value,
    baseScene: route.query.scene,
    name: 'template',
  })

  // On component unmounted, dispose the experience
  onUnmounted(() => {
    exp.value?.dispose()
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
