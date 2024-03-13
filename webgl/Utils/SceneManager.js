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
    this.sceneName = 'default' // Default scene name
    this.debugFolder = null
    this.debugScene = null
    this.renderMesh = null
    this.active = null
    this.next = null
    this.destination = null
    this.redirect = false

    // Store
    this.setScene = useDebugStore().setScene
    this.setCurrent = useScrollStore().setCurrent
    this.setTarget = useScrollStore().setTarget

    // Position of the scroll from 0 to 100
    this.position = computed(
      () => Math.round(useScrollStore().getCurrent * 1000) / 100000
    )
  }

  /**
   * Switch scene
   * @param {string} next Destination scene
   * @param {boolean} scroll If set, update the scroll position
   */
  switch(next, scroll = false) {
    if (this.next) return
    this.debugFolder.disabled = true // Disable the debug folder during the transition

    // Init next scene
    this.sceneName = next.name
    this.next = new next.Scene()

    // Update the store (and localstorage) with the new scene :
    this.setScene(next.name)

    // Add render mesh if unset and set template :
    const transition = next.transition
    this.renderMesh ??= this.experience.renderer.renderMesh
    this.renderMesh.material.uniforms.uTemplate = transition.template

    // Update scroll position :
    this.redirect = scroll
    const scrollDest = Math.ceil((next.start / this.scenes.total) * 100)
    const scrollStart = this.position.value * 100

    // Smooth transition with gsap
    gsap.to(this.renderMesh.material.uniforms.uTransition, {
      value: 1,
      duration: transition.duration / 1000,
      ease: 'power1.inOut',
      onUpdate: () => {
        // If redirecting, update the scroll position depending of the transition state
        if (this.redirect) {
          const value = this.renderMesh.material.uniforms.uTransition.value
          this.instantScroll(scrollStart + (scrollDest - scrollStart) * value)
        }
      },
      onComplete: () => {
        // Reset transition uniform value :
        this.renderMesh.material.uniforms.uTransition.value = 0

        // Reset params :
        this.debugScene.value = next.name
        this.redirect = false
        this.debugFolder.disabled = false
        this.active = this.next
        this.next = null
      },
    })
  }

  /**
   * Update scroll
   * @param {number} val Scroll value, from 0 to 100
   */
  instantScroll(val) {
    val = Math.ceil(val * 10000) / 10000
    this.setCurrent(val)
    this.setTarget(val)
  }

  /**
   * Set debug
   */
  setDebug(value) {
    this.debugFolder = this.debug.addFolder({
      title: 'Scenes',
    })

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
      .on('change', ({ value }) =>
        this.switch(this.getSceneFromList(value), true)
      )
  }

  /**
   * Get scene from list
   * @param {*} name Scene name
   */
  getSceneFromList(name) {
    return (
      this.scenes.list.find((s) => s.name === name || s.name === 'default') ||
      this.scenes.list[0]
    )
  }

  /**
   * Set navigation in the experience of the scenes and depending of the scroll
   */
  setNavigation() {
    watch(
      () => this.position.value * this.scenes.total,
      (v) => {
        const curr = this.scenes.list.find((p) => v >= p.start && v < p.end)

        if (curr && curr.name != this.sceneName && !this.redirect) {
          this.destination = curr.name
        }
      }
    )
  }

  /**
   * Init scene
   */
  init() {
    // Debug
    if (this.debug) {
      this.sceneName = useDebugStore().getScene // Get the base scene name from the debug store
      this.setDebug(this.getSceneFromList(this.sceneName).name)
    }

    // Init active scene
    const active = this.getSceneFromList(this.sceneName)
    this.active = new active.Scene()
    this.instantScroll((active.start / this.scenes.total) * 100)

    this.setNavigation()
  }

  /**
   * Update
   */
  update() {
    this.active?.update()
    this.next?.update()

    if (!this.next && this.destination && !this.redirect) {
      this.switch(this.getSceneFromList(this.destination))
      this.destination = null
    }
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
