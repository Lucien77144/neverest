import Experience from '../Experience'
import Scene1 from '../Scenes/Scene1'
import Scene2 from '../Scenes/Scene2'
import gsap from 'gsap'

export const TRANSITIONS = {
  FADE: 0,
}

export default class SceneManager {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.$router = this.experience.$router
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
    this.debugFolder.disabled = true

    this.next = new this.sceneList[destination]()

    this.renderMesh ??= this.experience.renderer.renderMesh
    this.renderMesh.material.uniforms.uTemplate = template

    gsap.to(this.renderMesh.material.uniforms.uTransition, {
      value: 1,
      duration: duration / 1000,
      ease: 'power1.inOut',
      onComplete: () => {
        this.renderMesh.material.uniforms.uTransition.value = 0
        this.$router.push(`/?scene=${destination}#debug`)

        this.debugFolder.disabled = false
        this.active = this.next
        this.next = null
      },
    })
  }

  /**
   * Set debug
   */
  _setDebug(value) {
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
   * @param {string} _sceneName Scene name
   */
  init(_sceneName = 'default') {
    const scene = this.sceneList[_sceneName] || this.sceneList.default
    this.active = new scene()

    // Debug
    if (this.debug) {
      this._setDebug(this.sceneList[_sceneName] ? _sceneName : 'default')
    }
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
