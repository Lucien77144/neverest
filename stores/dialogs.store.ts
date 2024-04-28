import type { TSceneDialog } from '~/const/scenes.const'

type TDialogs = {
  list: TSceneDialog[]
}

export const useDialogsStore = defineStore('dialogs', {
  state: (): TDialogs => ({
    list: [],
  }),
  getters: {
    getList(): TDialogs['list'] {
      return this.list
    },
  },
  actions: {
    setList(list: TDialogs['list']) {
      this.list = list
    },
    addToList(el: TSceneDialog) {
      this.list = [...this.list, el]
    },
    removeFromList(id: TSceneDialog['id']) {
      this.list = [...this.list.filter((el) => el.id != id)]
    },
  },
})
