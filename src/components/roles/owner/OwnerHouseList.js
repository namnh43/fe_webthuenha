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
import Tooltip from "@mui/material/Tooltip";

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
                        <label className="col-4 text-dark">Start date</label>
                        <input type="date" value={startDate} required
                               onChange={e => setStartDate(e.target.value)}/>
                    </div>
                    <div>
                        <label className="col-4 text-dark">End date</label>
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
                    axios.post(Constants.BASE_API+`/booking/create`, data, config)
                        .then(() => props.handleCloseDialog())
                }}>Schedule</Button>
            </DialogActions>
        </Dialog>
    )
}

function OwnerHouseList() {

    const navigate = useNavigate()
    const [houseList, setHouseList] = useState([])
    const [searchHouse, setSearchHouse] = useState([]);
    //pagination
    const [pagesVisited, setPagesVisited] = useState(0);
    const [housesPerPage,setHousesPerPage] = useState(5);
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(Constants.BASE_API+`/house/host/${localStorage.getItem('currentUserId')}`, config)
            .then((res) => {
                console.log(res.data)
                setHouseList(res.data.reverse())
                setSearchHouse(res.data)
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
                axios.put(Constants.BASE_API+`/house/block/${itemId}`, null, config)
                    .then(res => console.log(res))
                    .then(() => axios.get(Constants.BASE_API+`/house/host/${localStorage.getItem('currentUserId')}`, config)
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

    const unBlockHouse = (itemId) => Swal.fire({
        title: 'Unblock this house?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unblock it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.put(Constants.BASE_API+`/house/un-block/${itemId}`, null, config)
                .then(res => console.log(res))
                .then(() => axios.get(Constants.BASE_API+`/house/host/${localStorage.getItem('currentUserId')}`, config)
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
    function search(){
        const search = document.getElementById('search').value.trim().toLowerCase();
        const searchFilter = searchHouse.filter((house)=> {
            if (
                (!search || house.address.toLowerCase().includes(search)
                    || house.name.toLowerCase().includes(search)
                    || house.price.toString().includes(search)
                    || house.numberOfRented.toString().includes(search)
                )
            ) {
                return true;
            }
            return false;
        });
        setHouseList(searchFilter);
    }

    return (<>
        <MaintenanceDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} maintain
                           maintainedHouseId={maintainedHouseId}/>
        <div className="d-flex justify-content-between my-3">
            <h2>House List</h2>
            <button className="btn btn-light d-flex align-items-center"
                    onClick={() => navigate('/owner/add-house-form')}>
                <i className="material-icons">&#xf8eb;</i>
                <span>Create new</span></button>
        </div>
        <input onChange={search} id="search" name="search" type="text" placeholder="Enter keyword" required  />
        <section className="main">
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover border border-secondary-subtle">
                <thead>
                <tr>
                    <th style={{width: '60px'}}>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Address</th>
                    <th>Rented</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {houseList
                    .slice(pagesVisited, pagesVisited + housesPerPage)
                    .map((item, index) => {
                        return (<tr key={item.id} style={{height: '80px'}}>
                            <td className="pt-4">{index + 1 + pagesVisited}</td>
                            {item.images.length > 0 ?
                                <td style={{width: '80px'}}><img className={'w-100'} src={item.images[0].fileUrl} alt={item.name}/>
                                </td> : <td></td>}
                            <td className="pt-4">{item.name}</td>
                            <td className="pt-4">{item.price}</td>
                            <td className="pt-4">{item.address}</td>
                            <td className="pt-4">{item.numberOfRented}</td>
                            {item.blocked === false ?
                                (<td className="pt-4"><span style={{
                                    display: 'inline-block',
                                    backgroundColor: '#198754',
                                    height: '8px',
                                    width: '8px',
                                    borderRadius: '50%',
                                    marginBottom: '2px',
                                    marginRight: '5px'
                                }}></span>Active</td>)
                                : (<td className="pt-4"><span style={{
                                    display: 'inline-block',
                                    backgroundColor: '#dc3545',
                                    height: '8px',
                                    width: '8px',
                                    borderRadius: '50%',
                                    marginBottom: '2px',
                                    marginRight: '5px'
                                }}></span>Blocked</td>)}
                            <td className="col-2 pt-4">
                                <button style={{backgroundColor: 'transparent'}}
                                        onClick={() => navigate(`/owner/edit-house-form/${item.id}`)}>
                                    <Tooltip title={'EDIT'}><i className="material-icons">&#xe3c9;</i></Tooltip></button>
                                <button style={{backgroundColor: 'transparent'}} className="ml-3 mr-3" onClick={() => {
                                    setMaintainedHouseId(item.id)
                                    setOpenDialog(true)
                                }}><Tooltip title={'MAINTENANCE'}><i className="material-icons">&#xea3c;</i></Tooltip></button>
                                {item.blocked === false ?
                                    (<button style={{backgroundColor: 'transparent'}}
                                             onClick={() => blockHouse(item.id)}>
                                        <Tooltip title={'BLOCK'}><i className="material-icons">&#xe897;</i></Tooltip></button>)
                                    : (<button style={{backgroundColor: 'transparent'}}
                                               onClick={() => unBlockHouse(item.id)}>
                                        <Tooltip title={'UN_BLOCK'}><i className="material-icons">&#xe898;</i></Tooltip></button>)}

                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
            </div>
            <select onChange={(event)=>{
                setHousesPerPage(event.target.value);
            }} name="page" style={{width:'80px'}}>
                <option value="">Page</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <PaginationComponent data={houseList} numberPerpage={housesPerPage} changeCurentPage={handlePageChange}/>
        </section>
    </>);
}

export default OwnerHouseList;