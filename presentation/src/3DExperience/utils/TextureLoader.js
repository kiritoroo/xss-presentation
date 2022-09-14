import { TextureLoader } from "three";

const loader = new TextureLoader()

const textureLoader = (url) => {
  return new Promise((resolve) => {
    loader.load(url, (data) => {
      data.needsUpdate = true
      resolve(data)
    })
  })
}

export default textureLoader
