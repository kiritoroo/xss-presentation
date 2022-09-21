import React from "react";
import Header from "../components/Header";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
const base_url          = "http://localhost:5000"

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

const fetchPosts = async () => {
  return await axios({
    url: '/getNewFeeds',
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

  const navigate = useNavigate()

  const [imageData, setImageData] = useState("")
  const [content, setContent] = useState("")

  const [postsData, setPostsData] = useState([])


  const initComment = {
    _id   : "",
    comment: ""
  }

  // const initPost = {
  //   caption: "",
  //   image: "",
  //   type: 'post',
  //   createdAt: "",
  //   likers: [],
  //   comments: [],
  //   user: {
  //     _id: "",
  //     fullname: "",
  //     email: "",
  //     profileImage: ""
  //   }
  // }

  const initUser = {
    fullname      : "",
    email         : "",
    city          : "",
    aboutMe       : "",
    coverPhoto    : "",
    profileImage  : ""
  }

  const [userData, setUserData] = useState(initUser)

  const [commentData, setCommentData] = useState(initComment)

  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useQuery('user', fetchUser, {
    retry: false,
    select: (data) => {
      const res = data.data
      // console.log(res)
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

  const {
    data: dataPost,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    isFetching: isFetchinhPost,
    refetch: refetchPost
  } = useQuery('posts', fetchPosts, {
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
        setPostsData(data.data)
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
      refetchPost()
    }
  }

  const onCommentChange = (e) => {
    setCommentData((prev) => (
      { ...prev, comment: e.target.value, _id: e.target.id }
    ))
  }

  const onAddComment = async (e) => {
    e.preventDefault()

    const res = await axios({
      url: '/postComment',
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
      data: {
        _id: commentData._id,
        comment: commentData.comment
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
      setCommentData(initComment)
      refetchPost()
      setPostsData(dataPost.data)
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
                    <div className="col-md-2">
                      {/*  */}
                    </div>

                    <div className="col-md-8">
                      <div className="central-meta">
                        <div className="new-postbox">
                          <figure>
                            <img id="user-profile" src={ userData.profileImage=='' ? './default-avatar.png' : userData.profileImage }/>
                          </figure>

                          <div className="newpst-input">
                            <form onSubmit={(e) => onAddPost(e)}>
                              <input name="type" type="hidden" />
                              <textarea
                                ref={captionInputRef}
                                rows="2"
                                name="caption"
                                placeholder={userData.fullname + ", chia sẻ tâm trạng hôm nay với bạn bè..."}
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

                    { postsData.map(post => {
                      // console.log(post)

                      return (
                        <div key={post._id} className="central-meta item">
                        <div className="user-post">
                          <div className="friend-info">
                            <figure>
                              <img id="user-profile" src={ post.user.profileImage=='' ? './default-avatar.png' : base_url + '/' + post.user.profileImage }/>
                            </figure>
                            <div className="friend-name">
                              <ins>
                                <a href={'#'}>
                                  {post.user.fullname}
                                </a>
                              </ins>
                              <span> Bài viết: { new Date(post.createdAt).getDate() } tháng { new Date(post.createdAt).getMonth() + 1 }, { new Date(post.createdAt).getFullYear() } - lúc { new Date(post.createdAt).getHours() }:{ new Date(post.createdAt).getMinutes() }</span>
                            </div>
                            <div className="post-meta">
                              <div className="description">
                                <p>{post.caption}</p>
                              </div>
                              <img src={ base_url + '/' + post.image }/>

                              <div className="we-video-info">
                                <ul>
                                  <li>
                                    <span className="none">
                                      <i className="ti-thumb-up"></i>
                                      <ins>15</ins>
                                    </span>
                                  </li>
                                  <li>
                                    <span className="comment" title="Comments">
                                      <i className="fa fa-comments-o"></i>
                                      <ins id="count-post-comments"> {post.comments.length} </ins>
                                    </span>
                                  </li>
                                </ul>
                              </div>

                            </div>
                          </div>

                          {/* Commment */}

                          <div id='post-comments'>
                            <div className="coment-area">

                            <ul className="we-comet" style={{ maxHeight: '300px', overflowY: 'scroll' }}>

                            { post.comments.map(comment => {
                            // console.log(comment)

                            return (
                              <li key={comment._id}>
                                <div className="comet-avatar">
                                  <img src={ comment.user.profileImage=='' ? './default-avatar.png' :  base_url + '/' + comment.user.profileImage }/>
                                </div>
                                <div className="we-comment">
                                  <div className="coment-head">
                                    <h5>{comment.user.name}</h5>
                                    <span> { new Date(comment.createAt).getDate() } tháng { new Date(comment.createAt).getMonth() + 1 }, { new Date(comment.createAt).getFullYear() } - lúc { new Date(comment.createAt).getHours() }:{ new Date(post.createdAt).getMinutes() }</span>
                                    <a className="we-reply" title="Reply"><i className="fa fa-reply"></i></a>
                                  </div>
                                  <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
                                </div>

                                <ul>
                                  {/* Reply */}
                                </ul>
                              </li>
                            )
                            }) }

                            </ul>

                              {/* Usser Commment */}
                              <ul className="we-comet">
                                <li className="post-comment">
                                  <div className="comet-avatar">
                                    <img src={ userData.profileImage=='' ? './default-avatar.png' : userData.profileImage }/>
                                  </div>
                                  <div className="post-comt-box">
                                    <form onSubmit={onAddComment}>
                                      <textarea id={post._id}  value={commentData.comment} onChange={(e) => onCommentChange(e)} name="comment" placeholder="Viết bình luận..."></textarea>
                                      <button type="submit">Gửi</button>
                                    </form>
                                  </div>
                                </li>
                              </ul>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                    }) }

                    {/*  */}

                    </div>
                    <div className="col-md-2">
                      {/*  */}
                    </div>
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
