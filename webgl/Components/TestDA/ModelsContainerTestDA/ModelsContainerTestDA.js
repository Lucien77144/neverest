import Experience from '~/webgl/Experience'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { ModelTestDA } from './ModelTestDA/ModelTestDA'

export default class ModelsContainerTestDA extends BasicItem {
  constructor() {
    super()

    this.experience = new Experience()
    this.resources = this.experience.resources.items
    this.debug = this.experience.debug
    this.debugFolder = this.debug.panel.addFolder({
      title: 'UV Mapping Scene',
    })

    this.currentModelId = 0
  }

  setUpModels() {
    let componentsPlaceHolder = {}
    let modelId = 0
    for (const [key, value] of Object.entries(this.resources)) {
      if (value.scene) {
        componentsPlaceHolder[`${key}`] = new ModelTestDA({
          id: modelId,
          name: key,
          currentModelId: this.currentModelId,
          scene: value.scene,
          rootDebugger: this.debugFolder,
        })
        modelId += 1
      }
    }
    this.components = componentsPlaceHolder
  }

  setUpDebbuger() {
    const keys = Object.keys(this.components)
    const currentModelIdOptions = {}
    keys.forEach((key, id) => {
      currentModelIdOptions[`${key}`] = id
    })
    this.debugFolder
      .addBinding(this, 'currentModelId', {
        options: currentModelIdOptions,
      })
      .on('change', () => {
        Object.values(this.components).forEach((component) => {
          component.currentModelId = this.currentModelId
          component.updateDebugger()
        })
      })
  }

  init() {
    this.setUpModels()
    this.setUpDebbuger()
  }
}
