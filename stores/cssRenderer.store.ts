type TCSSRendererStore = {
  id: string
  template: any // component to render
  parent?: THREE.Object3D | THREE.Group | THREE.Scene // Parent object to attach
  position?: THREE.Vector3 // Position of the element
  rotation?: THREE.Euler // Rotation of the element
  scalar?: number // Scale of the element
  layers?: number[] | number // Layers to render the element
  el?: Element | ComponentPublicInstance | null // Component ref
  data?: any // Data to pass to the component
}

export interface ICSS2DRendererStore extends TCSSRendererStore {
  center?: THREE.Vector2 // Center the element
}
export interface ICSS3DRendererStore extends TCSSRendererStore {
  sprite?: boolean // Render as sprite
}

type TCSSRenderer = {
  css2DList: ICSS2DRendererStore[]
  css3DList: ICSS3DRendererStore[]
}

export const useCSSRendererStore = defineStore('cssRenderer', {
  state: (): TCSSRenderer => ({
    css2DList: [],
    css3DList: [],
  }),
  getters: {
    get2DList(): TCSSRenderer['css2DList'] {
      return this.css2DList
    },
    get3DList(): TCSSRenderer['css3DList'] {
      return this.css3DList
    },
  },
  actions: {
    // 2D
    setCSS2DList(css2DList: TCSSRenderer['css2DList']) {
      this.css2DList = css2DList
    },
    addToCSS2DList(el: ICSS2DRendererStore) {
      this.css2DList.push(el)
      this.css2DList = [...this.css2DList]
    },
    removeFromCSS2DList(id: ICSS2DRendererStore['id']) {
      this.css2DList = [...this.css2DList.filter((el) => el.id != id)]
    },

    // 3D
    setCSS3DList(css3DList: TCSSRenderer['css3DList']) {
      this.css3DList = css3DList
    },
    addToCSS3DList(el: ICSS3DRendererStore) {
      this.css3DList.push(el)
      this.css3DList = [...this.css3DList]
    },
    removeFromCSS3DList(id: ICSS3DRendererStore['id']) {
      this.css3DList = [...this.css3DList.filter((el) => el.id != id)]
    },
  },
})
