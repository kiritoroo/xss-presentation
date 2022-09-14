import {
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  Color,
  Object3D
} from 'three'

export default class Box extends Object3D {
  constructor() {
    super()

    this.preload().then(() => {
      this.initBox()
      this.bindEvents()
    })
  }

  async preload() {

  }

  initBox() {
    this.geom = new BoxGeometry(5, 5, 5)
    this.mat = new MeshStandardMaterial({ color: new Color(0x00ff00) })
    this.mesh = new Mesh(this.geom, this.mat)

    this.add( this.mesh )
  }

  bindEvents() {
    document.addEventListener('scene:update', () => this.onUpdate())
  }

  onUpdate() {
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.01
  }
}