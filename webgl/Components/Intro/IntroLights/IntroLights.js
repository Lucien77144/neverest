import { AmbientLight, DirectionalLight, Group, Vector3 } from "three"
import BasicItem from "~/webgl/Modules/Basics/BasicItem"

export default class IntroLights extends BasicItem {
    constructor() {
      super()
  

    }
  
    setLights(){
        let aLight = new AmbientLight(0xFFFFFF,0.5)
        let dLight =  new DirectionalLight(0xFFFFFF,2.5)
        dLight.position.set(2,2,2)
        dLight.lookAt(new Vector3(0,0,0))
        this.lights = [
            aLight,
            dLight
        ]
    }

    setGroup(){
        let lightGroup = new Group()
        this.lights.forEach(l=>lightGroup.add(l))
        this.item = lightGroup
    }
  
    
  
    init() {
      this.setLights()
      this.setGroup()
    }
  
  
  
    
  
  }