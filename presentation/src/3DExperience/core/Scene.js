import {
  Scene as _Scene
} from 'three'

import { ev } from '../utils'

import Box from '../components/Box'
import Lights from '../components/Lights'

export default class Scene extends _Scene {
  constructor() {
    super()

    this.preload().then(() => {
      this.initScene()
    })
  }

  async preload() {

  }

  initScene() {
    this.box      = new Box()
    this.lights   = new Lights()
    this.add( this.box, this.lights )
  }

  update() {
    ev('scene:update')
  }
}