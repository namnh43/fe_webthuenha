import './AdminHostList.css'
import {fetchData} from "../utils/api";
import {useEffect, useState} from "react";
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
export function AdminHostList() {
    const [hosts, setHosts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState({
        id: '',
        msg: ''
    });
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const url = 'http://localhost:8080/admin/list-host'; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                const params = {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWlkbyIsImlhdCI6MTY4OTkxNDgyOSwiZXhwIjoxNjkwMDAxMjI5fQ.MB0NaNT0dR5AZup2At9zrfs6gkEy5vP7yS6wqamAdy0",
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
        setMessage({id:id,msg:"This account is gonna be blocked. Are you sure?"})
        setOpenDialog(true)
    }
    const unlockHost = (id) => {
        console.log('unlock_id', id)
        setMessage({id:id,msg:"This account is gonna be re-activated. Are you sure?"})
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handlleCloseDialogOK = (id) => {
        console.log('ok',id)
        setOpenDialog(false);
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
                                             className="avatar"/>{item.username}
                                    </td>
                                    <td>04/10/2013</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>10</td>
                                    <td>10000</td>
                                    {item.active ? <td><span className="status text-success">&bull;</span> Active</td> :
                                        <td><span className="status text-danger">&bull;</span> Suspended</td>}
                                    {/*{item.active ? <td><button type="button" className="btn btn-danger">Block</button></td> :*/}
                                    {/*    <td><button type="button" className="btn btn-primary">Allow</button></td>}*/}
                                    <td>
                                        <a href="#" className="settings text-dark-light" title="Edit"
                                           data-toggle="tooltip"><i
                                            className="material-icons material-symbols-outlined">&#xe3c9;</i></a>
                                        {item.active ?
                                            <a href="#" onClick={() => lockHost(item.id)} className="settings"
                                               title="Block" data-toggle="tooltip"><i
                                                className="material-icons text-dark-light">&#xe897;</i></a> :
                                            <a href="#" onClick={() => unlockHost(item.id)}
                                               className="settings text-dark-light" title="Unlock"
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
                    {"Confirmation Dialog?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={() => handlleCloseDialogOK(message.id)} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}