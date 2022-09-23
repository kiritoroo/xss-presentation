import {
  Scene as _Scene,
  FogExp2,
  Color,
  Vector3,
  BufferAttribute
} from 'three'

import { ev } from '../utils'

import gsap from 'gsap'

import Box from '../components/Box'
import Lights from '../components/Lights'
import XSSText from '../components/XSSText'
import ParticleBackground from '../components/ParticleBackground'
import ParticleIntro from "../components/Particlentro";

export default class Scene extends _Scene {
  constructor() {
    super()

    this.fog = new FogExp2(0x000000, 0.0005)
    this.background = new Color(0x0c0c18)

    this.allPoints      = []
    this.currentObj     = null
    this.currentIndex   = 0

    this.preload().then(() => {
      this.initScene()
      this.bindEvents()
    })
  }

  async preload() {

  }

  initScene() {
    // this.box     = new Box()
    this.lights     = new Lights()
    this.xssText    = new XSSText()
    this.particleBG = new ParticleBackground()
    this.particleIT = new ParticleIntro()

    this.allPoints.push(this.particleIT, this.xssText)

    this.currentObj = this.allPoints[0]

    this.add( this.lights, this.particleBG )
    this.add(this.currentObj)
  }

  bindEvents() {
    document.addEventListener('scene:prevStage', () => {
      setTimeout(() => {
        this.onPrevStage()
      }, 300)
    })
    document.addEventListener('scene:nextStage', () => {
      setTimeout(() => {
        this.onNextStage()
      }, 300)
    })  }

  update() {
    // if (this.currentObj & this.currentObj.children[0]) {
    //   this.currentObj.geometry.attributes.position.needsUpdate = true
    //   this.currentObj.children[0].geometry.attributes.position.needsUpdate = true
    // }

    // if (this.currentObj & this.currentObj.mesh) {
    //   this.currentObj.geom.attributes.position.needsUpdate = true
    //   this.currentObj.mesh.geometry.attributes.position.needsUpdate = true
    // }
    
    ev('scene:update')
  }

  onNextStage() {
    // console.log(this.currentObj)
    // this.currentIndex += 1
    // const nextObj = this.allPoints[this.currentIndex]
    // this.currentObj.mesh.geometry.attributes.position.array.forEach((point, point_index) => {
    //   let nextPosIndex = point_index % nextObj.mesh.geometry.attributes.position.array.length
    //   let nextPos = nextObj.mesh.geometry.attributes.position.array[nextPosIndex]
    //   let objPos = { pos: point }
    //   gsap.to(objPos, {
    //     pos: nextPos,
    //     ease: 'power3',
    //     delay: 1000 * Math.random(),
    //     onUpdate: () => {
    //       point = objPos.pos
    //     }
    //   }).play()
    // })
    // this.currentObj = nextObj
    // this.currentObj.geom.computeBoundingBox()
    // this.currentObj.mesh.geometry.computeBoundingBox()
    // this.currentObj.matrixAutoUpdate = false
    // this.currentObj.updateMatrix()

    let positionAttribute = this.currentObj.children[0].geometry.getAttribute('position')
    let vertices = this.currentObj.children[0].geometry.attributes.position.array

    this.currentIndex += 1
    const nextObj = this.allPoints[this.currentIndex]

    for (let i = 0; i < positionAttribute.count; i+=3) {
      let nextPosIndex = i % nextObj.children[0].geometry.attributes.position.array.length
      let nextPos = nextObj.children[0].geometry.attributes.position.array

      vertices[i] =  nextPos[nextPosIndex]
      vertices[i + 1] =  nextPos[nextPosIndex + 1]
      vertices[i + 2] =  nextPos[nextPosIndex + 2]

    }
    // this.currentObj.geom.setAttribute('position', new BufferAttribute(vertices, 3))
    this.currentObj = nextObj
    this.currentObj.geom.attributes.position.needsUpdate = true
    this.currentObj.mesh.geometry.attributes.position.needsUpdate = true
    // this.currentObj = nextObj
    // this.currentObj.matrixAutoUpdate = false
    // this.currentObj.updateMatrix()
  }
  
  onPrevStage() {

  }
}