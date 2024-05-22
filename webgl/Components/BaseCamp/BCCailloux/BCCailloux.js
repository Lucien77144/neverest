import { DoubleSide, MeshBasicMaterial, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCCailloux extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCCailloux',
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
    this.item = this.resources.BCCailloux.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    //const material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:1,
    //    borderSize:0,
    //    columnsOffset:-0.02,
    //    nbOfCurvePerColumns:20,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'down',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:2,
    //    maxThicknessCurve:2,
    //    nbOfPointsPerCurve:4,
    //    maxBorderSideDecalage:0.5
    //  },
    //  side:0,
    //  color:'#0F2310',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:0,
    //  displacementMapIntensity:0
    //}).instance

    const material = new TextureCraieMaterial({
      side:0,
      color:'#0F2310',
      bgColor:'#F8ECE8',
      texture:this.resources.BCCaillouTexture
    }).instance
    this.item.children[0].material = material
    
  }

  /**
   * Init the floor
   */
  init() {
    this.setItem()
    this.setMaterial()
  }
}
