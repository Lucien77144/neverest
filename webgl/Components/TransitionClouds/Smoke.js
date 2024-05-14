import { AdditiveBlending, AxesHelper, DoubleSide, Group, InstancedMesh, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Sprite, Vector3 } from "three";
import Experience from "../Experience";
import { randomBetween } from "../Utils/Math";

export default class Smoke extends Group{
  constructor(count = 200, radiusH = 10, radiusV = 10, opacity = 1, minScale = 3, maxScale = 6, color = 0xffffff){
    super();
    
    const experience = new Experience();
    this.resources = experience.resources;
    this.camera = experience.camera;

    this.mesh = new InstancedMesh(
      new PlaneGeometry(1,1),
      new MeshBasicMaterial({
        map: this.resources.items.smoke,
        transparent:true,
        depthTest:false,
        depthWrite:false,
        opacity,
        blending:AdditiveBlending,
        color
      }),
      count
    );
    this.add(this.mesh)
    

    const speed = .4;
    this.particle = new Object3D();
    this.particles = [];
    for( let i = 0; i < count; i++ ){
      const particle = {
        rotation: Math.random() * Math.PI,
        speed: -speed + Math.random() * (speed * 2),
        position: new Vector3(
          -radiusH + Math.random() * (radiusH * 2),
          -radiusV + Math.random() * (radiusV * 2),
          -radiusH + Math.random() * (radiusH * 2),
        ), 
        scale: randomBetween(minScale, maxScale),
      }
      this.particles.push(particle);

      this.updateInstance(i);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  } 

  updateInstance(index){
      const particle = this.particles[index];
      this.particle.position.copy(particle.position);
      this.particle.scale.setScalar(particle.scale);
      this.particle.lookAt(this.camera.instance.position);
      this.particle.rotation.z = particle.rotation;
      this.particle.updateMatrix();
      this.mesh.setMatrixAt(index, this.particle.matrix);
  }

  update(dt){
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.rotation += particle.speed * dt;
      this.updateInstance(i);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}