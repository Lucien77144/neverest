import { DoubleSide, InstancedMesh, MeshBasicMaterial, MeshNormalMaterial, Object3D } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { BCTENT_2_1953 } from '~/const/blocking/baseCamp.const'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

export default class BCTent_2_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_2_1953',
    visibility = [0, 100],
    isInstances = true,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.isInstances = isInstances

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set Instances
   */
  setInstances() {
    const instance = this.resources.BCTent_2_1953.scene.children[0]
    //const material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:2048,
    //    nbOfColumns:7,
    //    borderSize:0.05,
    //    columnsOffset:-0.01,
    //    nbOfCurvePerColumns:15,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:1,
    //    maxThicknessCurve:3,
    //    nbOfPointsPerCurve:10,
    //    maxBorderSideDecalage:0.5
    //  },
    //  side:0,
    //  color:'#93AAF2',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:1,
    //  displacementMapIntensity:0,
    //}).instance
    const dummy = new Object3D()

    this.item = new InstancedMesh(
      instance.geometry,
      new MeshNormalMaterial(),
      BCTENT_2_1953.length
    )

    BCTENT_2_1953.forEach((el, i) => {
      dummy.position.set(el.position.x, el.position.y, el.position.z)
      dummy.rotation.set(el.rotation.x, el.rotation.y, el.rotation.z)
      dummy.updateMatrix()
      this.item.setMatrixAt(i, dummy.matrix)
    })

    this.item.instanceMatrix.needsUpdate = true
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_2_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    
  }

  /**
   * Init
   */
  init() {
    this.isInstances && this.setInstances()
    !this.isInstances && this.setItem()
    !this.isInstances && this.setMaterial()
  }
}
