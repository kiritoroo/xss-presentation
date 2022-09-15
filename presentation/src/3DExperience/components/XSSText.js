import { 
  Mesh,
  Points,
  Object3D,
  MeshStandardMaterial,
  Color
} from 'three'

import loaderModel from '../utils/ModelLoader'
import loaderTexture from "../../Experience/Utils/TextureLoader";

import ParticleMaterial from '../shaders/particle-material'

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
      model: await loaderModel('./src/3DExperience/static/models/xss.glb').then((m) => m.children[2]),
      mark: await loaderTexture('./src/3DExperience/static/image/mark.png')
    }
  }

  initObject() {
    this.geom = this.store.model.geometry.clone()
    this.mat = new ParticleMaterial({ 
      uTime: { type: 'f', value: 0 },
      uMark: { type: "t", value: this.store.mark }
    })

    this.mesh = new Points(this.geom, this.mat)

    this.mesh.scale.set(1000, 1000, 1000)
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