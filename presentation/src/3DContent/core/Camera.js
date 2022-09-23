import {
  PerspectiveCamera,
  Vector3
} from 'three'

import gsap from 'gsap'

export default class Camera extends PerspectiveCamera {
  constructor() {
    const { W, H }  = window._3DLayout
    const aspect    = W / H

    super(75, aspect, 0.1 , 50000)

    this.position.set( 0, 0, 1000 )
    this.lookAt(new Vector3())

    this.bindEvents()

    // this.onPrepare(0, 3000)
  }

  bindEvents() {
    document.addEventListener('layout:change', () => this.onResize())
  }

  onResize() { 
    const { W, H }  = window._3DLayout
    this.aspect     = W / H
    this.updateProjectionMatrix()
  }

  onPrepare(index, timeout) {
    // var cameraObj = [{
    //   rotation: {
    //       x: -1.26,
    //       y: 0.16,
    //       z: 0.46
    //   },
    //   position: {
    //       x: 220,
    //       y: 1314,
    //       z: 414
    //   }
    // }]
    // setTimeout(() => {
    //   this.position = cameraObj[index].position
    //   gsap.to(this, {
    //     rotation: this.rotation,
    //     ease: 'none',
    //     duration: 0.5,
    //     onComplete: () => {

    //     }
    //   })
    // }, timeout)
  }
}