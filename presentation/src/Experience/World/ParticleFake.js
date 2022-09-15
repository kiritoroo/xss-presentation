import * as THREE from 'three'
import Experience from '../Experience'

import vertex from '../Shaders/particle/vertex.vs.glsl'
import fragment from '../Shaders/particle/fragment.fs.glsl'
export default class ParticleFake {
  constructor() {
    this.experience   = new Experience()
    this.scene        = this.experience.scene
    this.resources    = this.experience.resources
    this.time         = this.experience.time
    this.mark         = this.resources.item['mark']
    this.PARAMS       = this.experience.PARAMS

    this.init()
  }

  init() {
    this.createPoints()
  }

  createPoints() {
    const number   = 13000,
          max      = 1500
    const vertices = []

    this.geometry = new THREE.BufferGeometry()

    for (let i = 0; i < number; i++) {
      const x = THREE.MathUtils.randFloatSpread(max*2)
      const y = THREE.MathUtils.randFloatSpread(max*2)
      const z = THREE.MathUtils.randFloatSpread(max*2)

      vertices.push( x, y, z )
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ))

    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 5,
      map: this.mark,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: false
    })

    // this.material = new THREE.RawShaderMaterial({
    //   vertexShader: vertex,
    //   fragmentShader: fragment,
    //   uniforms: {
    //     uTime: { type: 'f', value: 0 },
    //     uMark: { type: 't', value: this.mark }
    //   },
    //   blending: THREE.AdditiveBlending,
    //   depthWrite: false,
    //   transparent: true
    // })

    this.points = new THREE.Points( this.geometry, this.material )

    // this.scene.add( this.points )
  }

  update() {
    this.points.rotation.y += this.PARAMS.flyNormal * 2
  }
}