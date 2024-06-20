import {
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCFloor_2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCFloor_2024',
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
   * Get geometry
   */
  setItem() {
    this.item = this.resources.BCFloor_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Get material
   */
  setMaterial() {
    //this.material = new MeshNormalMaterial({})
    //this.material.displacementMap = this.resources.items.ground1953
    //this.material.displacementScale = 10
//
    //this.material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:3,
    //    borderSize:0.1,
    //    columnsOffset:0.04,
    //    nbOfCurvePerColumns:4,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:1,
    //    maxThicknessCurve:4,
    //    nbOfPointsPerCurve:20,
    //    maxBorderSideDecalage:0.1
    //  },
    //  side:0,
    //  color:'#b1c4d8',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.items.ground2024,
    //  isMapEnable:0,
    //  displacementMapIntensity:0,
    //}).instance

    // this.material = new TextureCraieMaterial({
    //   side:0,
    //   color:'#b1c4d8',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCFloorTexture
    // }).instance
    
    this.material = new MeshBasicMaterial({
      color: 0xffffff,
      side: 2,
    })
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    // this.setMaterial()
  }
}
