import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export function Navbar() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openOwnerRequestSentDialog, setOpenOwnerRequestSentDialog] = useState(false);
    const handleClickOpenDialog = () => {
        if (localStorage.getItem('currentUserApplyHost') === 'false') {
            setOpenDialog(true);
        }
        if (localStorage.getItem('currentUserApplyHost') === 'true') {
            setOpenOwnerRequestSentDialog(true);
        }

    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenOwnerRequestSentDialog(false)
    };

    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("currentUser") !== null) {
            setLogin(true)
        }
        console.log('initialize state', login)
    }, []);

    const clearAllInfo = () => {
        axios.post('http://localhost:8080/jwt/logout', {token: localStorage.getItem('token')})
            .then(() => localStorage.clear())
            .then(() => setLogin(false))
    }

    const handleClick = () => {
        setLogin(true)
        console.log('login state', login)
    }
    return (
        <>
            <div>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You will send a request to the administrator to become an owner.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={() => {
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            }

                            axios.post('http://localhost:8080/user/apply-host', {}, config)
                                .then((res) => {
                                    handleCloseDialog()
                                    console.log('haha')
                                })
                                .then(() => axios.get(`http://localhost:8080/user/${localStorage.getItem('currentUserId')}`, config)
                                    .then((res) => {
                                        localStorage.setItem('currentUser', JSON.stringify(res.data))
                                        localStorage.setItem("currentUserId", res.data.id)
                                        localStorage.setItem("currentUserRole", res.data.role)
                                        localStorage.setItem("currentUserApplyHost", res.data.applyHost)
                                        console.log(localStorage.getItem("currentUserApplyHost"))
                                    }))
                                .catch(() => alert('Shit'))
                        }} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={openOwnerRequestSentDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your request has already sent. Please wait...
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>OK</Button>

                    </DialogActions>
                </Dialog>
            </div>
            <div className="site-wrap">
                <div className="site-navbar">
                    <div className="container-fluid py-1">
                        <div className="row align-items-center">
                            <div className="col-8 col-md-8 col-lg-4">
                                <h1 className="mb-0"><Link to="/" className="text-white h2 mb-0"><strong>Homeland<span
                                    className="text-danger">.</span></strong></Link></h1>
                            </div>
                            <div className="col-4 col-md-4 col-lg-8">
                                <nav className="site-navigation text-right text-md-right text-end" role="navigation">
                                    <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3">
                                        <a href="src/components/header/nav#" className="site-menu-toggle js-menu-toggle text-white">
                                            <span className="icon-menu h3"/>
                                        </a>
                                    </div>

                                    <ul className="site-menu js-clone-nav d-none d-lg-block">
                                        <li className="active">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li><a href="src/components/header/nav#">About</a></li>
                                        {
                                            !login ? <li><Link to="/login" onClick={handleClick}>Login</Link></li> :
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link nav-icon-hover" href="javascript:void(0)"
                                                       id="drop2"
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                        {JSON.parse(localStorage.getItem('currentUser')).profileImage ?
                                                            <img
                                                                src={JSON.parse(localStorage.getItem('currentUser')).profileImage}
                                                                alt="avatar" width="35"
                                                                height="35" className="rounded-circle"
                                                                onClick={handleClick}/>
                                                            : <img src="./images/profile/user-1.jpg" alt="" width="35"
                                                                   height="35" className="rounded-circle"
                                                                   onClick={handleClick}/>}
                                                    </a>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                                                        aria-labelledby="drop2">
                                                        <div className="message-body">
                                                            <a href="javascript:void(0)"
                                                               className="d-flex align-items-center gap-2 dropdown-item">
                                                                <i className="ti ti-user fs-6"></i>
                                                                <p className="mb-0 ">My Profile</p>
                                                            </a>

                                                            {localStorage.getItem('currentUserRole') === "ADMIN" &&
                                                                <Link to={"/admin"}
                                                                      className="d-flex align-items-center gap-2 dropdown-item">
                                                                    <i className="ti ti-user-circle fs-6"></i>
                                                                    <p className="mb-0 ">Admin Dashboard</p>
                                                                </Link>}

                                                            <a href="javascript:void(0)"
                                                               className="d-flex align-items-center gap-2 dropdown-item">
                                                                <i className="ti ti-home fs-6"></i>
                                                                {
                                                                    localStorage.getItem('currentUserRole') === "USER" ?
                                                                        <p className="mb-0 "
                                                                           onClick={handleClickOpenDialog}>Become
                                                                            Owner</p> :
                                                                        <Link to={"/owner"} className="mb-0 ">My Houses</Link>
                                                                }
                                                            </a>
                                                            <a href="javascript:void(0)"
                                                               className="d-flex align-items-center gap-2 dropdown-item">
                                                                <i className="ti ti-list-check fs-6"></i>
                                                                <p className="mb-0 ">List Agency</p>
                                                            </a>
                                                            <button
                                                                className="btn btn-outline-primary mx-3 mt-2 d-block"
                                                                onClick={clearAllInfo}>Logout
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                        }
                                        <li></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}