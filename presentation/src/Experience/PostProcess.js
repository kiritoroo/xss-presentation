import * as THREE from 'three'
import Experience from './Experience'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader'

export default class PostProcess {
  constructor() {
    this.experience = new Experience()

    this.scene    = this.experience.scene
    this.sizes    = this.experience.sizes
    this.canvas   = this.experience.canvas
    this.camera   = this.experience.camera
    this.renderer = this.experience.renderer

    this.init()
  }

  init() {
    this.createPoss()
  }

  createPoss() {
    this.effectComposer   = new EffectComposer(this.renderer.renderer)
    const renderPass      = new RenderPass(this.scene, this.camera.camera)
    const effectFilm      = new FilmPass(.5, .5, 1500, !1)
    const shaderPass      = new ShaderPass(FocusShader)

    shaderPass.uniforms.screenWidth.value = this.sizes.width
    shaderPass.uniforms.screenHeight.value = this.sizes.height
    shaderPass.renderToScreen = true

    this.effectComposer.addPass(renderPass)
    this.effectComposer.addPass(effectFilm)
    this.effectComposer.addPass(shaderPass)
  }

  resize() {
    this.effectComposer.setSize(this.sizes.width, this.sizes.height)
    this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.effectComposer.render()
  }
}