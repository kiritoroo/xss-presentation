import * as THREE from 'three'
import Experience from '../Experience'

export default class ParticleBackground {
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
    const number    = 1000,
          max       = 1500
    const vertices  = []

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

    this.xPoints = new THREE.Points(this.geometry, this.material)
    this.xPoints.position.z = -.5 * max
    this.xPoints.position.x = -.3 * max

    this.yPoints = new THREE.Points(this.geometry, this.material)
    this.yPoints.position.z = -.6 * max
    this.yPoints.position.x = -.2 * max
    this.yPoints.position.y = 0

    this.zPoints = new THREE.Points(this.geometry, this.material)
    this.zPoints.position.z = -.7 * max

    this.scene.add( this.xPoints, this.yPoints, this.zPoints )
  }

  update() {
    this.xPoints.rotation.x -= this.PARAMS.flyNormal / 2.5
    this.yPoints.rotation.y += this.PARAMS.flyNormal / 1.5
    this.zPoints.rotation.z += this.PARAMS.flyNormal / 3.5
  }
}