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
    this.debug = this.experience.debug
    this.resources = this.experience.resources
    this.time = this.experience.time

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

    // Plugins
    this.$bus = useNuxtApp().$bus

    // Actions
    this.togglePersistScene = useDebugStore().togglePersistScene
    this.setSceneStorage = useDebugStore().setScene
    this.setSceneNavigation = useNavigationStore().setScene
    this.setCurrentScroll = useScrollStore().setCurrent
    this.setTargetScroll = useScrollStore().setTarget

    // Getters
    this.positionScroll = computed(
      () => Math.round(useScrollStore().getCurrent * 1000) / 100000
    )
    this.sceneNavigation = computed(() => useNavigationStore().getScene)
    this.persistScene = computed(() => useDebugStore().getPersistScene)
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
   * Switch scene
   * @param {TSceneInfos} next Destination scene
   */
  switch(next) {
    if (this.next) return

    if (this.debug) {
      this.debugFolder.disabled = true // Disable the debug folder during the transition
    }

    // Init next scene
    this.sceneName = next.name
    this.next = new next.Scene()

    // Update the store (and localstorage) with the new scene :
    this.setScene(next)

    // Add render mesh if unset and set template :
    const transition = next.transition
    this.renderMesh ??= this.experience.renderer.renderMesh
    this.renderMesh.material.uniforms.uTemplate = transition.template

    this.setTargetScroll(0)

    // Smooth transition with gsap
    gsap.to(this.renderMesh.material.uniforms.uTransition, {
      value: 1,
      duration: transition.duration / 1000,
      ease: 'power1.inOut',
      onUpdate: () => {},
      onComplete: () => {
        // Reset transition uniform value :
        this.renderMesh.material.uniforms.uTransition.value = 0

        // Reset params :
        if (this.debug) {
          this.debugScene.value = next.name
          this.debugFolder.disabled = false
        }
        this.active = this.next
        this.next = null
      },
    })
  }

  /**
   * Update scroll
   * @param {number} val Scroll value, from 0 to 100
   */
  instantScroll(val = 0) {
    val = Math.ceil(val * 10000) / 10000
    this.setCurrentScroll(val)
    this.setTargetScroll(val)
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
        label: 'Persist scene',
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
   * Get scene from list
   * @param {*} name Scene name
   */
  getSceneFromList(name) {
    return this.scenes.list.find((s) => s.name === name) || this.scenes.default
  }

  /**
   * Init scene
   */
  init() {
    // Get the scene from the store or the default one
    this.sceneName = this.debug
      ? useDebugStore().getScene
      : this.scenes.default.name
    const active = this.getSceneFromList(this.sceneName)
    this.setScene(active)

    // Debug
    if (this.debug) this.setDebug(this.sceneName)

    // Init active scene
    this.active = new active.Scene()
    this.instantScroll(0)

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
