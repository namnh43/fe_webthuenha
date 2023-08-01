import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./OwnerHouseList.css"
import {useNavigate} from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import {Link} from "react-router-dom";

function MaintenanceDialog(props) {

    const [startDate, setStartDate] = useState(Date.now)
    const [endDate, setEndDate] = useState(Date.now)
    const [errorMessage, setErrorMessage] = useState('')

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        if ((Date.parse(startDate) <= Date.now() - 86400000)
            || (Date.parse(endDate) <= Date.now() - 86400000)
            || (Date.parse(startDate) > (Date.parse(endDate) - 86400000))
        ) {
            setErrorMessage('* Invalid date')
        } else {
            setErrorMessage('')
        }
    }, [startDate, endDate]);

    return (
        <Dialog
            open={props.openDialog}
            onClose={props.handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Schedule a maintenance for your house"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div style={{color: "red"}}>{errorMessage}</div>
                    <div>
                        <label className="col-4">Start date</label>
                        <input type="date" value={startDate} required
                               onChange={e => setStartDate(e.target.value)}/>
                    </div>
                    <div>
                        <label className="col-4">End date</label>
                        <input type="date" value={endDate} required
                               onChange={e => setEndDate(e.target.value)}/>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDialog}>Cancel</Button>
                <Button onClick={() => {
                    if (errorMessage !== '') {
                        return
                    }
                    let data = {
                        "house": {
                            "id": props.maintainedHouseId
                        },
                        "startDate": startDate,
                        "endDate": endDate,
                        "bookingStatus": "MAINTENANCE"
                    }
                    axios.post(`http://localhost:8080/booking/create`, data, config)
                        .then(() => props.handleCloseDialog())
                }}>Schedule</Button>
            </DialogActions>
        </Dialog>
    )
}

function OwnerHouseList() {

    const navigate = useNavigate()

    const [houseList, setHouseList] = useState([])

    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const housesPerPage = 5;
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/house/host/${localStorage.getItem('currentUserId')}`, config)
            .then((res) => {
                console.log(res.data)
                setHouseList(res.data.reverse())
            });
    }, []);

    const blockHouse = (itemId) => {
        Swal.fire({
            title: 'Block this house?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:8080/house/block/${itemId}`,null, config)
                    .then(res => console.log(res))
                    .then(() => axios.get(`http://localhost:8080/house/host/${localStorage.getItem('currentUserId')}`, config)
                        .then(res => {
                            console.log(res.data)
                            setHouseList(res.data.reverse());
                            Swal.fire(
                                'Blocked!',
                                'This house has been blocked.',
                                'success'
                            );
                        })
                    )
                    .catch(error => {
                        Swal.fire(
                            'Something went wrong!',
                            'You cannot block this house.',
                            'error'
                        );
                        console.error("Lỗi khi xóa dữ liệu:", error);
                    });
            }
        });
    }

    const unBlockHouse = (itemId) =>  Swal.fire({
        title: 'Unblock this house?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unblock it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.put(`http://localhost:8080/house/un-block/${itemId}`,null, config)
                .then(res => console.log(res))
                .then(() => axios.get(`http://localhost:8080/house/host/${localStorage.getItem('currentUserId')}`, config)
                    .then(res => {
                        console.log(res.data)
                        setHouseList(res.data.reverse());
                        Swal.fire(
                            'Success!',
                            'This house has been re-actived.',
                            'success'
                        );
                    })
                )
                .catch(error => {
                    Swal.fire(
                        'Something went wrong!',
                        'You cannot unblock this house.',
                        'error'
                    );
                    console.error("Lỗi khi xóa dữ liệu:", error);
                });
        }
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [maintainedHouseId, setMaintainedHouseId] = useState(0);

    let handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (<>
        <MaintenanceDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} maintain
                           maintainedHouseId={maintainedHouseId}/>
        <h1>House List</h1>
        <section className="main">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Address</th>
                    <th>Sale</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {houseList
                    .slice(pagesVisited, pagesVisited + housesPerPage)
                    .map((item, index) => {
                        return (<tr key={item.id}>
                            <td>{index + 1 + pagesVisited}</td>
                            {item.images.length > 0 ?
                                <td><img src={item.images[0].fileUrl} style={{height:'4rem', width:'7rem' }} alt=""/></td> : <td></td>}
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.address}</td>
                            <td>add later</td>
                            {item.blocked === false ?
                                (<td><span style={{display: 'inline-block', backgroundColor: 'lightgreen', height: '6px', width: '6px', borderRadius: '50%', marginBottom: '3px', marginRight: '5px'}}></span>Active</td>)
                                :(<td><span style={{display: 'inline-block', backgroundColor: 'red', height: '6px', width: '6px', borderRadius: '50%', marginBottom: '3px', marginRight: '5px'}}></span>Blocked</td>)}
                            <td className="col-2">
                                {/*<button style={{backgroundColor: 'transparent'}}><i className="material-icons">&#xe88e;</i></button>*/}
                                <button style={{backgroundColor: 'transparent'}}
                                         onClick={() => navigate(`/owner/edit-house-form/${item.id}`)}>
                                    <i className="material-icons">&#xe3c9;</i></button>
                                <button  style={{backgroundColor: 'transparent'}} className="ml-3 mr-3" onClick={() => {
                                    setMaintainedHouseId(item.id)
                                    setOpenDialog(true)
                                }}><i className="material-icons" >&#xea3c;</i></button>
                                {item.blocked === false ?
                                    (<button style={{backgroundColor: 'transparent'}} onClick={() => blockHouse(item.id)}>
                                        <i className="material-icons">&#xe897;</i></button>)
                                :(<button style={{backgroundColor: 'transparent'}} onClick={() => unBlockHouse(item.id)}>
                                        <i className="material-icons">&#xe898;</i></button>)}

                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
            <PaginationComponent data={houseList} numberPerpage={housesPerPage} changeCurentPage={handlePageChange}/>

        </section>
    </>);
}

export default OwnerHouseList;