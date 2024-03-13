type TScroll = {
  scroll: number
}

export const useScrollStore = defineStore('scroll', {
  state: (): TScroll => ({
    scroll: 0 as TScroll['scroll'],
  }),
  getters: {
    getScroll(): TScroll['scroll'] {
      return this.scroll
    },
  },
  actions: {
    setScroll(val: TScroll['scroll']) {
      this.scroll = Math.round(val * 1000) / 100000
    },
  },
})
