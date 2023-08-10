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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SockJS from "sockjs-client";
import Constants from "../../../utils/constants";
import Stomp from "stompjs";
import { useSnackbar } from 'notistack';
import Badge from '@mui/material/Badge';

export function Navbar({isSticky}) {
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
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [openOwnerRequestSentDialog, setOpenOwnerRequestSentDialog] = useState(false);

    //handle notifycation
    const { enqueueSnackbar } = useSnackbar();
    const [notifies,setNotifies] = useState(['notify 1','notify 2']);
    const [anchorElNotify, setAnchorElNotify] = React.useState(null);
    const openNotify = Boolean(anchorElNotify);
    const [read,setRead] = useState(true);
    const handleClickNotify = (event) => {
        setAnchorElNotify(event.currentTarget);
        //mark read
        if (!read) {
            //call api to mark read
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.put(`${Constants.BASE_API}/notify`,null, config).then((res) => {
                setNotifies(res.data.reverse())
            })
        }
        setRead(true);
    };
    const handleCloseNotify = () => {
        console.log('close notify')
        setAnchorElNotify(null);
    };

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
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        if (localStorage.getItem('token')) {
            axios.get(`${Constants.BASE_API}/notify`, config).then((res) => {
                setNotifies(res.data.reverse())
            })
        }
    },[])

    useEffect(() => {
        const currentUserId = localStorage.getItem('currentUserId');
        console.log('current user', currentUserId)
        if (currentUserId) {
            const socket =new SockJS(Constants.WS_URL);
            const stompClient = Stomp.over(socket);
            const onConnect = () => {
                console.log('Connected to WebSocket server');

                // Subscribe to the desired destination (topic or queue)
                const subscribeURL = "/users/" + currentUserId + "/booking"
                stompClient.subscribe(subscribeURL,updateNotify);
            };
            const onDisconnect = () => {
                console.log('Disconnected from WebSocket server');
                // Perform any cleanup or handling when the socket is disconnected.
            };

            const onError = (error) => {
                console.error('WebSocket error:', error);
                // Handle any WebSocket errors.
            };
            // Connect to the WebSocket server
            let config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            if (currentUserId != 'null')
                stompClient.connect({config}, onConnect, onError);
            return () => {
                stompClient.disconnect()
            };
        }
    },[])

    const updateNotify = (message) => {
        enqueueSnackbar('You have a new message!', { variant: 'success' });
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        setRead(false);
        axios.get(`${Constants.BASE_API}/notify`, config).then((res) => {
            setNotifies(res.data.reverse())
        })
    }

    const clearAllInfo = () => {
        axios.post(Constants.BASE_API+'/jwt/logout', {token: localStorage.getItem('token')})
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
                    <h1 className="mb-2 mr-5" style={{paddingBottom: "3px"}}><Link to="/" className="text-dark-light h2 mb-0"><strong>Homeland<span
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

                                axios.post(Constants.BASE_API+'/user/apply-host', {}, config)
                                    .then((res) => {
                                        handleCloseDialog()
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'You are sent a request to become an owner!',
                                            timer: 2500
                                        })
                                        console.log('haha')
                                    })
                                    .then(() => axios.get(Constants.BASE_API+`/user/${localStorage.getItem('currentUserId')}`, config)
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
                                        <IconButton sx={{marginRight:'15px', paddingBottom:'10px'}}>
                                            {notifies.filter((item) => {
                                                return (item.read == false)
                                            }).length == 0 ? <NotificationsNoneIcon
                                                onClick={handleClickNotify}
                                                size="small"
                                                color={notifies.filter((item) => {
                                                    return (item.read == false)
                                                }).length > 0 ? "primary" : (isSticky ? "default" : "primary")}
                                                aria-controls={ openNotify ? 'positioned-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openNotify ? 'true' : undefined}
                                            ></NotificationsNoneIcon> :
                                                <Badge badgeContent={notifies.filter((item) => {
                                                    return (item.read == false)
                                                }).length > 5 ? '5+' : notifies.filter((item) => {
                                                    return (item.read == false)
                                                }).length} color="primary">
                                                    <NotificationsNoneIcon
                                                        onClick={handleClickNotify}
                                                        size="small"
                                                        color={notifies.filter((item) => {
                                                            return (item.read == false)
                                                        }).length > 0 ? "primary" : (isSticky ? "default" : "primary")}
                                                        aria-controls={ openNotify ? 'positioned-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openNotify ? 'true' : undefined}
                                                    >
                                                    </NotificationsNoneIcon>
                                                </Badge>
                                            }

                                        <Menu
                                            id="positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorElNotify}
                                            open={notifies.length > 0 ? openNotify : false}
                                            onClose={handleCloseNotify}
                                            onClick={handleCloseNotify}
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
                                            <div
                                                style={{
                                                    overflowY: 'auto',
                                                    height: notifies.length > 10 ? '300px' : 'auto',
                                                    width: 'auto'
                                                }}>
                                                <div>
                                                    {notifies.length <= 0 ? <></> : (
                                                        <div className='d-flex flex-column'>
                                                            {notifies.map((item, key) => (
                                                                <div key={key}>
                                                                    <div className='d-flex'>
                                                                    <img
                                                                        src={item?.sourceUser?.profileImage}
                                                                        style={{
                                                                            height: '20px',
                                                                            width: '20px',
                                                                            borderRadius: '50%',
                                                                            display: 'block',
                                                                            marginTop: '8px',
                                                                            marginLeft: '8px'
                                                                        }}
                                                                    />
                                                                    <MenuItem onClick={() => navigate("/owner/booking")}>{item.message}</MenuItem>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                </Menu>
            </IconButton>
            <ListItemText style={{paddingBottom: '5px'}}>Welcome {JSON.parse(localStorage.getItem("currentUser")).firstName}</ListItemText>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 1, mb:1}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {JSON.parse(localStorage.getItem('currentUser')).profileImage ?
                        <img
                            src={JSON.parse(localStorage.getItem('currentUser')).profileImage}
                            alt="avatar" width="40"
                            height="40" className="rounded-circle"
                            onClick={handleLoginClick}/>
                        : <img src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1" alt="" width="40"
                               height="40" className="rounded-circle"
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