import * as THREE from 'three'

import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Resources from './Utils/Resources'
import assets from './Utils/assets'

import Camera from './Camera'
import Renderer from './Renderer'
import PostProcess from './PostProcess'

import PARAMS from './Params'

import World from './World/World'

export default class Experience {
  static instance
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance
    }

    Experience.instance = this

    this.PARAMS     = PARAMS

    this.sizes      = new Sizes()
    this.time       = new Time()
    this.resources  = new Resources(assets) 

    this.canvas     = canvas
    this.scene      = new THREE.Scene()
    this.camera     = new Camera()
    this.renderer   = new Renderer()
    this.postProces = new PostProcess()
    
    this.world      = new World()


    this.init()

    this.sizes.on("resize", () => {
      this.resize()
    })
    this.time.on("update", () => {
      this.update()
    })
  }

  init() {
    this.scene.fog          = new THREE.FogExp2(0x000000, 0.0005)
    this.scene.background   = new THREE.Color(0x0c0c18)
  }

  resize() {
    this.camera.resize()
    this.world.resize()

    this.postProces.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()

    if (this.PARAMS.usePost) {
      this.postProces.update()
    } else {
      this.renderer.update()
    }
  }
}