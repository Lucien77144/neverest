import { DoubleSide, InstancedMesh, MeshNormalMaterial, Object3D } from 'three'
import { BCTENT_3_2024 } from '~/const/blocking/baseCamp.const'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCTent_3_2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_3_2024',
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
    //const material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:2,
    //    borderSize:0,
    //    columnsOffset:-0.02,
    //    nbOfCurvePerColumns:25,
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
    //  color:'#556B2F',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:0,
    //  displacementMapIntensity:2
    //}).instance
    // const material = new TextureCraieMaterial({
    //   side:0,
    //   color:'#556B2F',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCTent3_2024Texture
    // }).instance
    
    const instance = this.resources.BCTent_3_2024.scene.children[0]
    const dummy = new Object3D()
    this.item = new InstancedMesh(
      instance.geometry,
      instance.material,
      BCTENT_3_2024.length
    )

    BCTENT_3_2024.forEach((el, i) => {
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
    this.item = this.resources.BCTent_3_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material = new MeshNormalMaterial()
    this.item.children[0].material.side = DoubleSide
  }

  /**
   * Init
   */
  init() {
    this.isInstances && this.setInstances()
    !this.isInstances && this.setItem()
    // !this.isInstances && this.setMaterial()
  }
}
