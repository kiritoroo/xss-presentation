import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()

const modelLoader = (url) => {
  return new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
      const result = gltf.scene
      console.log(result)
      resolve(result)
    })
  })
}

export default modelLoader