type TScroll = {
  current: number
}

export const useScrollStore = defineStore('scroll', {
  state: (): TScroll => ({
    current: 0 as TScroll['current'],
  }),
  getters: {
    getCurrent(): TScroll['current'] {
      return this.current
    },
  },
  actions: {
    setCurrent(current: TScroll['current']) {
      this.current = Math.round(current * 1000) / 100000
    },
  },
})
