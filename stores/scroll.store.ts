import clamp from '~/utils/functions/clamp'

type TScroll = {
  current: number
  target: number
  speed: number
  factor: number
  disable: boolean
}

export const useScrollStore = defineStore('scroll', {
  state: (): TScroll => ({
    current: 0 as TScroll['current'], // 0-100
    target: 0 as TScroll['target'], // 0-100
    speed: 0.05 as TScroll['speed'], // 0-1
    factor: 0.3 as TScroll['factor'], // 0-1
    disable: false,
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
    getDisable(): TScroll['disable'] {
      return this.disable
    },
  },
  actions: {
    setCurrent(val: TScroll['current']) {
      if (!this.disable) {
        this.current = val
      }
    },
    setTarget(val: TScroll['target']) {
      if (!this.disable) {
        this.target = val
      }
    },
    instant(val: TScroll['target'] | TScroll['current']) {
      this.target = val
      this.current = val
    },
    setSpeed(val: TScroll['speed']) {
      this.speed = val
    },
    setFactor(val: TScroll['factor']) {
      this.factor = val
    },
    setDisable(val: TScroll['disable']) {
      this.disable = val
    },
  },
})
