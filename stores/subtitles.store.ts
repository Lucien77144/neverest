type TSubtitle = {
  cues: VTTCue[]
  disabled: boolean
}

export const useSubtitlesStore = defineStore('subtitles', {
  state: (): TSubtitle => ({
    cues: [],
    disabled: false,
  }),
  getters: {
    getCues(): TSubtitle['cues'] {
      return this.cues
    },
    getDisabled(): TSubtitle['disabled'] {
      return this.disabled
    },
  },
  actions: {
    setCues(val: TSubtitle['cues']) {
      this.cues = { ...val }
    },
    setDisabled(val: TSubtitle['disabled']) {
      this.disabled = val
    },
  },
})
