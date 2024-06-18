import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three"
import Experience from "~/webgl/Experience"
import BasicItem from "~/webgl/Modules/Basics/BasicItem"

export default class PlaneTextureIntro extends BasicItem {
    /**
     * Constructor
     */
    constructor() {
      super()
      // Get elements from experience
      this.experience = new Experience()
      this.resources = this.experience.resources.items
  
      this.$bus = this.experience.$bus
  
      // New elements
      this.geometry = null
      this.material = null
      this.test = null
    }

    setGeometry(){
        this.geometry = new PlaneGeometry(3.205,1.8)
    }  
    
    setMaterial(){
        this.material = new MeshBasicMaterial({
            map:this.resources.introImg,
            side:0
        })
    }



 
  
    init() {
     this.setGeometry()
     this.setMaterial()
     this.item = new Mesh(this.geometry,this.material)
    }
  }