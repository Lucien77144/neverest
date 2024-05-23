import { MeshToonMaterial } from 'three'
import scenes from '~/const/scenes.const'
import Experience from '~/webgl/Experience'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import MountainCraieMaterial from '../../Shared/MountainCraieMaterial/MountainCraieMaterial'

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
    //this.material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:1,
    //    borderSize:0,
    //    columnsOffset:-0.01,
    //    nbOfCurvePerColumns:55,
    //    areCurveOnSameDirection:false,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:6,
    //    maxThicknessCurve:0.2,
    //    nbOfPointsPerCurve:10,
    //    maxBorderSideDecalage:0.1 
    //  },
    //  side:0,
    //  color:'#93AAF2',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  displacementMapIntensity:2
    //}).instance
    this.material = new MountainCraieMaterial({
      side:0,
      color:'#93AAF2',
      bgColor:'#F8ECE8',
      texture:this.resources.introMountainTexture
    }).instance
  }

  setItem() {
    const item = this.resources.introMountain.scene.clone()
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
