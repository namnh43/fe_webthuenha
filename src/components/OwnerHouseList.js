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

    const [pageNumber, setPageNumber] = useState(0);

    const housesPerPage = 5;
    const pagesVisited = pageNumber * housesPerPage;

    const pageCount = Math.ceil(houseList.length / housesPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/house/host/${localStorage.getItem('currentUserId')}`, config)
            .then((res) => setHouseList(res.data))
    }, []);

    const deleteHouse = (itemId) => {
        axios.delete(`http://localhost:8080/house/delete/${itemId}`, config)
            .then(() => axios.get('http://localhost:8080/house', config)
                .then(res => setHouseList(res.data)))
    }

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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {houseList
                    .slice(pagesVisited, pagesVisited + housesPerPage)
                    .map((item, key) => {
                        return (<tr>
                            <td>{item.id}</td>
                            <td><img src={item.images[0].fileUrl} style={{height:'4rem', width:'7rem' }} alt=""/></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.address}</td>
                            <td>add later</td>
                            <td>{item.houseStatus}</td>
                            <td className="col-2">
                                <i className="material-icons">&#xe88e;</i>
                                <i className="material-icons"
                                   onClick={() => navigate(`/owner/edit-house-form/${item.id}`)}>&#xe3c9;</i>
                                <i className="material-icons" onClick={() => {
                                    setMaintainedHouseId(item.id)
                                    setOpenDialog(true)
                                }
                                }>&#xea3c;</i>
                                <i className="material-icons" onClick={() => deleteHouse(item.id)}>&#xe872;</i>
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />

        </section>
    </>);
}

export default OwnerHouseList;