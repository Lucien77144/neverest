import { MeshToonMaterial } from 'three'
import scenes from '~/const/scenes.const'
import Experience from '~/webgl/Experience'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

export default class Mountain extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // Get elements from experience
    this.experience = new Experience()
    this.resources = this.experience.resources.items

    this.$bus = this.experience.$bus

    // New elements
    this.geometry = null
    this.material = null
    this.test = null
  }

  setMaterial() {
    this.material = new CraieMaterial({
      textureParams:{
        textureSize:1024,
        nbOfColumns:1,
        borderSize:0.05,
        columnsOffset:-0.01,
        nbOfCurvePerColumns:15,
        areCurveOnSameDirection:true,
        curveDirection:'up',
        curveDirectionAmountFactor:0.4,
        maxCurveHorizontalDecalage:0.3,
        maxHeightCurve:1,
        maxThicknessCurve:3,
        nbOfPointsPerCurve:10,
        maxBorderSideDecalage:0.5
      },
      side:0,
      color:'#93AAF2',
      bgColor:'#F8ECE8',
      displacementMap:this.resources.ground2024,
      displacementMapIntensity:2
    }).instance
  }

  setItem() {
    const item = this.resources.introMountain.scene.clone()
    console.log(item)
    this.item = item.children[0]
    this.item.position.y-=2
    this.item.rotation.x = -Math.PI * 0.5
    this.item.scale.set(0.0028, 0.0028, 0.0028)
    this.item.material = this.material
  }

  onHold() {
    const scene = scenes.nav.list.find((s) => s.name === 'basecamp')

    scene && this.$bus.emit('scene:switch', scene)
  }

  init() {
    this.setMaterial()
    this.setItem()
  }
}
