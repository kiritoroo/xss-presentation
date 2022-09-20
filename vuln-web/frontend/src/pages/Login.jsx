import React, { useState, useEffect } from 'react'
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
      <div className="theme-layout">
        <div className="container-fluid pdng0">
          <div className="row merged">
            <div className="offset-md-3 col-md-6">
              <div className="login-reg-bg">
                <div className="log-reg-area sign">
                  <h2 className="log-title">Đăng nhập</h2>

                  <form onSubmit={onSubmit}>

                    <div className="form-group">
                      <input type="email" required name="email" onChange={onChange}/>
                      <label className="control-label">Địa chỉ email</label><i className="mtrl-select"></i>
                    </div>

                    <div className="form-group">
                      <input type="password" required name="password" onChange={onChange}/>
                      <label className="control-label">Mật khẩu</label><i className="mtrl-select"></i>
                    </div>

                    <div className="submit-btns">
                      <button className="mtr-btn login" name="submit" type="submit"><span>Đăng nhập</span></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
