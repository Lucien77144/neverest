type THold = {
  cues: VTTCue[]
}

export const useSubtitlesStore = defineStore('subtitles', {
  state: (): THold => ({
    cues: [],
  }),
  getters: {
    getCues(): VTTCue[] {
      return this.cues
    },
  },
  actions: {
    setCues(val: VTTCue[]) {
      this.cues = { ...val }
    },
  },
})
