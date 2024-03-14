import type { TSceneInfos } from '~/const/scenes.const'

type TNavigation = {
  scene?: TSceneInfos
  startPosition: number // Position of the current scene in %
  scale: number // Scale of the current scene
}

export const useNavigationStore = defineStore('navigation', {
  state: (): TNavigation => ({
    scene: undefined,
    startPosition: 0,
    scale: 0,
  }),
  getters: {
    getScene(): TNavigation['scene'] {
      return this.scene
    },
    getStartPosition(): TNavigation['startPosition'] {
      return this.startPosition
    },
    getScale(): TNavigation['scale'] {
      return this.scale
    },
  },
  actions: {
    setScene(scene: TNavigation['scene']) {
      this.scene = scene
    },
    setStartPosition(startPosition: TNavigation['startPosition']) {
      this.startPosition = startPosition
    },
    setScale(scale: TNavigation['scale']) {
      this.scale = scale
    },
  },
})
