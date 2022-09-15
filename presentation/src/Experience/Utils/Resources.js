import * as THREE from 'three'
import Experience from '../Experience'

import loaderModel from './ModelLoader'
import loaderTexture from './TextureLoader'

import { EventEmitter } from 'events'

export default class Resources extends EventEmitter {
  constructor(assets) {
    super()

    this.experience = new Experience()

    this.assets = assets

    this.item   = {}
    this.queue  = this.assets.length
    this.loaded = 0

    this.preload()
  }

  async preload() {
    for (const asset of this.assets) {
      if (asset.type === "model") {
        await loaderModel(asset.path).then((m) => {
          this.singleLoaded(asset, m)
        })
      } else if (asset.type === 'texture') {
        await loaderTexture(asset.path).then((t) => {
          this.singleLoaded(asset, t)
        })
      }
    }
  }

  singleLoaded(asset, resolve) {
    this.item[asset.name] = resolve
    this.loaded++
    if (this.loaded === this.queue) {
      console.log(this.item)
      this.emit("ready")
    }
  }
}