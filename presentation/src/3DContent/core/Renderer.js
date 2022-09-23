import { WebGLRenderer } from "three";
import gsap from 'gsap'

export default class Renderer extends WebGLRenderer {
  constructor($canvas, updateFunc = () => {}) {
    const { W, H, PR } = window._3DLayout

    super({
      canvas: $canvas,
      antialias: true,
      powerPreference: 'high-performance'
    })

    this.updateHandler = updateFunc

    this.setClearColor(0xffffff)
    this.setSize(W, H)
    this.setPixelRatio(PR)

    this.bindEvents()
  }

  bindEvents() {
    document.addEventListener('layout:change', () => this.onResize())
  }

  onResize() {
    const { W, H, PR } = window._3DLayout
    this.setSize( W, H ) 
    this.setPixelRatio(PR)
  }

  toggleRender(isRender) {
    if (isRender) {
      gsap.ticker.add(this.updateHandler)
    } else {
      gsap.ticker.remove(this.updateHandler)
    }
  }
}