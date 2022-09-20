import * as THREE from 'three' 
import Experience from '../Experience'

import ParticleBackground from './ParticleBackground'
import ParticleIntro from './ParticleIntro'
import ParticleXSS from './ParticleXSS'
import ParticleFake from './ParticleFake'
import ParticleBug from './ParticleBug'
import ParticleThank from './ParticleThank'

import gsap from 'gsap'

export default class ParticleSystem {
  constructor() {
    this.experience   = new Experience()
    this.scene        = this.experience.scene
    this.time         = this.experience.time
    this.PARAMS       = this.experience.PARAMS

    this.particleIntro  = new ParticleIntro()
    this.particleFake   = new ParticleFake()
    this.particleXSS    = new ParticleXSS()
    this.particleBG     = new ParticleBackground()
    this.particleBug    = new ParticleBug()
    this.particleThank  = new ParticleThank()

    this.allParticles     = []
    this.currentParticle  = { points: null, update: null }
    this.currentIndex     = 0

    this.init()

    this.bindEvents()
  }

  init() {
    this.allParticles.push(
      this.particleIntro, 
      this.particleXSS, 
      this.particleBug,
      this.particleXSS, 
      this.particleXSS,
      this.particleThank
    )

    this.currentParticle = {
      points: this.allParticles[this.currentIndex].points,
      update: () => this.allParticles[this.currentIndex].update()
    }

    this.scene.add( ...this.particleBG.points )
    this.scene.add( this.particleFake.points )

    this.scene.add( this.currentParticle.points )

    setTimeout(() => {
      this.changeModel(this.currentIndex + 1)
    }, 1000)
  }

  bindEvents() {
    document.addEventListener('scene:prevStage', (e) => this.onPrev(e))
    document.addEventListener('scene:nextStage', (e) => this.onNext(e))
  }

  changeModel(index) {

    const fixPosition = [
      {
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        duration: 2
      },
      {
        scale: 1000,
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          x: 0,
          y: Math.PI / 8,
          z: 0
        },
        duration: 1
      },
      {
        scale: 5,
        x: -20,
        y: 0,
        z: 0,
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        duration: 2
      },
      {
        scale: 3000,
        x: 100,
        y: 150,
        z: 0,
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        duration: 1
      },
      {
        scale: 2000,
        x: 200,
        y: 150,
        z: 0,
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        duration: 1
      },
      {
        scale: 4,
        x: -20,
        y: 0,
        z: 0,
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        duration: 2
      },
    ]

    this.currentIndex = index
    const nextPoins = this.allParticles[this.currentIndex].points.geometry.getAttribute('position')
    const currPoints = this.currentParticle.points.geometry.getAttribute('position')
    const fakePoints = this.particleFake.points.geometry.getAttribute('position')

    let vertices = []

    for (let i = 0; i < nextPoins.array.length; i+=3) {
      let vertice = new THREE.Vector3()
      let nextPointIndex = i % currPoints.array.length
      vertice.setX(nextPoins.array[nextPointIndex] * fixPosition[this.currentIndex].scale + fixPosition[this.currentIndex].x)
      vertice.setY(nextPoins.array[nextPointIndex + 1] * fixPosition[this.currentIndex].scale + fixPosition[this.currentIndex].y)
      vertice.setZ(nextPoins.array[nextPointIndex + 2] * fixPosition[this.currentIndex].scale + fixPosition[this.currentIndex].z) 
      vertices.push(vertice)

      let objPoint = {
        x: currPoints.array[nextPointIndex],
        y: currPoints.array[nextPointIndex + 1],
        z: currPoints.array[nextPointIndex + 2],
      }
      gsap.to(objPoint, {
        x: () => vertice.x,
        y: () => vertice.y,
        z: () => vertice.z,
        delay: (this.PARAMS.delay * Math.random()),
        duration: fixPosition[index].duration,
        ease: 'power3',
        onUpdate: () => {
          currPoints.array[nextPointIndex] = objPoint.x
          currPoints.array[nextPointIndex + 1] = objPoint.y
          currPoints.array[nextPointIndex + 2] = objPoint.z
          currPoints.needsUpdate = true

          fakePoints.array[nextPointIndex] = objPoint.x
          fakePoints.array[nextPointIndex + 1] = objPoint.y
          fakePoints.needsUpdate = true
          this.particleFake.points.material.opacity -= 0.000008
        },
        onComplete: () => {

        }
      })
    }
    this.currentParticle.points.updateMatrix()

    gsap.to(this.currentParticle.points.rotation, {
      x: fixPosition[this.currentIndex].rotation.x,
      y: fixPosition[this.currentIndex].rotation.y,
      z: fixPosition[this.currentIndex].rotation.z,
      duration: 8,
      ease: 'easeIn'
    }).play()

    this.currentParticle.update = () => this.allParticles[this.currentIndex].update()
  }

  onPrev(e) {
    this.currentIndex -= 1
    this.changeModel(this.currentIndex)
    console.log('change model prev');
  }

  onNext(e) {
    this.currentIndex += 1
    this.changeModel(this.currentIndex)
    console.log('change model next');
  }

  update() {
    this.particleBG.update()

    if (this.particleFake) {
      this.particleFake.update()
    }
  }
}