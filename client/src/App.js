import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import './mdb5/css/mdb.min.css';
import 'animate.css';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { getUser, getToken } from './helpers';

const App = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios
            .get(`${process.env.REACT_APP_API}/posts`)
            .then(response => {
                // console.log(response);
                setPosts(response.data);
            })
            .catch(error => alert('Error fetching posts'));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this post?');
        if (answer) {
            deletePost(slug);
        }
    };

    const deletePost = slug => {
        // console.log('delete', slug, ' post');
        axios
            .delete(`${process.env.REACT_APP_API}/post/${slug}`, {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
            .then(response => {
                alert(response.data.message);
                fetchPosts();
            })
            .catch(error => alert('Error deleting post'));
    };

    return (
        <div>
            <Nav />
            <div className={"intro"}>
                <div className={"container"}>
                    <h1 className={"display-2 animate__animated animate__fadeInDown text-info"}>
                        Blog Articles
                    </h1>
                    <div className={"animate__animated animate__fadeInUp"}>
                        <a href="mailto:stephenbrooks714@gmail.com" className={"btn btn-info"}>LEARN MORE</a>
                    </div>
                </div>
            </div>
            <br />
            <div className={"container"}><div className={"row mt-5"}>
                <div className={"col-md mt-3"}>
                    <h3>All Kinds</h3>
                    <p className={"lead"}>
                        Ideas to paper and the web can be frustrating sometimes. But
                        if you make small notes towards your projects then it may
                        come together easier.
                    </p>
                    <a href="mailto:stephenbrooks714@gmail.com" className={"btn btn-primary"}>EMAIL ME</a>
                </div>
                <div className={"col-md mt-3"}>
                    <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80"
                         className={"img-thumbnail"}
                         alt="coffee"/>
                </div>
            </div>
            </div>
            <br/><br/><br/>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md"}>
                            <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                                 class={"img-thumbnail"}
                                 alt="post image"/>
                        </div>
                        <div className={"col-md"}>
                            <h3>Low Tides</h3>
                            <hr/>
                            <p className={"lead"}>
                                Rethinking the way we present our technology and media may make
                                the difference in our articles. Think about the perseverance and
                                what makes you write at all.
                            </p>
                            <a href="mailto:stephenbrooks714@gmail.com" className={"btn btn-primary"}>EMAIL ME</a>
                        </div>
                    </div>
                </div>
            <br/><br/><br/>
            <div className={"container"}>
                <h1>Recent Blogs</h1>
                <hr />
                {posts.map((post, i) => (
                    <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
                        <div className="col pt-3 pb-2">
                            <div className="row">
                                <div className="col-md-10">
                                    <Link to={`/post/${post.slug}`}>
                                        <h2>{post.title}</h2>
                                    </Link>
                                    <div className="lead pt-3">{renderHTML(post.content.substring(0, 100))}</div>
                                    <p>
                                        Author <span className="badge">{post.user}</span> Published on{' '}
                                        <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                                    </p>
                                </div>

                                {getUser() && (
                                    <div className="col-md-2">
                                        <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => deleteConfirm(post.slug)}
                                            className="btn btn-sm btn-outline-danger ml-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <section className="">
                <footer className="text-center text-white footer-main">

                    <div className="container p-4 pb-0">
                        <section className="">
                            <p className="d-flex justify-content-center align-items-center">
                                <span className="me-3">Register for free</span>
                                <a type="button" href={"mailto:stephenbrooks714@gmail.com"} className="btn btn-outline-light btn-rounded">
                                    Sign up!
                                </a>
                            </p>
                        </section>
                    </div>
                    <div className="text-center p-3 footer-btm">
                        © 2020 Copyright:
                        <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default App;
