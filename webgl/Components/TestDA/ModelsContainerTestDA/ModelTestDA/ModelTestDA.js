import Experience from "~/webgl/Experience";
import BasicItem from "~/webgl/Modules/Basics/BasicItem";

export class ModelTestDA extends BasicItem {
    constructor({id,name,currentModelId,scene,rootDebugger}){
        super()

        this.experience = new Experience()
        
        this.id = id
        this.name = name
        this.currentModelId = currentModelId
        this.scene = scene
        this.rootDebugger = rootDebugger
        this.debugFolder = null
    }

    setUpModel(){
        this.item = this.scene.clone()
        this.item.visible = (this.currentModelId === this.id)
    }

    setUpModelDebugger(){
        this.debugFolder = this.rootDebugger.addFolder({
            title:this.name,
            expanded:!(this.currentModelId === this.id),
            disabled:!(this.currentModelId === this.id)
        })
        this.debugFolder.addBinding(this.item,'position',{
            label:'Position',

        })
    }

    updateDebugger(){
        this.item.visible = (this.currentModelId === this.id)
        this.debugFolder.expanded = !(this.currentModelId === this.id)
        this.debugFolder.disabled = !(this.currentModelId === this.id)
    }

    init(){
        this.setUpModel()
        this.setUpModelDebugger()
    }
}