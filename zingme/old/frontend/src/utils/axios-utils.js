import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:5000/api' })

export const request = ({ ...options }) => {
  const onSuccess = response => {
    return response
  }
  const onError = error => {
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}