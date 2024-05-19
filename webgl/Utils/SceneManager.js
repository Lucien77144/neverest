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
    this.scene = null
    this.scale = 0
    this.start = 0

    // Actions
    this.setNavigation = useExperienceStore().setNavigation
  }

  /**
   * Set debug
   */
  setDebug(value) {
    this.debugFolder = this.debug.panel.addFolder({
      expanded: false,
      title: 'Navigation',
    })

    // Persist scene in local
    this.debugFolder.addBinding({ value: false }, 'value', {
      label: 'Persist Scene',
    })

    // Debug scene
    this.debugScene = this.debugFolder.addBlade({
      view: 'list',
      label: 'scene',
      options: this.scenes.list.map(({ name }) => ({
        text: name,
        value: name,
      })),
      value,
    })

    // Persist the folder and enable it
    this.debug.persist(this.debugFolder)
    this.debugFolder.disabled = false

    // Add switch event on change scene
    this.debugScene.on('change', ({ value }) =>
      this.switch(this.getSceneFromList(value))
    )
  }

  /**
   * Set scene in storage and navigation stores
   * @param {*} scene Scene
   */
  setScene(scene) {
    this.scene = scene
    this.debugScene.value = scene.name
  }

  /**
   * Set scale
   * @param {*} scale
   */
  setScale(scale) {
    this.scale = scale
  }

  /**
   * Set start
   * @param {*} start
   */
  setStart(start) {
    this.start = start
  }

  /**
   * Update scroll
   * @param {number} val Scroll value, from 0 to 100
   */
  navigate({ scroll, navigation }) {
    scroll && this.scrollManager.to(scroll)
    navigation && this.setNavigation(navigation)

    navigation.scene && this.setScene(navigation.scene)
    navigation.scale && this.setScale(navigation.scale)
    navigation.start && this.setStart(navigation.start)
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
    this.scrollManager.setDisable(true)

    // Init next scene
    const previous = this.sceneName
    this.sceneName = next.name
    this.next = new next.Scene({
      interest: {
        list: next.nav?.interest,
        base: this.baseScrollFactor,
        current: this.scrollManager.factor,
      },
    })

    // Switch function start on previous scene
    this.active?.onDisposeStart?.()

    // Update the store (and localstorage) with the new scene :
    this.navigate({ scene: next })

    // Add render mesh if unset :
    const transition = next.transition
    this.renderMesh ??= this.experience.renderer.renderMesh

    // Get current values :
    const currStart = this.start
    const currScale = this.scale
    const currScroll = this.scrollManager.current

    // Smooth transition with gsap
    const findIndex = (name) => scenes.list.findIndex((s) => s.name === name)
    const diff = findIndex(next.name) - findIndex(previous)
    this.renderMesh.material.uniforms.uDirection.value = Math.sign(diff)

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
        this.navigate({
          navigation: {
            start: interpolate(currStart, next.nav?.start),
            scale: interpolate(currScale, next.nav?.scale),
          },
          scroll: currScroll * (1 - progress),
        })
      },
      onComplete: () => {
        // Reset navigation values
        this.navigate({
          navigation: { start: next.nav?.start, scale: next.nav?.scale },
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
        this.scrollManager.setDisable(false)
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
    // Debug
    if (this.debug) this.setDebug(this.sceneName)

    // Get the scene from the store or the default one
    this.sceneName = baseScene
    this.sceneName ??= this.debug
      ? this.debugScene.value
      : this.scenes.default.name
    const scene = this.getSceneFromList(this.sceneName)

    // Set navigation
    this.navigate({
      navigation: {
        scene,
        scale: scene.nav?.scale,
        start: scene.nav?.start,
      },
      scroll: scene.nav?.scroll,
    })

    // Init active scene
    this.baseScrollFactor = this.scrollManager.factor
    this.active = new scene.Scene({
      interest: {
        list: scene.nav?.interest,
        base: this.baseScrollFactor,
        current: this.scrollManager.factor,
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
