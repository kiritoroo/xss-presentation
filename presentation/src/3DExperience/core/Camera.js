import {
  PerspectiveCamera,
  Vector3
} from 'three'

export default class Camera extends PerspectiveCamera {
  constructor() {
    const { W, H }  = window._3DLayout
    const aspect    = W / H

    super(75, aspect, 0.1 , 100)

    this.position.set( 0, 0, 10 )
    this.lookAt(new Vector3())

    this.bindEvents()
  }

  bindEvents() {
    document.addEventListener('layout:change', () => this.onResize())
  }

  onResize() {
    const { W, H }  = window._3DLayout
    this.aspect     = W / H
    this.updateProjectionMatrix()
  }
}