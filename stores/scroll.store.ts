import type { ShallowRef } from 'vue'
import clamp from '~/utils/functions/clamp'

type TScroll = {
  current: number
  target: ShallowRef<number>
  speed: ShallowRef<number>
  factor: ShallowRef<number>
  disable: boolean
}

export const useScrollStore = defineStore('scroll', {
  state: (): TScroll => ({
    current: 0 as TScroll['current'], // 0-100
    target: shallowRef(0) as TScroll['target'], // 0-100
    speed: shallowRef(0.05) as TScroll['speed'], // 0-1
    factor: shallowRef(0.3) as TScroll['factor'], // 0-1
    disable: false,
  }),
  getters: {
    getCurrent(): TScroll['current'] {
      return this.current
    },
    getTarget(): number {
      return clamp(0, 100, this.target)
    },
    getSpeed(): number {
      return this.speed
    },
    getFactor(): number {
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
    setTarget(val: number) {
      if (!this.disable) {
        this.target = val
      }
    },
    instant(val: number) {
      this.target = val
      this.current = val
    },
    setSpeed(val: number) {
      this.speed = val
    },
    setFactor(val: number) {
      this.factor = val
    },
    setDisable(val: TScroll['disable']) {
      this.disable = val
    },
  },
})
