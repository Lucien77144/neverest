import { AdditiveBlending, BoxGeometry, InstancedMesh, Mesh, MeshBasicMaterial, MeshNormalMaterial, Object3D, PlaneGeometry, Vector3 } from "three";
import Experience from "~/webgl/Experience";
import BasicItem from "~/webgl/Modules/Basics/BasicItem";

export default class CloudsGroup extends BasicItem {

    constructor(){
        super()

        this.experience = new Experience()
        
        this.resources = this.experience.resources

        this.item = null
        this.geometry = null
        this.material = null
        this.mesh = null
        this.particle = null
        this.particles = null
    }

    createItem(){
        this.geometry = new PlaneGeometry(1,1)
        this.material = new MeshBasicMaterial({
            map: this.resources.items.CloudImg,
            transparent:true,
            depthTest:false,
            depthWrite:false,
            opacity:1,
            blending:AdditiveBlending,
            color:0xFFFFFF
        })
        this.mesh = new InstancedMesh(
            this.geometry,
            this.material,
            200
        )
        this.item = this.mesh

        const speed = .4;
        const radiusH = 1
        const radiusV = 1
        this.particle = new Object3D();
        this.particles = [];
        for( let i = 0; i < 200; i++ ){
            const particle = {
                rotation: Math.random() * Math.PI,
                speed: -speed + Math.random() * (speed * 2),
                position: new Vector3(
                    -radiusH + Math.random() * (radiusH * 2),
                    -radiusV + Math.random() * (radiusV * 2),
                    -radiusH + Math.random() * (radiusH * 2),
                ), 
                scale: Math.random(),
            }
            this.particles.push(particle);

            this.updateInstance(i);
        }

        this.item.instanceMatrix.needsUpdate = true;
    }

    updateInstance(index){
        const particle = this.particles[index];
        this.particle.position.copy(particle.position);
        this.particle.scale.setScalar(particle.scale);
        this.particle.lookAt(new Vector3(0,0,10));
        this.particle.rotation.z = particle.rotation;
        this.particle.updateMatrix();
        this.item.setMatrixAt(index, this.particle.matrix);
    }

    init(){
        this.createItem()
    }

    update(dt){
        for (let i = 0; i < this.particles.length; i++) {
          const particle = this.particles[i];
          particle.rotation += particle.speed * dt;
          this.updateInstance(i);
        }
        this.item.instanceMatrix.needsUpdate = true;
      }

}