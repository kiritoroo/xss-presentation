import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Me() {
  const navigate = useNavigate()

  const auth = async () => {
    const req = await axios({
      url: '/me',
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
    console.log(req)

    if (req.status === 'error') {
      navigate('/login')
    }
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <div>Me</div>
  )
}
