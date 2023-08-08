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
    const [ascending,setAscending] = useState(true);
    const [message, setMessage] = useState({
        id: '',
        msg: '',
        blocked:false
    });

    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [currentUserId,setCurrentUserId] = useState(null);

    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const [housesPerPage,setHousesPerPage] = useState(5);
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const url = Constants.BASE_API+'/admin/list-host'; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                const params = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }; // Các tham số truyền cho API (nếu cần)
                const fetchedData = await fetchData(url, params);
                setHosts(fetchedData);
                setSearchHost(fetchedData);
                console.log(fetchedData)

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
            url = Constants.BASE_API+'/admin/unlock-user/'+ id;
        } else {
            url = Constants.BASE_API+'/admin/block-user/'+ id;
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
        const keyword = document.getElementById('name-input').value.trim().toLowerCase();
        const searchFilter = searchHost.filter((host) => {
            if (!keyword
                || host.user?.username?.toLowerCase().includes(keyword)
                || host.user?.phoneNumber?.toString().includes(keyword)
                || host.houseCount?.toString().includes(keyword)
                || host.user?.earnedMoney?.toString().includes(keyword)
                || host.user?.createAt?.toString().includes(keyword)
            ) {
                return true;
            }
            return false;
        });
        setHosts(searchFilter);
    }
    function toggleAscending() {
        setAscending(prevAscending => !prevAscending);
    }

    function idClick(){
        toggleAscending()
        const sorted = searchHost.sort((a, b) => {
            if (a.user?.id < b.user?.id) {
                return ascending ? -1 : 1;
            } else if (a.user?.id > b.user?.id) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setHosts(sorted);
    }
    function userClick(){
        toggleAscending()
        const sorted = searchHost.sort((a, b) => {
            if (a.user?.username < b.user?.username) {
                return ascending ? -1 : 1;
            } else if (a.user?.username > b.user?.username) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setHosts(sorted);
    }
    function phoneClick(){
        toggleAscending()
        const sorted = searchHost.sort((a, b) => {
            if (a.user?.phoneNumber < b.user?.phoneNumber) {
                return ascending ? -1 : 1;
            } else if (a.user?.phoneNumber > b.user?.phoneNumber) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setHosts(sorted);
    }
    function homeClick(){
        toggleAscending()
        const sorted = searchHost.sort((a, b) => {
            if (a.houseCount < b.houseCount) {
                return ascending ? -1 : 1;
            } else if (a.houseCount > b.houseCount) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setHosts(sorted);
    }
    function moneyClick(){
        toggleAscending()
        const sorted = searchHost.sort((a, b) => {
            if (a.user?.earnedMoney < b.user?.earnedMoney) {
                return ascending ? -1 : 1;
            } else if (a.user?.earnedMoney > b.user?.earnedMoney) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setHosts(sorted);
    }

    return (
        <>  <h2 className="my-3">Host List</h2>
            <input onChange={search}  id="name-input" name="name" type="text" placeholder="Enter keyword" required />
                <section className="main">
                    <div className={'table-container mb-3'}>
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                        <tr className={"table-head"}>
                        <th className="text-center"><button onClick={idClick}>#</button></th>
                            <th className="text-center"><button onClick={userClick}>UserName</button></th>
                            <th className="text-center"><button onClick={phoneClick}>Phone number</button></th>
                            <th className="text-center"><button onClick={homeClick}>Number home</button></th>
                            <th className="text-center"><button onClick={moneyClick}>Earn money($)</button></th>
                            <th className="text-center"><button >Created at</button></th>
                            <th className="text-center"><button >Status</button></th>
                            <th className="text-center"><button >Action</button></th>
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
                                    <td>{item.user.earnedMoney}</td>
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
                    </div>
                    <div style={{marginLeft:'auto'}}>
                        Entries/page &nbsp;
                        <select onChange={(event)=>{
                            setHousesPerPage(event.target.value);
                        }} name="page" style={{border: '1px solid #bdbdbd', borderRadius: '5px', textAlign:'center', height:'40px', width:'60px'}}>
                            <option value="5">---</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <PaginationComponent data={hosts} numberPerpage={housesPerPage} changeCurentPage={handlePageChange}/>
                </section>
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