import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./OwnerHouseList.css"
import {PaginationComponent} from "../../pagination/PaginationComponent";

function OwnerBookingList() {

    const [bookingList, setBookingList] = useState([])

    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const bookingPerpage = 5;
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/booking/owner', config)
            .then((res) => setBookingList(res.data.filter(item => item.bookingStatus !== "MAINTENANCE")))
    }, []);

    return (<>
        <h2>Booking List</h2>
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {bookingList
                    .slice(pagesVisited, pagesVisited + bookingPerpage)
                    .map((item, key) => {
                        return (<tr>
                            <td>{key + 1 + pagesVisited}</td>
                            <td>{item.house.name}</td>
                            <td>{item.createAt}</td>
                            <td>{item.startDate}/{item.endDate}</td>
                            <td>{item.price}/{item.total}</td>
                            <td>{item.bookingStatus}</td>
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
            <PaginationComponent data={bookingList} changeCurentPage={handlePageChange} numberPerpage={bookingPerpage}/>

        </section>
    </>);
}

export default OwnerBookingList;