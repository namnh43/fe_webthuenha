import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

function OwnerMaintenanceList() {
    const [bookingList, setBookingList] = useState([])
    const [pageNumber, setPageNumber] = useState(0);

    const housesPerPage = 5;
    const pagesVisited = pageNumber * housesPerPage;

    const pageCount = Math.ceil(bookingList.length / housesPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
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
            <h1>Maintenance List</h1>
            <section className="main">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>House</th>
                        <th>Booking date</th>
                        <th>Duration</th>
                        <th>Unit/Total Price</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingList
                        .slice(pagesVisited, pagesVisited + housesPerPage)
                        .map((item, key) => {
                            return (<tr>
                                <td>{key + 1 + pagesVisited}</td>
                                <td>{item.house.name}</td>
                                <td>{item.createAt}</td>
                                <td>{item.startDate}/{item.endDate}</td>
                                <td>{item.price}/{item.total}</td>
                                <td>{item.bookingStatus}</td>
                                <td>
                                    <button className="btn btn-danger"
                                            onClick={() => cancelMaintenance(item.id)}>Cancel
                                    </button>
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
        </>
    );
}

export default OwnerMaintenanceList;