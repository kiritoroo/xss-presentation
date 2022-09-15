import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Experience from './Experience'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    
    this.scene    = this.experience.scene
    this.sizes    = this.experience.sizes
    this.canvas   = this.experience.canvas

    this.init()
  }

  init() {
    this.createCamera()
    this.createOrbitControl()
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.aspect,
      0.1,
      50000
    )

    this.camera.position.set( 0, 0, 1000 )
    this.camera.lookAt(new THREE.Vector3())
  }

  createOrbitControl() {
    this.controls                 = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping   = true
    this.controls.enableZoom      = true
  }

  resize() {
    this.camera.aspect = this.sizes.aspect
    this.camera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}