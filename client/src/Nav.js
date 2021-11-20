import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getUser, logout } from './helpers';

const Nav = ({ history }) => (
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark fixed-top navbar-scroll">
        <div class="container-fluid">
            <button
                class="navbar-toggler ps-0"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarExample01"
                aria-controls="navbarExample01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <span
                class="navbar-toggler-icon d-flex justify-content-start align-items-center"
            >
              <i class="fas text-dark fa-bars"></i>
            </span>
            </button>
            <div class="collapse navbar-collapse" id="navbarExample01">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link className={"nav-link text-white"} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link text-white"} to="/create">Create</Link>
                    </li>

                </ul>

                <ul class="navbar-nav flex-row">
                    <li class="nav-item">
                        <a
                            class="nav-link pe-2"
                            href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab text-white fa-youtube"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link px-2"
                            href="https://www.facebook.com/mdbootstrap"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab text-white fa-facebook-f"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link px-2"
                            href="https://twitter.com/MDBootstrap"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab text-white fa-twitter"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link ps-2"
                            href="https://github.com/mdbootstrap/mdb-ui-kit"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab text-white fa-github"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                    {!getUser() && (
                        <a className="nav-link ps-2">
                            <Link className={"text-white"} to="/login">Login</Link>
                        </a>
                    )}

                        {getUser() && (
                            <a
                                onClick={() => logout(() => history.push('/'))}
                                className="nav-link ps-2"
                                style={{ cursor: 'pointer' }}
                            >
                                <span className={"text-white"}>Logout</span>

                            </a>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default withRouter(Nav);
