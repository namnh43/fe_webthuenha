import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import {PaginationComponent} from "../../pagination/PaginationComponent";

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
        axios.get('http://localhost:8080/booking/owner', config)
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
                    axios.delete(`http://localhost:8080/booking/maintenance-to-empty/${bookingId}`, config)
                        .then(() => {
                            axios.get('http://localhost:8080/booking/owner', config)
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
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>House</th>
                        <th>Booking date</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingList
                        .slice(pagesVisited, pagesVisited + housesPerPage)
                        .map((item, key) => {
                            return (<tr style={{height: '80px'}}>
                                <td className="pt-4">{key + 1 + pagesVisited}</td>
                                <td className="pt-4">{item.house.name}</td>
                                <td className="pt-4">{item.createAt}</td>
                                <td className="pt-4">{item.startDate}/{item.endDate}</td>
                                <td className="pt-4">{item.bookingStatus}</td>
                                <td className="pt-4">
                                    <button className="btn btn-danger"
                                            onClick={() => cancelMaintenance(item.id)}>Cancel
                                    </button>
                                </td>
                            </tr>)
                        })}

                    </tbody>
                </table>
                <PaginationComponent data={bookingList} numberPerpage={housesPerPage} changeCurentPage={handlePageChange}/>

            </section>
        </>
    );
}

export default OwnerMaintenanceList;