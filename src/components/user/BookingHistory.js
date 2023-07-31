import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./BookingList.css";
import {PaginationComponent} from "../pagination/PaginationComponent";

function BookingHistory() {
    const [bookingList, setBookingList] = useState([]);
    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const bookingPerpage = 2;
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };
    const handleCancel = (bookingId) => {
        const confirmCancel = window.confirm('Bạn có chắc chắn muốn hủy đặt phòng?');
        let url = `http://localhost:8080/booking/cancel/${bookingId}`;
        console.log(url);
        if (confirmCancel) {
            axios
                .put(url,{}, config)
                .then((res) => {
                    console.log('Hủy đặt phòng thành công!');
                    axios.get(`http://localhost:8080/user/list-booking`, config)
                        .then((res) => {
                            console.log(res.data);
                            setBookingList(res.data);
                        });
                })
                .catch((error) => {
                    console.error('Đã xảy ra lỗi khi hủy đặt phòng:', error);
                });
        }
    };

    function formatDate(dateString) {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/user/list-booking`, config)
            .then((res) => {
                console.log(res.data);
                setBookingList(res.data);
            });
    }, []);

    const isCancellable = (startDate) => {
        const startDateObj = new Date(startDate);
        const today = new Date();
        const timeDifference = startDateObj.getTime() - today.getTime();
        return timeDifference > 86400000;
    };

    return (
        <>
            <h1>Booking List</h1>
            <section className="main">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>House Name</th>
                        <th>Total</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingList
                        .slice(pagesVisited, pagesVisited + bookingPerpage)
                        .map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{formatDate(item.startDate)}</td>
                                    <td>{formatDate(item.endDate)}</td>
                                    <td>{item.house.name}</td>
                                    <td>{item.total}</td>
                                    <td>{item.house.address}</td>
                                    <td>{item.bookingStatus}</td>
                                    {isCancellable(item.startDate) && item.bookingStatus === "BOOKING" ? (
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => handleCancel(item.id)}>Cancel</button>
                                        </td>
                                    ) : (
                                        <td><button type="button" className="btn btn-primary">Detail</button></td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <PaginationComponent data={bookingList} changeCurentPage={handlePageChange} numberPerpage={bookingPerpage}/>
            </section>
        </>
    );
}

export default BookingHistory;
