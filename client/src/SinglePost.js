import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import './mdb5/css/mdb.min.css';
import 'animate.css';
import renderHTML from 'react-render-html';

const SinglePost = props => {
    const [post, setPost] = useState('');

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => setPost(response.data))
            .catch(error => alert('Error loading single post'));
    }, []);

    const showSinglePost = () => (
        <div className="row">
            <div className="col-md-8 offset-md-2 pt-3 pb-2">
                <h1 className={"animate__animated animate__fadeInRight"}>{post.title}</h1>
                <div className="animate__animated animate__fadeInUp lead pt-3">{renderHTML(post.content)}</div>
                <p className={"animate__animated animate__fadeInDown"}>
                    Author <span className="badge">{post.user}</span> Published on{' '}
                    <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                </p>
            </div>
        </div>
    );

    return (
        <div>
            <Nav />
            <br/><br/>
            <div className={"container space"}>
                {post && showSinglePost()}
            </div>
            <br/><br/>
            <section className="">
                <footer className="text-center text-white footer-main">

                    <div className="container p-4 pb-0">
                        <section className="">
                            <p className="d-flex justify-content-center align-items-center">
                                <span className="me-3">Register for free</span>
                                <button type="button" className="btn btn-outline-light btn-rounded">
                                    Sign up!
                                </button>
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

export default SinglePost;
