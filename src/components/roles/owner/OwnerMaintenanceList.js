import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import Constants from "../../../utils/constants";
import '../../scroll/scroll.css';

function OwnerMaintenanceList() {
    const [bookingList, setBookingList] = useState([])
    const [pageNumber, setPageNumber] = useState(0);

    const housesPerPage = 5;
    const pagesVisited = pageNumber * housesPerPage;

    const handlePageChange = (values) => {
        setPageNumber(values);
    };

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(Constants.BASE_API+'/booking/owner', config)
            .then((res) => setBookingList(res.data.filter(item => item.bookingStatus === "MAINTENANCE")))
    }, []);

    let cancelMaintenance = (bookingId) =>
        Swal.fire({
            title: 'Cancel this maintenance!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(Constants.BASE_API+`/booking/maintenance-to-empty/${bookingId}`, config)
                        .then(() => {
                            axios.get(Constants.BASE_API+'/booking/owner', config)
                                .then((res) => setBookingList(res.data.filter(item => item.bookingStatus === "MAINTENANCE")))
                        })
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success'
                            });
                        })
                        .catch(() => {
                            Swal.fire(
                                'Something went wrong!',
                                'You cannot check in this booking.',
                                'info'
                            );
                        })
                }
            }
        )

    return (
        <>
            <h2 className="my-3">Maintenance List</h2>
            <section className="main">
                <div className="table-container mb-3">
                    <table className="table table-bordered table-hover"
                            style={{verticalAlign: 'middle', textAlign: 'center'}}>
                        <thead>
                        <tr className={'table-head'}>
                            <th style={{
                                width: '20px',
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                padding: '10px'
                            }}>#</th>
                            <th style={{
                                width: '80px',
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                padding: '0px',
                                fontWeight: 'bold'
                            }}>House</th>
                            <th style={{
                                width: '40px',
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                padding: '0px',
                                fontWeight: 'bold'
                            }}>Booking date</th>
                            <th style={{
                                width: '40px',
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                padding: '0px',
                                fontWeight: 'bold'
                            }}>Duration</th>
                            <th style={{
                                width: '40px',
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                padding: '0px',
                                fontWeight: 'bold'
                            }}>Status</th>
                            <th style={{
                                width: '40px',
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                padding: '0px',
                                fontWeight: 'bold'
                            }}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookingList
                            .slice(pageNumber, pageNumber + housesPerPage)
                            .map((item, key) => {
                                return (<tr style={{height: '80px'}}>
                                    <td style={{
                                        verticalAlign: 'middle',
                                        textAlign: 'center',
                                        padding: '0px'
                                    }}>{key + 1 + pageNumber}</td>
                                    <td className={'text-left'} style={{
                                        width: "150px",
                                        verticalAlign: 'middle',
                                        borderLeft: "none"
                                    }}>{item.house.name}</td>
                                    <td style={{verticalAlign: 'middle', padding: '0px'}}>{item.createAt}</td>
                                    <td style={{
                                        verticalAlign: 'middle',
                                        padding: '6px',
                                    }}>{item.startDate} to {item.endDate}</td>
                                    <td style={{verticalAlign: 'middle', padding: '0px'}}>{item.bookingStatus}</td>
                                    <td style={{verticalAlign: 'middle', padding: '0px'}}>
                                        <button className="btn btn-danger"
                                                onClick={() => cancelMaintenance(item.id)}>Cancel
                                        </button>
                                    </td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>
                <PaginationComponent data={bookingList} numberPerpage={housesPerPage}
                                     changeCurentPage={handlePageChange}/>

            </section>
        </>
    );
}

export default OwnerMaintenanceList;