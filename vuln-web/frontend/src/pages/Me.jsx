import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import Header from '../components/Header'
import Footer from '../components/Footer'

import './Me.css'

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

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
})

export default function Me() {
  const initUser = {
    fullname      : "",
    email         : "",
    city          : "",
    aboutMe       : "",
    coverPhoto    : "",
    profileImage  : ""
  }

  const [userData, setUserData] = useState(initUser)

  const navigate = useNavigate()

  const onImageCoverChange = (path) => {
    setUserData((prevState) => (
      { ...prevState, ['coverPhoto']: path }
    ))
  }

  const onAvatarChange = (path) => {
    setUserData((prevState) => (
      { ...prevState, ['profileImage']: path }
    ))
  }

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

  const coverImgRef = useRef()
  const uploadCover = async (e) => {
    e.preventDefault()

    const imgData = await toBase64(coverImgRef.current.files[0])
    const imgName = coverImgRef.current.files[0].name

    const res = await axios({
      url: '/me/upCover',
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      data: {
        imgData, imgName
      }
    })
    .then(res => {
      onImageCoverChange(res.data.data)
    })
    .catch(err => {
      return err.response.data
    })
  }

  const profileImageRef = useRef()
  const uploadAvatar = async (e) => {
    e.preventDefault()

    const imgData = await toBase64(profileImageRef.current.files[0])
    const imgName = profileImageRef.current.files[0].name

    const res = await axios({
      url: '/me/upAvatar',
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      data: {
        imgData, imgName
      }
    })
    .then(res => {
      onAvatarChange(res.data.data)
    })
    .catch(err => {
      return err.response.data
    })
  }

  const onUpdateProfile = (e) => {

  }

  // aboutMe, city, coverPhoto, email, fullname, profileImage, message, status

//   return (
//     <div>
//       <Header/>

// {/* -------------------------------------------------- */}
//       <figure>
//         <img 
//           src={
//             userData.coverPhoto==''
//             ? './public/default-cover.png'
//             : userData.coverPhoto
//           }
//         />
//       </figure>

//       <form onSubmit={() => { return false }}>
//         <label>Thay đổi ảnh nền</label>
//         <input 
//           ref={coverImgRef}
//           type="file"
//           accept="image/*"
//           name="coverPhoto"
//           onChange={uploadCover}
//           required
//         />
//       </form>
// {/* -------------------------------------------------- */}

// {/* -------------------------------------------------- */}
//       <figure>
//         <img 
//           src={
//             userData.profileImage==''
//             ? './public/default_avatar.png'
//             : userData.profileImage
//           }
//         />
//       </figure>

//       <form onSubmit={() => { return false }}>
//         <label>Thay đổi ảnh đại diện</label>
//         <input 
//           ref={profileImageRef}
//           type="file"
//           accept="image/*"
//           name="profileImage"
//           onChange={uploadAvatar}
//           required
//         />
//       </form>
// {/* -------------------------------------------------- */}

//       <h2>Thông tin các nhân</h2>
//       {isLoading
//         ? <p>Bạn chờ xíu nhé...</p>
//         : <>
//           <p>{userData.fullname}</p>
//           <p>{userData.email}</p>
//           <p>{userData.city}</p>
//           <p>{userData.aboutMe}</p> </>
//       }
//       <button onClick={logout}>Đăng xuất</button>
//       <Footer/>
//     </div>
//   )

  return (
    <>
      <Header/>

      <div className='profile-cover'>
        <img src={ userData.coverPhoto=='' ? './public/default-cover.png' : userData.coverPhoto }/>
        <div className='upload'>
          <input ref={coverImgRef} id="coverUpload" type="file" accept="image/*" name="coverAvatar" onChange={uploadCover} required/>
          <label htmlFor="coverUpload"></label>
        </div>
      </div>

      <div className='profile-avatar'>
        <div className='upload'>
          <input ref={profileImageRef} id="avatarUpload" type="file" accept="image/*" name="coverAvatar" onChange={uploadAvatar} required/>
          <label htmlFor="avatarUpload"></label>
        </div>
        <div className="preview">
          <img src={ userData.profileImage=='' ? './public/default-avatar.png' : userData.profileImage }/>
        </div>
      </div>


      <div className='profile-name'>
          <div>{userData.fullname}</div>
        </div>

      {/* <dir className='profile-about'>
        <div className='info-item'>
          <h2><span>Địa chỉ email:</span> {userData.email}</h2>
        </div>
        <div className='info-item'>
          <h2><span>Thành phố:</span> {userData.city}</h2>
        </div>
        <div className='info-item'>
          <h2><span>Sở thích:</span> {userData.aboutMe}</h2>
        </div>
      </dir> */}

      <div className='profile-wrap'></div>

      <div className="gap gray-bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row" id="page-contents">

              <div className="col-md-3"></div>

                <div className="col-md-6">
                  <div className="central-meta">
                    <div className="editing-info">
                      <h5 className="f-title">
                        <i className="ti-info-alt"></i>
                        Thông tin cá nhân
                      </h5>

                      <form onSubmit={() => console.log('submit')}>
                        <div className="form-group">
                          <input type="text" required className="name" name="fullname" value={userData.fullname} onChange={onUpdateProfile}/>
                          <label className="control-label">Tên đầy đủ</label>
                          <i className="mtrl-select"></i>
                        </div>

                        <br></br>

                        <div className="form-group">
                          <input className="email" name='email' value={userData.email} onChange={onUpdateProfile}/>
                          <label className="control-label">Địa chỉ mail</label>
                          <i className="mtrl-select"></i>
                        </div>

                        <br></br>

                        <div className="form-group">	
                          <input type="text" className="city" name="city" value={userData.city} onChange={onUpdateProfile}/>
                          <label className="control-label">Đến từ...</label>
                          <i className="mtrl-select"></i>
                        </div>

                        <br></br>
                        <br></br>
                        
                        <div className="form-group">	
                          <textarea rows="4" className="aboutMe" name="aboutMe" value={userData.aboutMe} onChange={onUpdateProfile}></textarea>
                          <label className="control-label">Chi tiết cá nhân</label>
                          <i className="mtrl-select"></i>
                        </div>


                        <button type="submit" className="mtr-btn" name="submit">
                          <span>Lưu</span>
                        </button>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
