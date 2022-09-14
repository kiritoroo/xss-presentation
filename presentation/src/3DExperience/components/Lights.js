import {
  AmbientLight,
  DirectionalLight,
  Object3D
} from 'three'

export default class Lights extends Object3D {
  constructor() {
    super()

    this.preload().then(() => {
      this.initObject()
      this.bindEvents()
    })
  }

  async preload() {

  }

  initObject() {
    this.ambientLight     = new AmbientLight( 0x404040 )
    this.directionalLight = new DirectionalLight( 0xffffff, 1 )

    this.add( this.ambientLight, this.directionalLight )
  }

  bindEvents() {
    document.addEventListener('scene:update', () => this.onUpdate())
  }

  onUpdate() {

  }
}