import { DoubleSide, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

export default class BCMountainL extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCMountainL',
    visibility = [0, 100],
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCMountainL.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    //this.item.children[0].material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:5,
    //    borderSize:0,
    //    columnsOffset:0.04,
    //    nbOfCurvePerColumns:12,
    //    areCurveOnSameDirection:false,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:1,
    //    maxThicknessCurve:1.5,
    //    nbOfPointsPerCurve:20,
    //    maxBorderSideDecalage:0.1
    //  },
    //  side:0,
    //  color:'#D6E0EA',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:0,
    //  displacementMapIntensity:0,
    //}).instance
    this.item.children[0].material  = new TextureCraieMaterial({
      side:0,
      color:'#E4EAF1',
      bgColor:'#F8ECE8',
      texture:this.resources.BCMountainLTexture
    }).instance
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()
  }
}
