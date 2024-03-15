import type { TSceneInfos } from '~/const/scenes.const'

type TNavigation = {
  scene?: TSceneInfos
  start: number // Position of the current scene in %
  scale: number // Scale of the current scene
}

export const useNavigationStore = defineStore('navigation', {
  state: (): TNavigation => ({
    scene: undefined,
    start: 0,
    scale: 0,
  }),
  getters: {
    getScene(): TNavigation['scene'] {
      return this.scene
    },
    getStart(): TNavigation['start'] {
      return this.start
    },
    getScale(): TNavigation['scale'] {
      return this.scale
    },
  },
  actions: {
    setScene(scene: TNavigation['scene']) {
      this.scene = scene
    },
    setStart(start: TNavigation['start']) {
      this.start = start
    },
    setScale(scale: TNavigation['scale']) {
      this.scale = scale
    },
  },
})
