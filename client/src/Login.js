import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Nav from './Nav';
import './mdb5/css/mdb.min.css';
import { authenticate, getUser } from './helpers';

const Login = props => {
    // create a state
    const [state, setState] = useState({
        name: '',
        password: ''
    });
    const { name, password } = state; // destructure values from state

    useEffect(() => {
        getUser() && props.history.push('/');
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.table({ name, password });
        axios
            .post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then(response => {
                console.log(response);
                // response will contain token and name
                authenticate(response, () => props.history.push('/create'));
                // redirect to create page
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div>
            <Nav />
            <br /><br/>
            <div className={'container space'}>
                <h1>LOGIN</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            onChange={handleChange('name')}
                            value={name}
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input
                            onChange={handleChange('password')}
                            value={password}
                            type="password"
                            className="form-control"
                            placeholder="Your Password"
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
            <br/><br/>
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

export default withRouter(Login);
