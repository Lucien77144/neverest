import scenes from '~/const/scenes.const'

type TDebug = {
  landing: boolean
  scene: string
  persistScene: boolean
  wireframe:boolean
}

/**
 * Set local storage
 * @param data - debug data
 */
function setLocalStorage(data: TDebug) {
  localStorage.setItem('debug', JSON.stringify(data))
}

export const useDebugStore = defineStore('debug', {
  state: (): TDebug => {
    const local = JSON.parse(localStorage.getItem('debug') || '{}')

    return {
      landing: !!local?.landing,
      wireframe: !!local?.wireframe,
      scene: local?.scene || scenes.default.name,
      persistScene: !!local?.persistScene,
    }
  },
  getters: {
    getLanding(): TDebug['landing'] {
      return this.landing
    },
    getScene(): TDebug['scene'] {
      return this.persistScene ? this.scene : scenes.default.name
    },
    getPersistScene(): TDebug['persistScene'] {
      return !!this.persistScene
    },
  },
  actions: {
    toggleLanding() {
      this.landing = !this.landing
      setLocalStorage(this.$state)
    },
    setScene(scene: string) {
      this.scene = scene
      setLocalStorage(this.$state)
    },
    togglePersistScene() {
      this.persistScene = !this.persistScene
      setLocalStorage(this.$state)
    },
  },
})
