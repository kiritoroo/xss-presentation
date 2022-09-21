import * as THREE from 'three'
import Experience from '../Experience'

import vertex from '../Shaders/particle/vertex.vs.glsl'
import fragment from '../Shaders/particle/fragment.fs.glsl'

export default class ParticleShield {
  constructor() {
    this.experience   = new Experience()
    this.scene        = this.experience.scene
    this.resources    = this.experience.resources
    this.time         = this.experience.time
    this.model        = this.resources.item['shield'].children[0]
    this.mark         = this.resources.item['mark']
    this.PARAMS       = this.experience.PARAMS
    this.init()
  }

  init() {
    this.createPoints()
  }

  createPoints() {
    this.geometry = this.model.geometry.clone()
    this.material = new THREE.MeshBasicMaterial({
      wireframe: true
    })
    this.points = new THREE.Mesh( this.geometry, this.material )

    this.points.scale.set( 1000, 1000, 1000 )
    this.points.geometry.rotateX(Math.PI / 2)
    this.points.rotation.z = - Math.PI / 8

    // this.scene.add(this.points)
  }

  update() {
    // this.points.rotation.y += this.PARAMS.flyNormal * 2
    // this.material.uniformsNeedUpdate = true
  }
}