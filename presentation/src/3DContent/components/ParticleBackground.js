import {
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Object3D,
  Points,
  Float32BufferAttribute,
  AdditiveBlending,
  MathUtils,
  Color
} from 'three'

import loaderTexture from '../../Experience/Utils/TextureLoader'

import PARAMS from '../Param'
export default class ParticleBackground extends Object3D {
  constructor() {
    super()

    this.preload().then(() => {
      this.initObject()
      this.bindEvents()
    })
  }

  async preload() {
    this.store = {
      texture: await loaderTexture('./src/3DExperience/static/image/mark.png')
    }
  }

  initObject() {
    const number    = 1000,
          max       = 1500
    const vertices  = []

    this.geom = new BufferGeometry()

    for (let i = 0; i < number; i++) {
      const x = MathUtils.randFloatSpread(max*2)
      const y = MathUtils.randFloatSpread(max*2)
      const z = MathUtils.randFloatSpread(max*2)

      vertices.push( x, y, z )
    }

    this.geom.setAttribute('position', new Float32BufferAttribute( vertices, 3 ))
    
    this.mat = new PointsMaterial({
      color: 0xffffff,
      size: 5,
      map: this.store.texture,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: false
    })

    this.xBg = new Points(this.geom, this.mat)
    this.xBg.position.z = -.5 * max
    this.xBg.position.x = -.3 * max
    this.yBg = new Points(this.geom, this.mat)
    this.yBg.position.z = -.6 * max
    this.yBg.position.x = -.2 * max
    this.yBg.position.y = 0
    this.zBg = new Points(this.geom, this.mat)
    this.zBg.position.z = -.7 * max

    this.add(this.xBg, this.yBg, this.zBg)
  }

  bindEvents() {
    document.addEventListener('scene:update', () => this.onUpdate())
  }

  onUpdate() {
    this.xBg.rotation.x -= PARAMS.flyNormal / 2.5
    this.yBg.rotation.y += PARAMS.flyNormal / 1.5
    this.zBg.rotation.z += PARAMS.flyNormal / 3.5
  }
}