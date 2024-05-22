import { DoubleSide, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCTent_1_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_1_1953',
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
    this.item = this.resources.BCTent_1_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material  = new TextureCraieMaterial({
      side:2,
      color:'#FFD500',
      bgColor:'#F8ECE8',
      texture:this.resources.BCTent1_1953Texture
    }).instance
    
    //new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:8,
    //    borderSize:0,
    //    columnsOffset:-0.02,
    //    nbOfCurvePerColumns:85,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'down',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:2,
    //    maxThicknessCurve:1,
    //    nbOfPointsPerCurve:13,
    //    maxBorderSideDecalage:0.5
    //  },
    //  side:2,
    //  color:'#FFD500',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:0,
    //  displacementMapIntensity:2
    //}).instance
    
    
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()
  }
}
