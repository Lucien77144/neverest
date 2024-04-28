import Experience from '../Experience'
import gsap from 'gsap'
import scenes from '~/const/scenes.const'

export default class SceneManager {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.scrollManager = this.experience.scrollManager
    this.debug = this.experience.debug
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.$bus = this.experience.$bus

    // New elements
    this.scenes = scenes
    this.nav = this.scenes.nav // Navigation data
    this.sceneName = null // Default scene name
    this.debugFolder = null
    this.debugScene = null
    this.renderMesh = null
    this.active = null
    this.next = null
    this.destination = null
    this.baseScrollFactor = null

    // Actions
    this.togglePersistScene = useDebugStore().togglePersistScene
    this.setSceneStorage = useDebugStore().setScene

    this.instantScroll = useScrollStore().instant
    this.setDisableScroll = useScrollStore().setDisable

    this.setSceneNavigation = useNavigationStore().setScene
    this.setStartPosition = useNavigationStore().setStart
    this.setScale = useNavigationStore().setScale

    // Getters
    this.currentScroll = computed(
      () => Math.round(useScrollStore().getCurrent * 1000) / 100000
    )
    this.factorScroll = computed(() => useScrollStore().getFactor)
    this.persistScene = computed(() => useDebugStore().getPersistScene)
    this.currentScale = computed(() => useNavigationStore().getScale)
    this.sceneNavigation = computed(() => useNavigationStore().getScene)
    this.startPosition = computed(() => useNavigationStore().getStart)
  }

  /**
   * Set debug
   */
  setDebug(value) {
    this.debugFolder = this.debug.addFolder({
      title: 'Scenes',
    })

    this.debugFolder
      .addBinding({ value: this.persistScene.value }, 'value', {
        label: 'Persist',
      })
      .on('change', () => this.togglePersistScene())

    this.debugScene = this.debugFolder
      .addBlade({
        view: 'list',
        label: 'scene',
        options: this.scenes.list.map(({ name }) => ({
          text: name,
          value: name,
        })),
        value,
      })
      .on('change', ({ value }) => this.switch(this.getSceneFromList(value)))
  }

  /**
   * Set scene in storage and navigation stores
   * @param {*} scene Scene
   */
  setScene(scene) {
    this.setSceneStorage(scene.name)
    this.setSceneNavigation(scene)
  }

  /**
   * Update scroll
   * @param {number} val Scroll value, from 0 to 100
   */
  instantNavigate({ scroll, scale, start, scene }) {
    scroll && this.instantScroll(scroll)
    scale && this.setScale(scale || 0)
    start && this.setStartPosition(start || 0)
    scene && this.setScene(scene)
  }

  /**
   * Switch scene
   * @param {TSceneInfos} next Destination scene
   */
  switch(next) {
    if (this.next) return

    if (this.debug) {
      this.debugFolder.disabled = true // Disable the debug folder during the transition
    }

    // Disable scroll
    this.setDisableScroll(true)

    // Init next scene
    this.sceneName = next.name
    this.next = new next.Scene({
      interest: {
        list: next.nav?.interest,
        base: this.baseScrollFactor,
        current: this.factorScroll.value,
      },
    })

    // Switch function start on previous scene
    this.active?.onDisposeStart?.()

    // Update the store (and localstorage) with the new scene :
    this.setScene(next)

    // Add render mesh if unset :
    const transition = next.transition
    this.renderMesh ??= this.experience.renderer.renderMesh

    // Get current values :
    const currStart = this.startPosition.value
    const currScale = this.currentScale.value
    const currScroll = this.currentScroll.value * 100

    // Smooth transition with gsap
    gsap.to(this.renderMesh.material.uniforms.uTransition, {
      value: 1,
      duration: transition.duration / 1000,
      ease: 'power1.inOut',
      onUpdate: () => {
        // Progression of the transition :
        const progress = this.renderMesh.material.uniforms.uTransition.value

        // Interpolate values :
        const interpolate = (from, to) => from + (to - from) * progress

        // Transition of values of progressBar
        this.instantNavigate({
          start: interpolate(currStart, next.nav?.start),
          scale: interpolate(currScale, next.nav?.scale),
          scroll: currScroll * (1 - progress),
        })
      },
      onComplete: () => {
        // Reset navigation values
        this.instantNavigate({
          start: next.nav?.start,
          scale: next.nav?.scale,
          scroll: 0,
        })

        // Reset transition uniform value :
        this.renderMesh.material.uniforms.uTransition.value = 0

        // Reset params :
        if (this.debug) {
          this.debugScene.value = next.name
          this.debugFolder.disabled = false
        }
        this.active.dispose()
        this.active = this.next
        this.next = null

        // Switch complete function on the new scene
        this.setDisableScroll(false)
        this.active?.onInitComplete?.()
      },
    })
  }

  /**
   * Get scene from list
   * @param {*} name Scene name
   */
  getSceneFromList(name) {
    return this.scenes.list.find((s) => s.name === name) || this.scenes.default
  }

  /**
   * Init scene
   * @param {*} baseScene If set, initial scene name to load
   */
  init(baseScene = null) {
    // Get the scene from the store or the default one
    this.sceneName = baseScene
    this.sceneName ??= this.debug
      ? useDebugStore().getScene
      : this.scenes.default.name
    const scene = this.getSceneFromList(this.sceneName)

    // Set navigation
    this.instantNavigate({
      scroll: scene.nav?.scroll,
      scale: scene.nav?.scale,
      start: scene.nav?.start,
      scene,
    })

    // Debug
    if (this.debug) this.setDebug(this.sceneName)

    // Init active scene
    this.baseScrollFactor = this.factorScroll.value
    this.active = new scene.Scene({
      interest: {
        list: scene.nav?.interest,
        base: this.baseScrollFactor,
        current: this.factorScroll.value,
      },
    })
    // Switch complete function on the new scene
    this.active?.onInitComplete?.()

    // Start navigation
    this.$bus.on('scene:switch', (scene) => this.switch(scene))
  }

  /**
   * Update
   */
  update() {
    this.active?.update()
    this.next?.update()
  }

  /**
   * Resize
   */
  resize() {
    this.active?.resize()
    this.next?.resize()
  }

  /**
   * Dispose
   */
  dispose() {
    this.active?.dispose()
    this.next?.dispose()
  }
}
