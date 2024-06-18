import { DoubleSide, MeshBasicMaterial, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'
import { log } from 'three/examples/jsm/nodes/Nodes.js'

export default class BCMountainRS_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCMountainRS_1953',
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
    this.item = this.resources.BCMountainRS_1953.scene.clone()
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
    //    nbOfCurvePerColumns:13,
    //    areCurveOnSameDirection:false,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:2.5,
    //    maxThicknessCurve:4,
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
    // this.item.children[0].material  = new TextureCraieMaterial({
    //   side:0,
    //   color:'#D6E0EA',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCMountainRSTexture
    // }).instance
    this.item.children[0].material = new MeshBasicMaterial({
      side: DoubleSide,
      map: this.resources.BCMountainRS_1953_texture,
    })

    // flip the texture
    this.item.children[0].material.map.flipY = false
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()
  }
}
