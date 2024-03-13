export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    preset: [] as TPreset[],
  }),
  getters: {
    getPreset(): TPreset[] {
      return this.preset
    },
  },
  actions: {
    setPreset(d: TPreset[]) {
      this.preset = d
    },
  },
})
