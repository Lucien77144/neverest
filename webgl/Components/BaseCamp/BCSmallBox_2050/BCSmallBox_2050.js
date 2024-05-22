import { DoubleSide, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCSmallBox_2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCSmallBox_2050',
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
    this.item = this.resources.BCSmallBox_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    //this.item.children[0].material = new MeshNormalMaterial()
    //this.item.children[0].material.side = DoubleSide
    //const material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:1,
    //    borderSize:0.1,
    //    columnsOffset:0.01,
    //    nbOfCurvePerColumns:6,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.5,
    //    maxCurveHorizontalDecalage:0.5,
    //    maxHeightCurve:1.5,
    //    maxThicknessCurve:10,
    //    nbOfPointsPerCurve:5,
    //    maxBorderSideDecalage:0.03
    //  },
    //  side:0,
    //  color:'#F7A1C4',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:1,
    //  displacementMapIntensity:0,
    //}).instance
    const material = new TextureCraieMaterial({
      side:0,
      color:'#F7A1C4',
      bgColor:'#F8ECE8',
      texture:this.resources.BCSmallBox_2050Texture
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
