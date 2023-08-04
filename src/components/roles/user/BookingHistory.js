import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./BookingList.css";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import DateRangePickerComponent from "../../datetime/DateRangePickerComponent";
import ReviewForm from "../../ReviewForm";

function BookingHistory() {
    const [bookingList, setBookingList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const housesPerPage = 5;
    // const pagesVisited = pageNumber * housesPerPage;
    const pageCount = Math.ceil(bookingList.length / housesPerPage);
    const [selectedRange, setSelectedRange] = useState(['', '']);
    const [searchBooking, setSearchBooking] = useState([]);
    const [reviewBookingId, setReviewBookingId] = useState(null);


    const handleCloseReviewForm = () => {
        setReviewBookingId(null);
    };

    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length === 2)
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'), ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(['', ''])
    };
    //pagination
    const [pagesVisited, setPagesVisited] = useState(0);
    const bookingPerpage = 5;
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
                .put(url, {}, config)
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
        refreshBookingList();
    }, []);
    useEffect(() => {
        search()
    }, [selectedRange]);

    const refreshBookingList = () => {
        axios.get(`http://localhost:8080/user/list-booking`, config)
            .then((res) => {
                console.log(res.data)
                setSearchBooking(res.data);
                setBookingList(res.data);
            });
    }

    const isCancellable = (startDate) => {
        const startDateObj = new Date(startDate);
        const today = new Date();
        const timeDifference = startDateObj.getTime() - today.getTime();
        return timeDifference > 86400000;
    };


    function search() {
        const houseName = document.getElementById('house-name-input').value.trim().toLowerCase();
        const address = document.getElementById('address-input').value.trim().toLowerCase();
        const status = document.getElementById('status-select').value;

        const searchFilter = searchBooking.filter((booking) => {
            if (
                (!houseName || booking.house?.name?.toLowerCase().includes(houseName)) &&
                (!address || booking.house?.address?.toLowerCase().includes(address)) &&
                (!status || booking.bookingStatus === status) &&
                (selectedRange[0] === "" ||
                    ((selectedRange[1] >= booking.startDate && booking.startDate >= selectedRange[0]) ||
                        (selectedRange[0] <= booking.endDate && booking.endDate <= selectedRange[1])) || (selectedRange[0] > booking.startDate && selectedRange[1] < booking.endDate)
                )
            ) {
                return true;
            }
            return false;
        });

        setBookingList(searchFilter);
    }

    return (
        <>
            {reviewBookingId !== null ? (
                <ReviewForm
                    bookingId={reviewBookingId}
                    onClose={handleCloseReviewForm}
                    refreshBookingList={refreshBookingList}
                />
            ) : (
                <>
                    <div onChange={search} className={'row g-3 my-0'}>
                        <div className={'col-3'}>
                            <input className={'form-control'} id="house-name-input" name="house-name" type="text" placeholder="Enter house name"
                                   required/>
                        </div>
                        <div className={'col-3'}>
                            <input className={'form-control'} id="address-input" name="address" type="text" placeholder="Enter address" required/>
                        </div>
                        <div className={'col-2'}>
                            <DateRangePickerComponent id="date-range-picker" onChange={handleDateRangeChange}/>
                        </div>
                        <div className={'col-2'}>
                            <select className={'form-control'} id="status-select" name="status">
                                <option value="">-- Select status --</option>
                                <option value="CANCELLED">CANCELLED</option>
                                <option value="BOOKING">BOOKING</option>
                                <option value="CHECKED_IN">CHECKED_IN</option>
                                <option value="CHECKED_OUT">CHECKED_OUT</option>
                            </select>
                        </div>

                    </div>
                    <h2 className={'my-3'}>Booking List</h2>
                    <section className="main">
                        <table className="table table-bordered table-striped table-hover">
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
                            {bookingList.reverse()
                                .slice(pagesVisited, pagesVisited + bookingPerpage)
                                .map((item, key) => {
                                    return (
                                        <tr key={key} style={{height: '80px'}}>
                                            <td className={'pt-4'}>{key + 1 + pagesVisited}</td>
                                            <td className={'pt-4'}>{formatDate(item.startDate)}</td>
                                            <td className={'pt-4'}>{formatDate(item.endDate)}</td>
                                            <td className={'pt-4'}>{item.house.name}</td>
                                            <td className={'pt-4'}>{item.total}</td>
                                            <td className={'pt-4'}>{item.house.address}</td>
                                            <td className={'pt-4'}>{item.bookingStatus}</td>
                                            {(item.bookingStatus === "CHECKED_OUT" && item.review === null) ? (
                                                <td className={'pt-4'}>
                                                    <button className="btn btn-success"
                                                            onClick={() => setReviewBookingId(item.id)}>
                                                        Review
                                                    </button>
                                                </td>
                                            ) : isCancellable(item.startDate) && item.bookingStatus === "BOOKING" ? (
                                                <td className={'pt-4'}>
                                                    <button type="button" className="btn btn-danger"
                                                            onClick={() => handleCancel(item.id)}>Cancel
                                                    </button>
                                                </td>
                                            ) : (
                                                <td className={'pt-4'}>
                                                    <button type="button" className="btn btn-primary">Detail</button>
                                                </td>
                                            )}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <PaginationComponent data={bookingList} changeCurentPage={handlePageChange}
                                             numberPerpage={bookingPerpage}/>
                    </section>
                </>
            )}
        </>
    );
}

export default BookingHistory;
