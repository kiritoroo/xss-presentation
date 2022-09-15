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

export default class ParticleIntro extends Object3D {
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
    const number   = 5000,
          max      = 1500
    const vertices = []

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
      size: 10,
      map: this.store.texture,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: false
    })

    this.mesh = new Points(this.geom, this.mat)

    this.add( this.mesh )
  }

  bindEvents() {
    document.addEventListener('scene:update', () => this.onUpdate())
  }

  onUpdate() {
    this.rotation.y += 0.005
  }
}