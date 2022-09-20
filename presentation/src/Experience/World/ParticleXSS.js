import * as THREE from 'three'
import Experience from '../Experience'

import vertex from '../Shaders/particle/vertex.vs.glsl'
import fragment from '../Shaders/particle/fragment.fs.glsl'

export default class ParticleXSS {
  constructor() {
    this.experience   = new Experience()
    this.scene        = this.experience.scene
    this.resources    = this.experience.resources
    this.time         = this.experience.time
    this.model        = this.resources.item['xss'].children[2]
    this.mark         = this.resources.item['mark']
    this.PARAMS       = this.experience.PARAMS
    this.init()
  }

  init() {
    this.createPoints()
  }

  createPoints() {
    this.geometry = this.model.geometry.clone()
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { type: 'f', value: 0 },
        uMark: { type: 't', value: this.mark }
      },
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    })
    this.points = new THREE.Points( this.geometry, this.material )

    this.points.scale.set( 1000, 1000, 1000 )
    this.points.geometry.rotateX(Math.PI / 2)
    this.points.rotation.z = - Math.PI / 8

    // this.scene.add(this.points)
  }

  update() {
    // this.points.rotation.y += this.PARAMS.flyNormal * 2
    this.material.uniformsNeedUpdate = true
  }
}