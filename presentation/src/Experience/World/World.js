import * as THREE from 'three'
import Experience from '../Experience'

import { EventEmitter } from 'events'

import XSSText from './XSSText'
import ParticleBackground from './ParticleBackground'

export default class World extends EventEmitter {
  constructor() {
    super()
    
    this.experience = new Experience()

    this.sizes    = this.experience.sizes
    this.scene    = this.experience.scene
    this.camera   = this.experience.camera
    
    this.resources = this.experience.resources

    this.resources.on("ready", () => {

      this.xssText      = new XSSText()
      this.particleBG   = new ParticleBackground()

      this.emit("worldready")
    })
  }

  resize() {
    
  }

  update() {
    if (this.xssText) {
      this.xssText.update()
    }
    if (this.particleBG) {
      this.particleBG.update()
    }
  }
}