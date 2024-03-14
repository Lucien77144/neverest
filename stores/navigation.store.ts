import type { TSceneInfos } from '~/const/scenes.const'

type TNavigation = {
  scene?: TSceneInfos
  progress: number
}

export const useNavigationStore = defineStore('navigation', {
  state: (): TNavigation => ({
    scene: undefined,
    progress: 0,
  }),
  getters: {
    getScene(): TNavigation['scene'] {
      return this.scene
    },
    getProgress(): TNavigation['progress'] {
      return this.progress
    },
  },
  actions: {
    setScene(scene: TNavigation['scene']) {
      this.scene = scene
    },
    setProgress(progress: TNavigation['progress']) {
      this.progress = progress
    },
  },
})
