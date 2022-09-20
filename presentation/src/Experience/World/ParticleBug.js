import * as THREE from 'three'
import Experience from '../Experience'

import vertex from '../Shaders/particle/vertex.vs.glsl'
import fragment from '../Shaders/particle/fragment.fs.glsl'

const getImageTexture = function(image) {

	let canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	let ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, image.width, image.height);
}

export default class ParticleBug {
  constructor() {
    this.experience   = new Experience()
    this.scene        = this.experience.scene
    this.resources    = this.experience.resources
    this.time         = this.experience.time
    this.mark         = this.resources.item['mark']
    this.bugImg         = this.resources.item['bug']
    this.PARAMS       = this.experience.PARAMS

    this.init()
  }

  init() {

    this.imgTexture = getImageTexture(this.bugImg.image)

    console.log(this.imgTexture)

    this.createPoints()
  }

  createPoints() {
    const vertices = []
    const number = 11050
    let count = 0

    this.geometry = new THREE.BufferGeometry()

    for (var i = 0; i < 8; i++) {
      for (var y = 0, y2 = this.imgTexture.height; y < y2; y += 2) {
        for (var x = 0, x2 =  this.imgTexture.width; x < x2; x += 2) {
          if ( this.imgTexture.data[(x * 4 + y * 4 *  this.imgTexture.width) + 3] > 128) {
    
            // const x = Math.random() * 1000 - 500;
            // const y = Math.random() * 1000 - 500;
            // const z = -Math.random() * 500;
            
            const vx = x - this.imgTexture.width / 2
            const vy = -y + this.imgTexture.height / 2;
            const vz = 0;
  
            vertices.push( vx, vy, vz )

            count += 1

            if (count > number) break
          }
        }
      }
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ))

    // this.material = new THREE.RawShaderMaterial({
    //   vertexShader: vertex,
    //   fragmentShader: fragment,
    //   uniforms: {
    //     uTime: { type: 'f', value: 0 },
    //     uMark: { type: 't', value: this.mark }
    //   },
    //   blending: THREE.AdditiveBlending,
    //   depthWrite: false,
    //   transparent: true
    // })

    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 5,
      map: this.mark,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: false
    })

    this.points = new THREE.Points( this.geometry, this.material )
    // this.points.geometry.rotateX(-Math.PI / 2)
  }

  update() {

  }
}