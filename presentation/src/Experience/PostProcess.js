import * as THREE from 'three'
import Experience from './Experience'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

export default class PostProcess {
  constructor() {
    this.experience = new Experience()

    this.scene    = this.experience.scene
    this.sizes    = this.experience.sizes
    this.canvas   = this.experience.canvas
    this.camera   = this.experience.camera
    this.renderer = this.experience.renderer
    this.PARAMS   = this.experience.PARAMS

    this.init()
  }

  init() {
    this.createPoss()
  }

  createPoss() {
    this.effectComposer   = new EffectComposer(this.renderer.renderer)
    const effectFilm      = new FilmPass(.5, .5, 1500, !1)
    const renderPass      = new RenderPass(this.scene, this.camera.camera)
    const shaderPass      = new ShaderPass(FocusShader)
    const bloomPass       = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      this.PARAMS.bloom.strength,
      this.PARAMS.bloom.radius,
      this.PARAMS.bloom.threshold
    )

    shaderPass.uniforms.screenWidth.value = this.sizes.width
    shaderPass.uniforms.screenHeight.value = this.sizes.height
    shaderPass.renderToScreen = true

    this.effectComposer.addPass(effectFilm)
    this.effectComposer.addPass(renderPass)
    this.effectComposer.addPass(shaderPass)
    this.effectComposer.addPass(bloomPass)
  }

  resize() {
    this.effectComposer.setSize(this.sizes.width, this.sizes.height)
    this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.effectComposer.render()
  }
}