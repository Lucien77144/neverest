import clamp from '~/utils/functions/clamp'

type TScroll = {
  current: number
  target: number
  speed: number
  factor: number
}

export const useScrollStore = defineStore('scroll', {
  state: (): TScroll => ({
    current: 0 as TScroll['current'], // 0-100
    target: 0 as TScroll['target'], // 0-100
    speed: 0.1 as TScroll['speed'], // 0-1
    factor: 0.1 as TScroll['factor'], // 0-1
  }),
  getters: {
    getCurrent(): TScroll['current'] {
      return this.current
    },
    getTarget(): TScroll['target'] {
      return clamp(0, 100, this.target)
    },
    getSpeed(): TScroll['speed'] {
      return this.speed
    },
    getFactor(): TScroll['factor'] {
      return this.factor
    },
  },
  actions: {
    setCurrent(val: TScroll['current']) {
      this.current = val
    },
    setTarget(val: TScroll['target']) {
      this.target = val
    },
    setSpeed(val: TScroll['speed']) {
      this.speed = val
    },
    setFactor(val: TScroll['factor']) {
      this.factor = val
    },
  },
})
