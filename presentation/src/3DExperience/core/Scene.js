import {
  Scene as _Scene
} from 'three'

import { ev } from '../utils'

import Box from '../components/Box'
import Lights from '../components/Lights'
import XSSText from '../components/XSSText'
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
    // this.box      = new Box()
    this.lights   = new Lights()
    this.xssText  = new XSSText()

    this.add( this.lights, this.xssText )
  }

  update() {
    ev('scene:update')
  }
}