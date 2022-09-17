import React, { useState, useEffect } from 'react'
import { request } from '../utils/axios-utils'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import './Signup.css'
// import axios from 'axios'

export default function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname      : '',
    email         : '',
    password      : '',
    repassword    : '',
  })

  const { fullname, email, password, repassword } = formData

  const addUser = (user) => {
    return request({
      url     : '/signup',
      method  : 'post',
      data    : user
    })
      .then(response => {
        console.log(response); return response;
      })
      .catch(error => {
        console.log(error); return error;
      })

  //   return axios.post('http://localhost:5000/api/signup', user)
  //   .then(function (response) {
  //     console.log(response);
  //     return response
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     return error
  //   });
  }

  const {
    mutate,
    isSuccess,
    isLoading,
    isError
  } = useMutation(addUser,{
    onError: () => console.log('error'),
    onSuccess: () => console.log('success')
  })

  const onChange = (e) => {
    setFormData((prevState) => (
      { ...prevState, [e.target.name]: e.target.value }
    ))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    
    const user = {
      fullname,
      email,
      password
    }

    mutate(user, {
      onError: () => console.log('error'),
      onSuccess: () => {
        console.log('success')
        navigate('/')
      }
    })

    // console.log({ er: isError, suss: isSuccess, load: isLoading })

    // request({
    //   url     : '/signup',
    //   method  : 'post',
    //   data    : user
    // })
    // .then(res => {
    //   if (res.response.status == "400") {
    //     console.log(err);
    //   } else {
    //     navigate('/')
    //   }
    // })
    // .catch(err => {
    // })
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
      </section>
    </>
  )
}