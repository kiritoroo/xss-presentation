import React, { useState } from 'react'

export default function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password: ''
  })

  return (
    <div>
      Login
    </div>
  )
}