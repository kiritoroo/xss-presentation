import * as THREE from 'three'
import Experience from '../Experience'

import { EventEmitter } from 'events'

import ParticleSystem from './ParticleSystem'

export default class World extends EventEmitter {
  constructor() {
    super()
    
    this.experience = new Experience()
    this.sizes      = this.experience.sizes
    this.scene      = this.experience.scene
    this.camera     = this.experience.camera
    this.resources  = this.experience.resources

    this.resources.on("ready", () => {
      this.particleSystem = new ParticleSystem()

      this.emit("worldready")
    })
  }

  resize() {
    
  }

  update() {
    if (this.particleSystem) {
      this.particleSystem.update()
    }
  }
}