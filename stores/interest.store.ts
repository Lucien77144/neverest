export type TInterest = {
  interest?: {
    date: string
    title: string
  }
  visible: boolean
}

export const useInterestStore = defineStore('interest', {
  state: (): TInterest => ({
    interest: undefined,
    visible: false,
  }),
  getters: {
    getInterest(): TInterest['interest'] {
      return this.interest
    },
    getVisible(): TInterest['visible'] {
      return this.visible
    },
  },
  actions: {
    setInterest(interest: TInterest['interest']) {
      this.interest = interest
    },
    setVisible(visible: TInterest['visible']) {
      this.visible = visible
    },
  },
})
