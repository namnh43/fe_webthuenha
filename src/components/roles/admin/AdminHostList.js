// import './AdminHostList.css'
import {fetchData, postData} from "../../../utils/api";
import React, {useEffect, useState} from "react";
import InfoIcon from '@mui/icons-material/Info';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';
// @mui
import {
    Grid,
    IconButton,
    CardHeader,
    Card,
    CardContent,
    Radio,
    FormControlLabel,
    Typography,
    FormControl,
    Paper, Button, Stack, Snackbar
} from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import HostProfileDialog from "../../dialog/HostProfileDialog";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import '../../scroll/scroll.css'

export function AdminHostList() {
    const [hosts, setHosts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchHost, setSearchHost] = useState([]);
    const [message, setMessage] = useState({
        id: '',
        msg: '',
        blocked:false
    });

    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [currentUserId,setCurrentUserId] = useState(null);

    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const housesPerPage = 10;
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const url = 'http://localhost:8080/admin/list-host'; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                const params = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }; // Các tham số truyền cho API (nếu cần)
                const fetchedData = await fetchData(url, params);
                setHosts(fetchedData);
                setSearchHost(fetchedData);

                //set current pagination
                // setCurrentDisplayNumber(fetchedData.slice(pageNumber*housesPerPage, pageNumber*housesPerPage + housesPerPage).length);
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataAsync();
    }, [])
    const lockHost = (id) => {
        setMessage({id: id, msg: "This account is gonna be blocked. Are you sure?",blocked:false})
        setOpenDialog(true)
    }
    const unlockHost = (id) => {
        setMessage({id: id, msg: "This account is gonna be re-activated. Are you sure?",blocked: true})
        setOpenDialog(true)
    }
    const handleCloseDialog = (event, reason) => {
        // if (reason && reason == "backdropClick")
        //     return;
        setOpenDialog(false);
    };
    const handleCloseProfileDialog = (event,reason) => {
        setOpenProfileDialog(false);
    }
    const handlleCloseDialogOK = (id, current_block) => {
        let url = '';
        if (current_block) {//is blocking -> then unlock
            url = 'http://localhost:8080/admin/unlock-user/'+ id;
        } else {
            url = 'http://localhost:8080/admin/block-user/'+ id;
        }
        const params = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }; // Các tham số truyền cho API (nếu cần)
        postData(url, {}, params ).then(() => {
            //update hosts list after
            //remove item from list
            const newList = hosts.map((item,key) => {
                if(item.user.id == id) {
                    item.user.blocked = !item.user.blocked;
                }
                return item;
            })
            setHosts(newList);
        })
        //call api to block
        setOpenDialog(false);
    }

    const handleProfileEdit = (id) => {
        setCurrentUserId(id);
        setOpenProfileDialog(true);
    }
    function search() {
        const userName = document.getElementById('name-input').value.trim().toLowerCase();
        const home = document.getElementById('home-input').value;
        const numberPhone = document.getElementById('numberPhone-input').value;

        const searchFilter = searchHost.filter((host) => {
            if (
                (!userName || host.user?.username?.toLowerCase().includes(userName)) &&
                (!home || host.houseCount >= home ) &&
                (!numberPhone || host.user.phoneNumber === numberPhone )
            ) {
                return true;
            }
            return false;
        });
        setHosts(searchFilter);
    }

    return (
        <>
            <div className={'row g-3'} onChange={search}>
                <div className="col-sm-7">
                    <label htmlFor="name-input"></label>
                    <input className={'form-control'} id="name-input" name="name" type="text" placeholder="Enter username" required />
                </div>
                <div className="col-sm">
                    <label htmlFor="home-input"></label>
                    <input className={'form-control'} id="home-input" name="name" type="number" placeholder="Enter total home" required />
                </div>
                <div className="col-sm">
                    <label htmlFor="numberPhone-input"></label>
                    <input className={'form-control'} id="numberPhone-input" name="numberPhone" type="number" placeholder="Enter number phone" required />
                </div>
            </div>
            {hosts.length <= 0 ? <div className="my-3 alert alert-primary" role="alert">There no data</div> : (
                <section className="main">
                    <h2 className="my-3">Host List</h2>
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">UserName</th>
                            <th className="text-center">Phone number</th>
                            <th className="text-center">Number home</th>
                            <th className="text-center">Earn money($)</th>
                            <th className="text-center">Created at</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            hosts.slice(pagesVisited, pagesVisited + housesPerPage).map((item,key) => {
                            return (

                                <tr key={key}>
                                    <td>{key + 1 + pagesVisited}</td>
                                    <td><img src="./images/profile/user-1.jpg" alt=""
                                             className="avatar"/>{item.user.username}
                                    </td>
                                    <td>{item.user.phoneNumber}</td>
                                    <td>{item.houseCount}</td>
                                    <td>10000</td>
                                    <td>{item.user.createAt}</td>
                                    {!item.user.blocked ?
                                        <td><span className="status text-success">&bull;</span> Active</td> :
                                        <td><span className="status text-danger">&bull;</span> Suspended</td>}
                                    <td style={{width: '100px'}} className="text-center">
                                            <button onClick={() => handleProfileEdit(item.user.id)} style={{backgroundColor: 'transparent'}} className="mr-3">
                                                <Tooltip title="INFO"><i className="material-icons">&#xe88e;</i></Tooltip></button>

                                        {item.user.blocked ?
                                                <button style={{backgroundColor: 'transparent'}} onClick={() => unlockHost(item.user.id)}><Tooltip title="DEACTIVE"><i className="material-icons">&#xe897;</i></Tooltip></button>
                                             :
                                                <button style={{backgroundColor: 'transparent'}} onClick={() => lockHost(item.user.id)}><Tooltip title="ACTIVE"><i className="material-icons">&#xe898;</i></Tooltip></button>
                                            }
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <PaginationComponent data={hosts} numberPerpage={housesPerPage} changeCurentPage={handlePageChange}/>
                </section>)

            }
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Confirmation Dialog"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={() => handlleCloseDialogOK(message.id,message.blocked)} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <HostProfileDialog open={openProfileDialog} onClose={handleCloseProfileDialog} id={currentUserId}/>
        </>
    )
}