import { DoubleSide, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

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
    this.item.children[0].material  = new CraieMaterial({
      textureParams:{
        textureSize:2048,
        nbOfColumns:2,
        borderSize:0.2,
        columnsOffset:-0.01,
        nbOfCurvePerColumns:35,
        areCurveOnSameDirection:false,
        curveDirection:'up',
        curveDirectionAmountFactor:0.4,
        maxCurveHorizontalDecalage:0.3,
        maxHeightCurve:3,
        maxThicknessCurve:1,
        nbOfPointsPerCurve:8,
        maxBorderSideDecalage:0.5
      },
      side:0,
      color:'#B34A4A',
      bgColor:'#F8ECE8',
      displacementMap:this.resources.ground2024,
      isMapEnable:0,
      displacementMapIntensity:2
    }).instance
    this.item.children[0].material.side = DoubleSide
    console.log(this.resources.ground2024)
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()
  }
}
