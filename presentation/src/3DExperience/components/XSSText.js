import { 
  Mesh,
  Points,
  Object3D,
  MeshStandardMaterial,
  Color
} from 'three'

import modelLoader from '../utils/ModelLoader'
import textureLoader from '../utils/TextureLoader'

import TemplateMaterial from '../shaders/template-material'

export default class XSSText extends Object3D {
  constructor() {
    super()

    this.preload().then(() => {
      this.initObject()
      this.bindEvents()
    })
  }

  async preload() {
    this.store = {
      model: await modelLoader('./src/3DExperience/static/models/xss.glb').then((m) => m.children[2])
    }
  }

  initObject() {
    this.geom = this.store.model.geometry.clone()
    this.mat = new TemplateMaterial({ 
      u_time: { type: 'f', value: 0 }
    })
    this.mesh = new Points(this.geom, this.mat)

    this.mesh.scale.set(10, 10, 10)
    this.mesh.rotation.x = Math.PI / 2
    this.mesh.rotation.z = -Math.PI / 8

    this.add(this.mesh)
  }

  bindEvents() {
    document.addEventListener('scene:update', () => this.onUpdate())
  }

  onUpdate() {

  }
}