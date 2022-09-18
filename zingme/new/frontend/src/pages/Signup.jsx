import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
  const navigate = useNavigate()

  const [ mess, setMess ] = useState('')

  const initForm = {
    fullname  : "",
    email     : "",
    password  : "",
    repassword  : "",
  }
  const [ formData, setFormData ] = useState(initForm)
  const { fullname, email, password, repassword } = formData

  const onChange = (e) => {
    setFormData((prevState) => (
      { ...prevState, [e.target.name]: e.target.value }
    ))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const user = { fullname, email, password }
    const req = await axios
      .post('http://localhost:5000/api/signup', user)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return err.response.data
      })

    setMess(req.message)
    if (req.status == 'success') {
      navigate('/login')
    }
    else if (req.status == 'error') {
      setFormData(initForm)
    }
  }

  return (
    <>
      <section className="heading">
        <h1>Register</h1>
        <p>Tạo tài khoản mới</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <input 
              type="text"
              className='form-control'
              id='fullname'
              name='fullname'
              value={fullname}
              placeholder='Họ tên'
              onChange={onChange}
            />
          </div>
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <input 
              type="email"
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Địa chỉ email'
              onChange={onChange}
            />
          </div>
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <input 
              type="password"
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Mật khẩu'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input 
              type="password"
              className='form-control'
              id='repassword'
              name='repassword'
              value={repassword}
              placeholder='Xác nhận mật khẩu'
              onChange={onChange}
            />
          </div>
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <button type='submit'>
              Đăng ký
            </button>
          </div>
        </form>

        <div>{mess}</div>
      </section>
    </>
  )
}
