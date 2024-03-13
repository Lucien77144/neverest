import Experience from '../Experience'
import Scene1 from '../Scenes/Scene1'
import Scene2 from '../Scenes/Scene2'
import gsap from 'gsap'
import scenes from './assets/data/scenes.json'
import TRANSITIONS from '~/const/transitions.const'

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
    this.sceneList = {
      default: Scene1,
      world2: Scene2,
    }
    this.debugFolder = null
    this.renderMesh = null
    this.active = null
    this.next = null
    this.destination = null
    this.sceneName = 'default' // Default scene name

    // Store
    const { setScene } = useDebugStore()
    this.setScene = setScene
  }

  /**
   * Switch scene
   * @param {string} destination Destination scene
   * @param {number} template Transition type
   * @param {number} duration Transition duration
   */
  switch(
    destination = 'default',
    duration = 2000,
    template = TRANSITIONS.FADE
  ) {
    if (this.next) return
    this.debugFolder.disabled = true // Disable the debug folder during the transition

    // Init next scene
    this.sceneName = destination
    this.next = new this.sceneList[destination]()

    // Update the store (and localstorage) with the new scene :
    this.setScene(destination)

    // Add render mesh if unset :
    this.renderMesh ??= this.experience.renderer.renderMesh
    // Set the transition template :
    this.renderMesh.material.uniforms.uTemplate = template

    // Smooth transition with gsap
    gsap.to(this.renderMesh.material.uniforms.uTransition, {
      value: 1,
      duration: duration / 1000,
      ease: 'power1.inOut',
      onComplete: () => {
        // Reset transition uniform value :
        this.renderMesh.material.uniforms.uTransition.value = 0

        // Reset params :
        this.debugFolder.disabled = false
        this.active = this.next
        this.next = null
      },
    })
  }

  /**
   * Set debug
   */
  setDebug(value) {
    this.debugFolder = this.debug.addFolder({
      title: 'Scenes',
    })

    this.debugFolder
      .addBlade({
        view: 'list',
        label: 'scene',
        options: Object.keys(this.sceneList).map((text) => ({
          text,
          value: text,
        })),
        value,
      })
      .on('change', ({ value }) => this.switch(value))
  }

  /**
   * Init scene
   */
  init() {
    // Debug
    if (this.debug) {
      const { getScene } = useDebugStore()
      this.sceneName = getScene // Get the base scene name from the debug store
      this.setDebug(this.sceneList[this.sceneName] ? this.sceneName : 'default')
    }

    // Init active scene
    const _scene = this.sceneList[this.sceneName] || this.sceneList.default
    this.active = new _scene()

    this.setNavigation()
  }

  /**
   * Set navigation in the experience of the scenes and depending of the scroll
   */
  setNavigation() {
    // Format presets
    const getTotal = (arr) => arr.reduce((acc, curr) => acc + curr.duration, 0) // Get the total duration of the array
    const preset = scenes.map((scene, i) => ({
      ...scene,
      transition: TRANSITIONS[scene.transition.toUpperCase()],
      start: getTotal(scenes.slice(0, i)),
      end: getTotal(scenes.slice(0, i + 1)),
    }))

    // Composables
    const progress = computed(() => useScrollStore().getCurrent) // Progress of the scroll from 0 to 1
    const totalDuration = getTotal(preset) // Total duration of the presets

    watch(
      () => progress.value * totalDuration,
      (value) => {
        const curr = preset.find((p) => value >= p.start && value < p.end) // current scene to set
        if (curr && curr.scene != this.sceneName) {
          this.destination = curr.scene
        }
      }
    )
  }

  /**
   * Update
   */
  update() {
    this.active?.update()
    this.next?.update()

    if (!this.next && this.destination) {
      this.switch(this.destination)
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
