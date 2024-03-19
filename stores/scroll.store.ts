import clamp from '~/utils/functions/clamp'

type TScroll = {
  current: number
  target: number
}

export const useScrollStore = defineStore('scroll', {
  state: (): TScroll => ({
    current: 0 as TScroll['current'], // 0-100
    target: 0 as TScroll['target'], // 0-100
  }),
  getters: {
    getCurrent(): TScroll['current'] {
      return this.current
    },
    getTarget(): TScroll['target'] {
      return clamp(0, 100, this.target)
    },
  },
  actions: {
    setCurrent(val: TScroll['current']) {
      this.current = val
    },
    setTarget(val: TScroll['target']) {
      this.target = val
    },
  },
})
