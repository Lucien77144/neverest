import { Group, Vector3 } from "three";
import BasicItem from "~/webgl/Modules/Basics/BasicItem";
import Mountain from "../Mountain/Mountain";
import InfoLine from "../InfoLine/InfoLine";

export default class IntroGroup extends BasicItem {

    constructor(){
        super()
        
        this.sceneObjects = null

        this.init()
    }

    addItems(){
        this.sceneObjects = {
            mountain:new Mountain(),
            infoLine1:new InfoLine([new Vector3(2,0,0),new Vector3(2,5,0),new Vector3(3,7,0)],'AAAAA')
        }

        for (const [key, value] of Object.entries(this.sceneObjects)) {
            this.item.add(value.item)
        }
    }

    init(){
        this.item = new Group()
        this.addItems()

    }

    update(){
        if(this.item){
            this.item.rotation.y+= 0.005
        }
        if(this.sceneObjects){
            for (const [key, value] of Object.entries(this.sceneObjects)) {
                value.update?.()
            }
        }
    }
}