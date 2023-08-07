import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./BookingList.css";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import DateRangePickerComponent from "../../datetime/DateRangePickerComponent";
import ReviewForm from "../../ReviewForm";
import '../../scroll/scroll.css';
import {formatDate} from "../../../utils/api";
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
import {useLocation} from "react-router";


function BookingHistory() {
    const [bookingList, setBookingList] = useState([]);
    const [selectedRange, setSelectedRange] = useState(['','']);
    const [searchBooking, setSearchBooking] = useState([]);
    const [reviewBookingId, setReviewBookingId] = useState(null);
    const  idBooking  = useLocation().state || 0;

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
    const [bookingPerpage,setBookingPerpage] = useState(5);
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
    const [ascending,setAscending] = useState(true);


    useEffect(() => {
        refreshBookingList();

    }, []);


    const refreshBookingList = () => {
        axios.get(`http://localhost:8080/user/list-booking`, config)
            .then((res) => {
                console.log(res.data)
                setSearchBooking(res.data);
                if (idBooking !== 0){
                    let booking = res.data.filter((booking) => booking.id === idBooking);
                    booking = [booking[0], ...res.data.filter((b) => b.id !== idBooking)];
                    setBookingList(booking);
                    return;
                }else {
                    setBookingList(res.data);
                }

            })
    }

    const isCancellable = (startDate) => {
        const startDateObj = new Date(startDate);
        const today = new Date();
        const timeDifference = startDateObj.getTime() - today.getTime();
        return timeDifference > 86400000;
    };



    function search() {
        const search = document.getElementById('search').value.trim().toLowerCase();
        const status = document.getElementById('status-select').value;

        const searchFilter = searchBooking.filter((booking) => {
            if (
                (!search || booking.house?.name?.toLowerCase().includes(search)
                    || booking.house?.address?.toLowerCase().includes(search)
                    || formatDate(booking.startDate).includes(search)
                    || formatDate(booking.endDate).includes(search)
                    || booking.bookingStatus.toLowerCase().includes(search)
                    || booking.total.toString().includes(search)) &&
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
    function toggleAscending() {
        setAscending(prevAscending => !prevAscending);
    }
    function houseClick(){
     toggleAscending()
        const sortedBooking = searchBooking.sort((a, b) => {
            if (a.house?.name < b.house?.name) {
                return ascending ? -1 : 1;
            } else if (a.house.name > b.house.name) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
         setBookingList(sortedBooking);
    }
    function addressClick(){
        toggleAscending()
        const sortedBooking = searchBooking.sort((a, b) => {
            if (a.house?.address < b.house?.address) {
                return ascending ? -1 : 1;
            } else if (a.house.address > b.house.address) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setBookingList(sortedBooking);
    }
    function idClick(){
        toggleAscending()
        const sortedBooking = searchBooking.sort((a, b) => {
            if (a.house?.id < b.house?.id) {
                return ascending ? -1 : 1;
            } else if (a.house.id > b.house.id) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setBookingList(sortedBooking);
    }
    function totalClick(){
        toggleAscending()
        const sortedBooking = searchBooking.sort((a, b) => {
            if (a.total < b.total) {
                return ascending ? -1 : 1;
            } else if (a.total > b.total) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setBookingList(sortedBooking);
    }
    function sDateClick(){
        toggleAscending()
        const sortedBooking = searchBooking.sort((a, b) => {
            if (a.startDate < b.startDate) {
                return ascending ? -1 : 1;
            } else if (a.startDate > b.startDate) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setBookingList(sortedBooking);
    }
    function eDateClick(){
        toggleAscending()
        const sortedBooking = searchBooking.sort((a, b) => {
            if (a.endDate < b.endDate) {
                return ascending ? -1 : 1;
            } else if (a.endDate > b.endDate) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setBookingList(sortedBooking);
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
                    <h2>Booking List</h2>
                    <div onChange={search} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <input id="search" name="house-name" type="text" placeholder="Enter keyword" required  />
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
                    <section className="main">
                        <table  className="table table-striped table-hover ">
                            <thead>
                            <tr>
                                <th className="text-left" style={{verticalAlign:'middle',width:"70px"}}><button onClick={idClick}>#</button></th>
                                <th className="text-left"></th>
                                <th className="text-left"><button onClick={sDateClick}>Start Date</button></th>
                                <th className="text-left"><button onClick={eDateClick}>End Date</button></th>
                                <th className="text-left"><button onClick={houseClick}>Name</button></th>
                                <th className="text-left"><button onClick={totalClick}>Total</button></th>
                                <th className="text-left"><button onClick={addressClick}>Address</button></th>
                                <th className="text-left"><button>Status</button></th>
                                <th className="text-left"><button>Action</button></th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookingList
                                .slice(pagesVisited, pagesVisited + bookingPerpage)
                                .map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="text-left" style={{verticalAlign:'middle',width:"70px"}}>{key + 1+ pagesVisited}</td>
                                            <td className="text-left"><img src={item.house.images.length > 0 ? item.house.images[0].fileUrl : 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-807647632904963046/original/6d41a0ce-a5a4-4d1f-bbca-5a3242f7834e.jpeg?im_w=1200'} style={{width:"80px",height:"80px", borderRadius:"50%"}}/></td>                                            <td className="text-left" style={{verticalAlign:'middle'}}>{formatDate(item.startDate)}</td>
                                            <td className="text-left" style={{verticalAlign:'middle'}}>{formatDate(item.endDate)}</td>
                                            <td className="text-left" style={{verticalAlign:'middle',width:'150px'}}>{item.house.name}</td>
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
                        <select onChange={(event)=>{
                            setBookingPerpage(event.target.value);
                        }} name="page" style={{width:'80px'}}>
                            <option value="">Page</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                        <PaginationComponent data={bookingList} changeCurentPage={handlePageChange} numberPerpage={bookingPerpage}/>
                    </section>
                </>
            )}
        </>
    );
}
export default BookingHistory;