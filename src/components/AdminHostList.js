import './AdminHostList.css'
import {fetchData, postData} from "../utils/api";
import {useEffect, useState} from "react";
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
import HostProfileDialog from "./dialog/HostProfileDialog";

export function AdminHostList() {
    const [hosts, setHosts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState({
        id: '',
        msg: '',
        blocked:false
    });
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [currentUserId,setCurrentUserId] = useState(null);

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
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataAsync();
    }, [])
    const lockHost = (id) => {
        console.log('lock_id', id)
        setMessage({id: id, msg: "This account is gonna be blocked. Are you sure?",blocked:false})
        setOpenDialog(true)
    }
    const unlockHost = (id) => {
        console.log('unlock_id', id)
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
        console.log('url',url)
        const params = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }; // Các tham số truyền cho API (nếu cần)
        postData(url, {}, params ).then(() => {
            //update hosts list after
            //remove item from list
            const newList = hosts.map((item,key) => {
                console.log(item)
                if(item.user.id == id) {
                    item.user.blocked = !item.user.blocked;
                }
                return item;
            })
            console.log('done here',newList)
            setHosts(newList);
        })
        //call api to block
        setOpenDialog(false);
    }

    const handleProfileEdit = (id) => {
        setCurrentUserId(id);
        setOpenProfileDialog(true);
    }

    return (
        <>
            {hosts.length <= 0 ? <h1>There no data</h1> : (
                <section className="main">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date Created</th>
                            <th>Phone number</th>
                            <th>Number home</th>
                            <th>Earn money(VND)</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hosts.map((item, key) => {
                            return (

                                <tr>
                                    <td>{key}</td>
                                    <td><img src="./images/profile/user-1.jpg" alt=""
                                             className="avatar"/>{item.user.username}
                                    </td>
                                    <td>04/10/2013</td>
                                    <td>{item.user.phoneNumber}</td>
                                    <td>{item.houseCount}</td>
                                    <td>10000</td>
                                    {!item.user.blocked ?
                                        <td><span className="status text-success">&bull;</span> Active</td> :
                                        <td><span className="status text-danger">&bull;</span> Suspended</td>}
                                    {/*{item.enable ? <td><button type="button" className="btn btn-danger">Block</button></td> :*/}
                                    {/*    <td><button type="button" className="btn btn-primary">Allow</button></td>}*/}
                                    <td>
                                        <a href="#" onClick={() => handleProfileEdit(item.user.id)} className="settings text-dark-light" title="Edit"
                                           data-toggle="tooltip"><i
                                            className="material-icons material-symbols-outlined">&#xe88e;</i></a>
                                        {item.user.blocked ?
                                            <a href="#" onClick={() => unlockHost(item.user.id)} className="settings"
                                               title="unlock" data-toggle="tooltip"><i
                                                className="material-icons text-dark-light">&#xe897;</i></a> :
                                            <a href="#" onClick={() => lockHost(item.user.id)}
                                               className="settings text-dark-light" title="block"
                                               data-toggle="tooltip"><i className="material-icons">&#xe898;</i></a>}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <div className="clearfix">
                        <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul className="pagination">
                            <li className="page-item disabled"><a href="#">Previous</a></li>
                            <li className="page-item"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item active"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link">Next</a></li>
                        </ul>
                    </div>
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