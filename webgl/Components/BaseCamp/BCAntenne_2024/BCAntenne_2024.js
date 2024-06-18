import {
  Vector3,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import ModalSprite from '../../Shared/ModalSprite/ModalSprite'

export default class BCAntenne_2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCAntenne_2024',
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
    this.time = this.experience.time
  }

  /**
   * Set item
   */
  setBCAntenne() {
    this.item = this.resources.BCAntenne_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name

    //this.item.children[0].material =  new CraieMaterial({
    //    textureParams:{
    //      textureSize:1024,
    //      nbOfColumns:1,
    //      borderSize:0,
    //      columnsOffset:0.04,
    //      nbOfCurvePerColumns:30,
    //      areCurveOnSameDirection:false,
    //      curveDirection:'up',
    //      curveDirectionAmountFactor:0.4,
    //      maxCurveHorizontalDecalage:0.3,
    //      maxHeightCurve:5,
    //      maxThicknessCurve:2,
    //      nbOfPointsPerCurve:10,
    //      maxBorderSideDecalage:0.1
    //    },
    //    side:0,
    //    color:'#D6E0EA',
    //    bgColor:'#F8ECE8',
    //    displacementMap:this.resources.ground2024,
    //    isMapEnable:0,
    //    displacementMapIntensity:0,
    //  }).instance
    // this.item.children[0].material  = new TextureCraieMaterial({
    //   side:0,
    //   color:'#96551d',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCFlagPoleTexture
    // }).instance
  }

  /**
   * Init
   */
  init() {
    this.setBCAntenne()
  }
}
