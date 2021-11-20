import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import './mdb5/css/mdb.min.css';
import ReactQuill from 'react-quill';
import { getUser, getToken } from './helpers';
import 'react-quill/dist/quill.bubble.css';

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        user: getUser()
    });
    const [content, setContent] = useState('');

    // rich text editor handle change
    const handleContent = event => {
        console.log(event);
        setContent(event);
    };

    // destructure values from state
    const { title, user } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(
                `${process.env.REACT_APP_API}/post`,
                { title, content, user },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', user: '' });
                setContent('');
                // show sucess alert
                alert(`Post titled ${response.data.title} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div>
            <Nav />
            <div className={"container space"}>
                <h1>CREATE POST</h1>
                <br />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input
                            onChange={handleChange('title')}
                            value={title}
                            type="text"
                            className="form-control"
                            placeholder="Post title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Content</label>
                        <ReactQuill
                            onChange={handleContent}
                            value={content}
                            theme="bubble"
                            className="pb-5 mb-3"
                            placeholder="Write something.."
                            style={{ border: '1px solid #666' }}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">User</label>
                        <input
                            onChange={handleChange('user')}
                            value={user}
                            type="text"
                            className="form-control"
                            placeholder="Your name"
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
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

export default Create;
