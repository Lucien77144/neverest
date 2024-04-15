import { Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import Mountain from '../Mountain/Mountain'
import InfoLine from '../InfoLine/InfoLine'
import IntroLights from '../IntroLights/IntroLights'

export default class IntroGroup extends BasicItem {
  constructor() {
    super()

    
    this.labelRenderer = null
  }

  setCameraPos(){
    this.parentScene.camera.instance.position.set(0,10,50)
    this.parentScene.camera.instance.lookAt(new Vector3(0,0,0))   
  }

  addComponents() {
    this.components = {
      mountain: new Mountain(),
      infoLine1: new InfoLine(
        [new Vector3(0, 0, 0), new Vector3(0, 15, 0), new Vector3(-5, 17, 0)],
        new Vector3(-5, -9, 10),
        'Base Camp',
        new Vector3(-7, 19, 0),
        'labelCampDeBase'
      ),
      infoLine2: new InfoLine(
        [new Vector3(0, 0, 0), new Vector3(0, 4, 0), new Vector3(1, 5, 0)],
        new Vector3(2, 0, 0),
        'Col Sud',
        new Vector3(2, 5.5, 0),
        'labelColSud'
      ),
      lights:new IntroLights()
    }
  }

  setLabelRenderer() {
    this.labelRenderer = new LabelRenderer(
      this.parentScene.scene,
      this.parentScene.camera,
      [
        this.components.infoLine1,
        this.components.infoLine2
      ]
    )
    this.labelRenderer.init()
  }

  init() {
    this.setCameraPos()
    this.addComponents()
  }



  update() {
    if (this.item) {
      this.item.rotation.y += 0.005
    }
    if (this.labelRenderer) {
      this.labelRenderer.update()
    }

  }

}
