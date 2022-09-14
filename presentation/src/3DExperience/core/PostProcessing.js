import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader'

export default class PostProcessing extends EffectComposer {
  constructor({ renderer: R, scene, camera }) {
    super(R)

    this.scene    = scene
    this.camera   = camera
    this.renderer = R

    this.initEffect()
    this.onResize()
    this.bindEvents()
  }

  bindEvents() {
    document.addEventListener('layout:change', () => this.onResize())
  }

  initEffect() {
    const { W, H } = window._3DLayout

    const renderPass = new RenderPass(this.scene, this.camera)
    const effectFilm = new FilmPass(.5, .5, 1500, !1)
    const shaderPass = new ShaderPass(FocusShader)

    shaderPass.uniforms.screenWidth.value = W
    shaderPass.uniforms.screenHeight.value = H
    shaderPass.renderToScreen = true

    this.addPass(renderPass)
    this.addPass(effectFilm)
    this.addPass(shaderPass)
  }

  onResize() {
    const { W, H, PR } = window._3DLayout
    this.setSize( W, H )
    this.setPixelRatio( PR )
  }
}