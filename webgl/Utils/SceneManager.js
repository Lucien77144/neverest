import Experience from '../Experience'
import gsap from 'gsap'
import TRANSITIONS from '~/const/transitions.const'
import scenesList from '~/const/scenes.const'

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
    this.sceneList = null
    this.debugFolder = null
    this.renderMesh = null
    this.active = null
    this.next = null
    this.destination = null
    this.sceneName = 'default' // Default scene name

    // Store
    const { setScene } = useDebugStore()
    this.setScene = setScene
    const { setScroll } = useScrollStore()
    this.setScroll = setScroll
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
    const next = this.getSceneFromList(destination)
    this.sceneName = next.name
    this.next = new next.Scene()

    // Update the store (and localstorage) with the new scene :
    this.setScene(next.name)

    // Add render mesh if unset and set template :
    this.renderMesh ??= this.experience.renderer.renderMesh
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
        options: this.sceneList.map(({ name }) => ({
          text: name,
          value: name,
        })),
        value,
      })
      .on('change', ({ value }) => this.switch(value))
  }

  /**
   * Format the scene
   */
  setSceneList() {
    this.sceneList = scenesList.map((s, i) => ({
      ...s,
      start: total(scenesList.slice(0, i), 'duration'),
      end: total(scenesList.slice(0, i + 1), 'duration'),
    }))
  }

  /**
   * Get scene from list
   * @param {*} name Scene name
   */
  getSceneFromList(name) {
    return (
      this.sceneList.find((s) => s.name === name) ||
      this.sceneList.find((s) => s.name === 'default') ||
      this.sceneList[0]
    )
  }

  /**
   * Set navigation in the experience of the scenes and depending of the scroll
   */
  setNavigation() {
    // Composables
    const progress = computed(() => useScrollStore().getScroll) // Progress of the scroll from 0 to 1
    const totalDuration = total(this.sceneList, 'duration') // Total duration of the presets

    watch(
      () => progress.value * totalDuration,
      (val) => {
        const curr = this.sceneList.find((p) => val >= p.start && val < p.end) // current scene to set
        if (curr && curr.name != this.sceneName) {
          this.destination = curr.name
        }
      }
    )
  }

  /**
   * Init scene
   */
  init() {
    this.setSceneList()

    // Debug
    if (this.debug) {
      const { getScene } = useDebugStore()
      this.sceneName = getScene // Get the base scene name from the debug store
      this.setDebug(this.getSceneFromList(this.sceneName).name)
    }

    // Init active scene
    const active = this.getSceneFromList(this.sceneName)
    this.active = new active.Scene()

    this.setNavigation()
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
