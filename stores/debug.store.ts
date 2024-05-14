import scenes from '~/const/scenes.const'

type TDebug = {
  landing: boolean
  scene: string
  persistScene: boolean
  wireframe: boolean
}

/**
 * Set local storage
 * @param data - debug data
 */
function setLocalStorage(data: TDebug) {
  localStorage.setItem('debug', JSON.stringify(data))
}

export const useDebugStore = defineStore('debug', {
  state: (): TDebug => ({
    landing: false,
    scene: 'default',
    persistScene: false,
    wireframe: false,
  }),
  getters: {
    getLanding(): TDebug['landing'] {
      return this.landing
    },
    getScene(): TDebug['scene'] {
      return this.persistScene ? this.scene : scenes.default.name
    },
    getPersistScene(): TDebug['persistScene'] {
      return this.persistScene
    },
    getWireframe(): TDebug['persistScene'] {
      return this.wireframe
    },
  },
  actions: {
    init(data: TDebug) {
      this.landing = data.landing
      this.scene = data.scene
      this.persistScene = data.persistScene
    },
    toggleLanding() {
      this.landing = !this.landing
      setLocalStorage(this.$state)
    },
    setScene(scene: string) {
      this.scene = scene
      setLocalStorage(this.$state)
    },
    toggleWireframe() {
      this.wireframe = !this.wireframe
      setLocalStorage(this.$state)
    },
    togglePersistScene() {
      this.persistScene = !this.persistScene
      setLocalStorage(this.$state)
    },
  },
})
