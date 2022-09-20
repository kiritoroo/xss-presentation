import React from "react";
import Header from "../components/Header";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import "./Home.css";

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


export default function Home() {

  const [imageData, setImageData] = useState("")
  const [content, setContent] = useState("")

  const initUser = {
    fullname      : "",
    email         : "",
    city          : "",
    aboutMe       : "",
    coverPhoto    : "",
    profileImage  : ""
  }

  const [userData, setUserData] = useState(initUser)

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

  const postImageRef = useRef()
  const imageUpRef = useRef()
  const captionInputRef = useRef()

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = async (e) => {
        postImageRef.current.src = e.target.result
        const imgBase64 = await toBase64(event.target.files[0])
        setImageData(imgBase64)
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  const onAddPost = async (e) => {
    e.preventDefault()

    const res = await axios({
      url: '/postAdd',
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
      data: {
        caption: content, imageData
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

    if (res.status == 'success') {
      captionInputRef.current.value = ""
      postImageRef.current.src = ""
    }
  }


  return (
    <>
      <Header />

      <div className="home-head-offset"></div>

      <div className="Home-wrap">
        <section>
          <div className="gap gray-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="row" id="page-contents">
                    <div className="col-md-3">{/*  */}</div>

                    <div className="col-md-6">
                      <div className="central-meta">
                        <div className="new-postbox">
                          <figure>
                            <img id="user-profile" src={ userData.profileImage=='' ? './public/default-avatar.png' : userData.profileImage }/>
                          </figure>

                          <div className="newpst-input">
                            <form onSubmit={(e) => onAddPost(e)}>
                              <input name="type" type="hidden" />
                              <textarea
                                ref={captionInputRef}
                                rows="2"
                                name="caption"
                                placeholder={userData.fullname + ", hãy chia sẻ trạng thái hôm nay của bạn..."}
                                onChange={(e) => setContent(e.target.value)}
                              ></textarea>
                              <div className="attachments">
                                <ul>
                                  <li>
                                    <img
                                      ref={postImageRef}
                                      id="post-img-preview"
                                      // style={{ display: "none" }}
                                    />
                                  </li>
                                  <i className="fa fa-image"></i>
                                  <label className="fileContainer">
                                    <input
                                      ref={imageUpRef}
                                      type="file"
                                      name="image"
                                      accept="image/*"
                                      onChange={onImageChange}
                                    />
                                  </label>
                                  <li>
                                    <button type="submit">Đăng bài</button>
                                  </li>
                                </ul>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      {/*  */}
                      <div className="loadMore" id="newsfeed"></div>
                    </div>

                    <div className="col-md-3">{/*  */}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
