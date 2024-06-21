import { AdditiveBlending, LinearMipMapLinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, NearestFilter, NormalBlending, PlaneGeometry, SRGBColorSpace } from "three"
import Experience from "~/webgl/Experience"
import BasicItem from "~/webgl/Modules/Basics/BasicItem"

export default class PlaneTextureIntro extends BasicItem {
    /**
     * Constructor
     */
    constructor(
        texture,
        zPos,
        width,
        height,
        parallaxMultiplier,
        yPos,
        xPos
    ) {
      super()
      // Get elements from experience
      this.experience = new Experience()
      
  
      this.$bus = this.experience.$bus


      this.texture = texture
      this.texture.magFilter = NearestFilter;
      this.texture.minFilter = LinearMipMapLinearFilter;
      this.texture.encoding = SRGBColorSpace;
      this.zPos = zPos
      this.width = width
      this.height = height
      this.parallaxMultiplier = parallaxMultiplier
      this.yPos = yPos
      this.xPos = xPos
  
      // New elements
      this.geometry = null
      this.material = null
      this.test = null
      this.cursorXPos = 0
    }

    setGeometry(){
        this.geometry = new PlaneGeometry(this.width,this.height)
    }  
    
    setMaterial(){
        this.material = new MeshBasicMaterial({
            map:this.texture,
            side:0,
            transparent:true,
            blending:NormalBlending
        })
    }



 
  
    init() {
     this.setGeometry()
     this.setMaterial()
     this.item = new Mesh(this.geometry,this.material)
     this.item.position.z = this.zPos
     this.item.position.y = this.yPos
     this.item.position.x = this.xPos
    }


    update(){
        this.item.position.x = this.cursorXPos * this.parallaxMultiplier * 0.3
    }


  }