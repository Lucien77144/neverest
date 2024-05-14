type TSubtitle = {
  cues: VTTCue[]
}

export const useSubtitlesStore = defineStore('subtitles', {
  state: (): TSubtitle => ({
    cues: [],
  }),
  getters: {
    getCues(): TSubtitle['cues'] {
      return this.cues
    },
  },
  actions: {
    setCues(val: TSubtitle['cues']) {
      this.cues = { ...val }
    },
  },
})
