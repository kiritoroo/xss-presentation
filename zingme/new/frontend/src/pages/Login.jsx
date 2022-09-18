import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

export default function Login() {
  const navigate = useNavigate()

  const [ mess, setMess ] = useState('')

  const initForm = {
    email     : "",
    password  : ""
  }

  const [ formData, setFormData ] = useState(initForm)
  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => (
      { ...prevState, [e.target.name]: e.target.value }
    ))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // const login = { email, password }
    // const req = await axios
    // .post('http://localhost:5000/api/login', login, {
    //   withCredentials: true
    // })
    // .then(res => {
    //   return res.data
    // })
    // .catch(err => {
    //   return err.response.data
    // })

    const res = await axios({
      url: '/login',
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
      data: {
        email, password
      },
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })

    // const req = fetch('http://localhost:5000/api/login', {
    //   method: 'POST',
    //   mode: 'cors',
    //   redirect: 'follow',
    //   credentials: 'include',
    //   headers: new Headers({
    //     "Accept": "application/json",
    //     "Content-Type": "application/json"
    //   }),
    //   body: JSON.stringify({
    //     email: email,
    //     password: password
    //   })
    // })
    // .then(res => {
    //   console.log(res);
    //   return res.data
    // })
    // .catch(err => {
    //   console.log(err)
    //   return err.response.data
    // })

    setMess(res.message)
    if (res.status == 'success') {
      setTimeout(() => {
        navigate('/me')
      }, 500);
    }
    else if (res.status == 'error') {
      setFormData(initForm)
    }
  }
  
  return (
    <>
<section className="heading">
        <h1>Login</h1>
        <p>Đăng nhập</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
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
{/* -------------------------------------------------- */}
          <div className='form-group'>
            <button type='submit'>
              Đăng nhập
            </button>
          </div>
        </form>

        <div>{mess}</div>
      </section>
    </>
  )
}
