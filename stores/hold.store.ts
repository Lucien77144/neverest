type THold = {
  progress: number
  complete: boolean
}

export const useHoldStore = defineStore('hold', {
  state: (): THold => ({
    progress: 0 as THold['progress'], // 0-100
    complete: false,
  }),
  getters: {
    getProgress(): THold['progress'] {
      return this.progress
    },
    getComplete(): THold['complete'] {
      return this.complete
    },
  },
  actions: {
    setProgress(val: THold['progress']) {
      this.progress = val
      if (val >= 100) {
        this.complete = true
      } else if (!val) {
        this.complete = false
      }
    },
  },
})
