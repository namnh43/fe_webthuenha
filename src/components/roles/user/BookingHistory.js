import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./BookingList.css";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import DateRangePickerComponent from "../../datetime/DateRangePickerComponent";
import ReviewForm from "../../ReviewForm";
import '../../scroll/scroll.css';
import {formatDate} from "../../../utils/api";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';


function BookingHistory() {
    const [bookingList, setBookingList] = useState([]);
    const [selectedRange, setSelectedRange] = useState(['','']);
    const [searchBooking, setSearchBooking] = useState([]);
    const [reviewBookingId, setReviewBookingId] = useState(null);


    const handleCloseReviewForm = () => {
        setReviewBookingId(null);
    };

    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length === 2)
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'),ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(['',''])
    };
    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const bookingPerpage = 10;
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
            }).then((res)=>{
            $(document).ready(function() {
                if (!$.fn.DataTable.isDataTable('#dtBasicExample')) {
                    $('#dtBasicExample').DataTable({
                        paging: true,
                        lengthMenu: [3, 5, 10,15],
                    });
                    $('.dataTables_length').addClass('bs-select'); }
            });
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
                (selectedRange[0]==="" ||
                    ((selectedRange[1]>=booking.startDate && booking.startDate >= selectedRange[0] ) ||
                        (selectedRange[0]<=booking.endDate&& booking.endDate <=selectedRange[1])) || (selectedRange[0]>booking.startDate && selectedRange[1]<booking.endDate)
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
                    <div onChange={search} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <input id="house-name-input" name="house-name" type="text" placeholder="Enter house name" required  />
                        &nbsp;
                        <input id="address-input" name="address" type="text" placeholder="Enter address" required />
                        &nbsp;
                        <select id="status-select" name="status">
                            <option value="">-- Select status --</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="BOOKING">BOOKING</option>
                            <option value="CHECKED_IN">CHECKED_IN</option>
                            <option value="CHECKED_OUT">CHECKED_OUT</option>
                        </select>
                        &nbsp;
                        <div style={{border:"1px solid grey"}}>
                            <DateRangePickerComponent id="date-range-picker" onChange={handleDateRangeChange} />
                        </div>

                    </div>
                    <h2>Booking List</h2>
                    <section className="main">
                        <table id="dtBasicExample" className="table table-striped table-hover dataTables_length">
                            <thead>
                            <tr>
                                <th className="text-left" style={{verticalAlign:'middle',width:"70px"}}>#</th>
                                <th className="text-left"></th>
                                <th className="text-left">Start Date</th>
                                <th className="text-left">End Date</th>
                                <th className="text-left">House Name</th>
                                <th className="text-left">Total</th>
                                <th className="text-left">Address</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookingList
                                .slice(pagesVisited, pagesVisited + bookingPerpage)
                                .map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="text-left" style={{verticalAlign:'middle',width:"70px"}}>{key + 1+ pagesVisited}</td>
                                            <td className="text-left"><img src={item.house.images[0].fileUrl} style={{width:"80px",height:"80px", borderRadius:"50%"}}/></td>
                                            <td className="text-left" style={{verticalAlign:'middle'}}>{formatDate(item.startDate)}</td>
                                            <td className="text-left" style={{verticalAlign:'middle'}}>{formatDate(item.endDate)}</td>
                                            <td className="text-left" style={{verticalAlign:'middle'}}>{item.house.name}</td>
                                            <td className="text-left" style={{verticalAlign:'middle'}}>{item.total}</td>
                                            <td className="text-left" style={{verticalAlign:'middle'}}>{item.house.address}</td>
                                            <td className="text-left" style={{verticalAlign:'middle'}}>{item.bookingStatus}</td>
                                            {(item.bookingStatus === "CHECKED_OUT" && item.review === null) ? (
                                                <td  style={{verticalAlign:'middle'}}>
                                                    <button className="btn btn-success" onClick={() => setReviewBookingId(item.id)}>
                                                        Review
                                                    </button>
                                                </td>
                                            ) : isCancellable(item.startDate) && item.bookingStatus === "BOOKING" ? (
                                                <td style={{verticalAlign:'middle'}}>
                                                    <button type="button" className="btn btn-danger" onClick={() => handleCancel(item.id)}>Cancel</button>
                                                </td>
                                            ) : (
                                                <td style={{verticalAlign:'middle'}}>
                                                    <button type="button" className="btn btn-primary">Detail</button>
                                                </td>
                                            )}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {/*<PaginationComponent data={bookingList} changeCurentPage={handlePageChange} numberPerpage={bookingPerpage}/>*/}
                    </section>
                </>
            )}
        </>
    );
}
export default BookingHistory;

