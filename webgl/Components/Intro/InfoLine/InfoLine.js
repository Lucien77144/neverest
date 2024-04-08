
import { BufferGeometry, Line, LineBasicMaterial, RawShaderMaterial, ShaderMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import InfoLineVert from './InfoLineShader/InfoLineShader.vert?raw'
import InfoLineFrag from './InfoLineShader/InfoLineShader.frag?raw'

export default class InfoLine extends BasicItem {
    constructor(points, text) {
        super()
    
        // New elements
        this.geometry = null
        this.material = null
        this.points = points
        
    
        // Init
        this.init()
      }
    
      /**
       * Get geometry
       */
      setGeometry() {
        this.geometry = new BufferGeometry().setFromPoints(this.points)
      }
    
      /**
       * Get material
       */
      setMaterial() {
        this.material = new RawShaderMaterial({
            vertexShader:InfoLineVert,
            fragmentShader:InfoLineFrag,
            uniforms:{

            },
            
        })
      }
    
      /**
       * Get mesh
       */
      setMesh() {
        this.item = new Line(this.geometry, this.material)
        console.log(this.item)
      }

      init(){
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
      }

      update(){
        //console.log(this.material)
      }
}
