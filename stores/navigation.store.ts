import type { TSceneInfos } from '~/const/scenes.const'

type TNavigation = {
  scene?: TSceneInfos
}

export const useNavigationStore = defineStore('navigation', {
  state: (): TNavigation => ({
    scene: undefined,
  }),
  getters: {
    getScene(): TNavigation['scene'] {
      return this.scene
    },
  },
  actions: {
    setScene(scene: TNavigation['scene']) {
      this.scene = scene
    },
  },
})
