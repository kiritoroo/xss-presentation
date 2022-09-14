import Scene from "./core/Scene";
import Camera from "./core/Camera";
import Renderer from "./core/Renderer";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Stage {
  constructor() {
    this.$canvas = document.getElementById('stage')

    this.preload().then(() => {
      this.initStage()
    })
  }

  async preload() {

  }

  initStage() {
    this.scene    = new Scene()
    this.camera   = new Camera()
    this.renderer = new Renderer( this.$canvas, () => this.render() )
    this.control  = new OrbitControls(this.camera, this.renderer.domElement)
    this.renderer.toggleRender(true)
  }

  render() {
    const { renderer: R } = this
    
    this.update()

    R.render(this.scene, this.camera)
  }

  update() {
    this.scene.update()
    this.control.update()
  }
}