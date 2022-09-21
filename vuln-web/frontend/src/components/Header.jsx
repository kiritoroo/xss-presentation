import React from 'react'
import './Header.css'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

export default function Header() {
  const navigate = useNavigate()

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

  return (
    <>
      <header className='header'>
        {/* <NavLink className='header-logo' to='/'>Zing Me</NavLink> */}
        <img src="./zingme.png" alt="zingme" className='header-logo-img' onClick={() => navigate('/')}></img>
        <div className='header-logo'>me</div>
        <input className="header-menu-btn" type="checkbox" id="menu-btn" />
        <label className="header-menu-icon" htmlFor="menu-btn"><span className="header-navicon"></span></label>
        <ul className="header-menu">
          <li><NavLink to='/me'>Trang cá nhân</NavLink></li>
          <li><a to='/login' onClick={logout}>Đăng xuất</a></li>
        </ul>
      </header>
      <div className='header-wrap'></div>
    </>
  )
}
