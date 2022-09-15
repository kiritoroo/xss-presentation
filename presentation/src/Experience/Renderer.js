import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer {
  constructor() {
    this.experience = new Experience()

    this.scene    = this.experience.scene
    this.sizes    = this.experience.sizes
    this.canvas   = this.experience.canvas
    this.camera   = this.experience.camera

    this.init()
  }

  init() {
    this.createRender()
  }

  createRender() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    })

    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding          = THREE.sRGBEncoding
    this.renderer.toneMapping             = THREE.CineonToneMapping
    this.renderer.toneMappingExposure     = 1.75
    this.renderer.shadowMap.enabled       = true

    this.renderer.setClearColor(0xffffff)
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.renderer.render(this.scene, this.camera.camera)
  }
}