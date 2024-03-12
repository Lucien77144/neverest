type TDebug = {
  landing: boolean
  scene: string
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
      landing: !!local?.landing as TDebug['landing'],
      scene: local?.scene || 'default',
    }
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
  },
})
