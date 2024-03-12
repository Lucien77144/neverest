type TScroll = {
  current: number
}

export const useScrollStore = defineStore('scroll', {
  state: (): TScroll => ({
    current: 0 as TScroll['current'],
  }),
  actions: {
    setCurrent(current: TScroll['current']) {
      this.current = current
    },
  },
})
