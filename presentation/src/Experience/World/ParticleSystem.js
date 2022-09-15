import * as THREE from 'three' 
import Experience from '../Experience'

import ParticleBackground from './ParticleBackground'
import ParticleIntro from './ParticleIntro'
import ParticleXSS from './ParticleXSS'
import ParticleFake from './ParticleFake'

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

    this.allParticles     = []
    this.currentParticle  = { points: null, update: null }
    this.currentIndex     = 0

    this.init()
  }

  init() {
    this.allParticles.push( this.particleIntro, this.particleXSS )
    this.currentParticle = {
      points: this.allParticles[this.currentIndex].points,
      update: () => this.allParticles[this.currentIndex].update()
    }

    this.scene.add( ...this.particleBG.points )
    this.scene.add( this.particleFake.points )

    this.scene.add( this.currentParticle.points )

    setTimeout(() => {
      this.onNextStage()
    }, 2000)
  }

  onNextStage() {

    const fixPosition = [
      {
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          x: 0
        }
      },
      {
        scale: 1000,
        x: 100,
        y: 150,
        z: 0,
        rotation: {
          x: -Math.PI / 8
        }
      }
    ]

    this.currentIndex = 1
    const nextPoins = this.allParticles[this.currentIndex].points.geometry.getAttribute('position')
    const currPoints = this.currentParticle.points.geometry.getAttribute('position')
    const fakePoints = this.particleFake.points.geometry.getAttribute('position')

    //----- danger
    // this.currentParticle.points.geometry.attributes.position.array.forEach((point, point_index) => {
    //   let nextPosIndex = point_index % nextPoins.array.length
    //   let nextPos = nextPoins.array[nextPosIndex]
    //   let objPos = { pos: point }
    //   gsap.to(objPos, {
    //     pos: nextPos,
    //     ease: 'easeIn',
    //     delay: 10 * Math.random(),
    //     onUpdate: () => {
    //       // point = objPos.pos
    //       currPoints.array[point_index] = objPos.pos * fixPosition[this.currentIndex].scale
    //       currPoints.needsUpdate = true
    //     }
    //   }).play()
    // })

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
        delay: (5 * Math.random()),
        duration: 2,
        ease: 'power3',
        onUpdate: () => {
          currPoints.array[nextPointIndex] = objPoint.x
          currPoints.array[nextPointIndex + 1] = objPoint.y
          currPoints.array[nextPointIndex + 2] = objPoint.z
          currPoints.needsUpdate = true

          fakePoints.array[nextPointIndex] = objPoint.x
          fakePoints.array[nextPointIndex + 1] = objPoint.y
          // fakePoints.array[nextPointIndex + 2] = objPoint.z
          fakePoints.needsUpdate = true
          this.particleFake.points.material.opacity -= 0.000008

          // this.currentParticle.points.rotation.z += 0.000005
        },
        onComplete: () => {

        }
      })
    }

    // vertices.forEach((vertice, index) => {
    //   let objPoint = {
    //     x: currPoints.array[index],
    //     y: currPoints.array[index + 2],
    //     z: currPoints.array[index + 3],
    //   }
    //   gsap.to(objPoint, {
    //     x: () => vertice.x,
    //     y: () => vertice.y,
    //     z: () => vertice.z,
    //     delay: 1 * Math.random(),
    //     ease: 'easeIn',
    //     onUpdate: () => {
    //       currPoints.array[index] = objPoint.x
    //       currPoints.array[index + 2] = objPoint.y
    //       currPoints.array[index + 3] = objPoint.z
    //       currPoints.needsUpdate = true
    //     }
    //   })
    // })
    //----- danger

    this.currentParticle.points.updateMatrix()

    //----- fix 
    this.currentParticle.points.rotation.x = Math.PI / 2
    gsap.to(this.currentParticle.points.rotation, {
      z: fixPosition[this.currentIndex].rotation.x,
      duration: 8,
      ease: 'easeIn'
    }).play()

    //----- fix 

    this.currentParticle.update = () => this.allParticles[this.currentIndex].update()
  }

  update() {
    this.particleBG.update()
    // this.currentParticle.update()

    // if (this.currentIndex == 0){
    //   this.particleIntro.update()
    // } else if (this.currentIndex == 1) {
    //   this.particleXSS.update()
    // }

    if (this.particleFake) {
      this.particleFake.update()
    }
  }
}