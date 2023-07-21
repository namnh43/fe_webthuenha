import React from 'react';
import {Link} from "react-router-dom";

function OwnerSidebar() {
    return (
        <>
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <div className="col-8 col-md-8 col-lg-4">
                        <h1 className="mb-0"><Link to="/" className="h2 mb-0"><strong>Homeland<span
                            className="text-danger">.</span></strong></Link></h1>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./index.html" aria-expanded="false">
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                                <Link to='/owner' style={{color: 'inherit'}}><span className="hide-menu">House List</span></Link>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">UI COMPONENTS</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-buttons.html" aria-expanded="false">
                <span>
                  <i className="ti ti-article"></i>
                </span>
                                <Link to='/owner/add-house-form' style={{color: 'inherit'}}><span className="hide-menu">Add a new house</span></Link>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-alerts.html" aria-expanded="false">
                <span>
                  <i className="ti ti-alert-circle"></i>
                </span>
                                <span className="hide-menu">Alerts</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-card.html" aria-expanded="false">
                <span>
                  <i className="ti ti-cards"></i>
                </span>
                                <span className="hide-menu">Card</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-forms.html" aria-expanded="false">
                <span>
                  <i className="ti ti-file-description"></i>
                </span>
                                <span className="hide-menu">Forms</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-typography.html" aria-expanded="false">
                <span>
                  <i className="ti ti-typography"></i>
                </span>
                                <span className="hide-menu">Typography</span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">AUTH</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./authentication-login.html"
                               aria-expanded="false">
                <span>
                  <i className="ti ti-login"></i>
                </span>
                                <span className="hide-menu">Login</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./authentication-register.html"
                               aria-expanded="false">
                <span>
                  <i className="ti ti-user-plus"></i>
                </span>
                                <span className="hide-menu">Register</span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">EXTRA</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./icon-tabler.html" aria-expanded="false">
                <span>
                  <i className="ti ti-mood-happy"></i>
                </span>
                                <span className="hide-menu">Icons</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./sample-page.html" aria-expanded="false">
                <span>
                  <i className="ti ti-aperture"></i>
                </span>
                                <span className="hide-menu">Sample Page</span>
                            </a>
                        </li>
                    </ul>
                    <div
                        className="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded">
                        <div className="d-flex">
                            <div className="unlimited-access-title me-3">
                                <h6 className="fw-semibold fs-4 mb-6 text-dark w-85">Upgrade to pro</h6>
                                <a href="https://adminmart.com/product/modernize-bootstrap-5-admin-template/"
                                   target="_blank" className="btn btn-primary fs-2 fw-semibold lh-sm">Buy
                                    Pro</a>
                            </div>
                            <div className="unlimited-access-img">
                                <img src="assets_login/images/backgrounds/rocket.png" alt="" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default OwnerSidebar;