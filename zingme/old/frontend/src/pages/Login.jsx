import React, { useState } from 'react'
import { request } from '../utils/axios-utils'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email:'',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>Đăng nhập</h1>
        <p>Thêm bạn thêm vui</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <input 
              type="text"
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
            />
          </div>
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <input 
              type="text"
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Họ tên'
              onChange={onChange}
            />
          </div>
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <button type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}