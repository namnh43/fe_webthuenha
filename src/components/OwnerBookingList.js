import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";

function OwnerBookingList() {

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
            .then((res) => setBookingList(res.data))
    }, []);

    let cancelMaintenance = (bookingId) => {
        axios.delete(`http://localhost:8080/booking/maintenance-to-empty/${bookingId}`, config)
            .then(() => {
                axios.get('http://localhost:8080/booking/owner', config)
                    .then((res) => setBookingList(res.data))
            })
    }

    return (<>
        <h1>Booking List</h1>
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
                            <td>{item.id}</td>
                            <td>{item.house.name}</td>
                            <td>{item.createAt}</td>
                            <td>{item.startDate}/{item.endDate}</td>
                            <td>{item.price}/{item.total}</td>
                            <td>{item.bookingStatus}</td>
                            {item.bookingStatus === "MAINTENANCE" && (
                                <td><button className="btn btn-danger"
                                            onClick={() => cancelMaintenance(item.id)}>Cancel</button></td>
                            )}
                            {item.bookingStatus === "BOOKING" && (
                                    <td><button className="btn btn-primary">Check in</button></td>

                            )}
                            {item.bookingStatus === "CHECKED_IN" && (
                                <td><button>Check out</button></td>
                            )}
                            {item.bookingStatus === "CANCELLED" && (
                                <td></td>
                            )}
                            {item.bookingStatus === "CHECKED_OUT" && (
                                <td></td>
                            )}
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

export default OwnerBookingList;