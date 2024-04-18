type THold = {
  cues: VTTCue[],
  disabled: boolean,
}

export const useSubtitlesStore = defineStore('subtitles', {
  state: (): THold => ({
    cues: [],
    disabled: false,
  }),
  getters: {
    getCues(): VTTCue[] {
      return this.cues
    },
    getDisabled(): boolean {
      return this.disabled
    },
  },
  actions: {
    setCues(val: VTTCue[]) {
      this.cues = { ...val }
    },
    setDisabled(val: boolean) {
      this.disabled = val
    },
  },
})
