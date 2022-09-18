import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import Header from '../components/Header'
import Footer from '../components/Footer'

const fetchUser = async () => {
  return await axios({
    url: '/me',
    baseURL: 'http://localhost:5000/api',
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
}

export default function Me() {
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useQuery('user', fetchUser, {
    retry: false,
    select: (data) => {
      const res = data.data
      return res
    },
    onError   : () => {
      navigate('/login')
    },
    onSuccess : (data) => {
      if (data.status == 'error') {
        navigate('/login')
      } else if (data.status == 'success') {
        setUserData(data.data)
      }
    }
  })

  // const fetchUser = async () => {
  //   const res = await axios({
  //     url: '/me',
  //     baseURL: 'http://localhost:5000/api',
  //     method: 'GET',
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then(res => {
  //     return res.data
  //   })
  //   .catch(err => {
  //     return err.response.data
  //   })

  //   if (res.status === 'error') {
  //     navigate('/login')
  //   } else if (res.status == 'success') {
  //     setUserData(res.data)
  //   }
  // }

  const logout = async (e) => {
    e.preventDefault()

    const res = await axios({
      url: '/logout',
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
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

    if (res.status === 'error') {
      navigate('/me')
    } else if (res.status == 'success') {
      navigate('/login')
    }
  }

  // useEffect(() => {
  //   fetchUser()
  // }, [])

  return (
    <div>
      <Header/>
      <h2>Thông tin các nhân</h2>
      {isLoading
        ? <p>Bạn chờ xíu nhé...</p>
        : <>
          <p>{userData.fullname}</p>
          <p>{userData.email}</p>
          <p>{userData.city}</p>
          <p>{userData.aboutMe}</p> </>
      }
      <button onClick={logout}>Đăng xuất</button>
      <Footer/>
    </div>
  )
}
