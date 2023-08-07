import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {ListItemButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import {useNavigate} from "react-router";
import Swal from "sweetalert2";

export function Navbar() {
    const menuBarStyle = {
        fontFamily: 'Roboto, sans-serif',
        color: 'blue',
        fontWeight: 'bold'
    };
    const logoStyle = {
        color: 'blue',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#007bff'
        }
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        console.log(event)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            .then(() => navigate('/'))
        Swal.fire({
            icon: 'success',
            title: 'Logged out',
            timer: 1000
        })
    }

    const handleLoginClick = () => {
        setLogin(true)
        console.log('login state', login)
    }

    function openSearchBox() {
        console.log('open search dialog')
    }
    return (
        <>
            <Grid item xs={2}>
                <Box
                    sx={{display: "flex", justifyContent: "flex-end", alignItems: 'center'}}
                >
                    <h1 className="mb-2 mr-5"><Link to="/" className="text-dark-light h2 mb-0"><strong>Homeland<span
                        className="text-danger">.</span></strong></Link></h1>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: 'center'}}>
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
                            <Button onClick={() => {
                                const config = {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`
                                    }
                                }

                                axios.post('http://localhost:8080/user/apply-host', {}, config)
                                    .then((res) => {
                                        handleCloseDialog()
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'You are sent a request to become an owner!',
                                            timer: 2500
                                        })
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
                            <Button className={'text-danger'} onClick={handleCloseDialog}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
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
                    <React.Fragment>
                        <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                            {
                                !login ? <ListItemButton sx={{minWidth: '100px', maxWidth: '100px'}}
                                                         onClick={() => {
                                                             handleLoginClick();
                                                             navigate("/login");
                                                         }}> <ListItemText>Login </ListItemText></ListItemButton> :
                                    <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                        <ListItemText>Welcome {JSON.parse(localStorage.getItem("currentUser")).firstName}</ListItemText>
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                size="small"
                                                sx={{ml: 2}}
                                                aria-controls={ open ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                {JSON.parse(localStorage.getItem('currentUser')).profileImage ?
                                                    <img
                                                        src={JSON.parse(localStorage.getItem('currentUser')).profileImage}
                                                        alt="avatar" width="35"
                                                        height="35" className="rounded-circle"
                                                        onClick={handleLoginClick}/>
                                                    : <img src="/images/profile/user-1.jpg" alt="" width="35"
                                                           height="35" className="rounded-circle"
                                                           onClick={handleLoginClick}/>}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                            }
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => {
                                navigate("/user")
                            }}>
                                <Avatar/> My Account
                            </MenuItem>
                            {localStorage.getItem('currentUserRole') === "ADMIN" &&
                                <MenuItem onClick={() => {
                                    navigate("/admin/users")
                                }}>
                                    <Avatar/> Admin Dashboard
                                </MenuItem>
                            }
                            {
                                localStorage.getItem('currentUserRole') === "USER" ?
                                    <MenuItem onClick={handleClickOpenDialog}>
                                        <Avatar/> Become Owner
                                    </MenuItem> :
                                    <MenuItem onClick={() => {
                                        navigate("/owner")
                                    }}>
                                        <Avatar/> My Houses
                                    </MenuItem>
                            }

                            <Divider/>
                            <MenuItem onClick={clearAllInfo}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                </Box>
            </Grid>
        </>
    )
}