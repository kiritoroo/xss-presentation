import { ev } from "./utils";

export default class Layout {
  constructor() {

    this.isResizing = false

    this.onResize()
    this.bindEvents()
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize())
    window.addEventListener('keydown', (e) => this.onKeyDown(e), false)
  }

  onResize() {
    this.W    = window.innerWidth
    this.H    = window.innerHeight
    this.PR   = Math.min(window.devicePixelRatio, 1)
    this.isResizing = false

    ev('layout:change')
  }

  onKeyDown(e) {
    if (e.keyCode == 38) {

      ev('scene:prevStage')

    } else if (e.keyCode == 40) {
      
      ev('scene:nextStage')

    } 
  }
}