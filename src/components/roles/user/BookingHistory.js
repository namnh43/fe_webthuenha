import React, { useEffect, useState } from 'react';
import axios from "axios";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import DateRangePickerComponent from "../../datetime/DateRangePickerComponent";
import ReviewForm from "../../ReviewForm";
import '../../scroll/scroll.css';
import {formatDate} from "../../../utils/api";
import {backdropClasses} from "@mui/material";

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
    useEffect(() => {
        search()
    }, [selectedRange,ascending]);

    const refreshBookingList = () => {
        axios.get(`http://localhost:8080/user/list-booking`, config)
            .then((res) => {
                console.log(res.data)
                setSearchBooking(res.data);
                setBookingList(res.data);
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
                    <h2 className={'my-3'}>Booking List</h2>
                    <div className={'mt-2 mb-4'} onChange={search} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <input style={{border: '1px solid #bdbdbd', borderRadius: '5px', paddingLeft: '8px'}} id="search" name="house-name" type="text" placeholder="Search keyword" required  />
                        &nbsp;
                        <select style={{border: '1px solid #bdbdbd', borderRadius: '5px'}} className={'custome-input'} id="status-select" name="status">
                            <option value="">-- Select status --</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="BOOKING">BOOKING</option>
                            <option value="CHECKED_IN">CHECKED_IN</option>
                            <option value="CHECKED_OUT">CHECKED_OUT</option>
                        </select>
                        &nbsp;
                        <div>
                            <DateRangePickerComponent id="date-range-picker" onChange={handleDateRangeChange} />
                        </div>
                        <div style={{marginLeft:'auto'}}>
                            Entries/page &nbsp;
                            <select onChange={(event)=>{
                                setBookingPerpage(event.target.value);
                            }} name="page" style={{border: '1px solid #bdbdbd', borderRadius: '5px', textAlign:'center', height:'40px', width:'60px'}}>
                                <option value="5">---</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>

                    </div>
                    <section className="main">
                        <div className={'table-container mb-3'}>
                            <table  className="table table-bordered table-hover"  style={{verticalAlign:'middle', textAlign:'center'}}>
                                <thead>
                                <tr className={"table-head"}>
                                    <th style={{ width:'20px',verticalAlign:'middle', textAlign:'center',padding:'10px'}}><button   onClick={idClick}><b>#</b></button></th>
                                    <th colSpan="2" style={{verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button   onClick={houseClick}><b>House</b></button></th>
                                    <th style={{ width:'40px',verticalAlign:'middle', textAlign:'center', padding:'0px'}}><button   onClick={sDateClick}><b>Start Date</b></button></th>
                                    <th style={{ width:'40px',verticalAlign:'middle', textAlign:'center', padding:'0px'}}><button   onClick={eDateClick}><b>End Date</b></button></th>
                                    <th style={{ width:'30px',verticalAlign:'middle', textAlign:'center',padding:'3px'}}><button   onClick={totalClick}><b>Total</b></button></th>
                                    <th style={{ width:'160px',verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button   onClick={addressClick}><b>Address</b></button></th>
                                    <th style={{ width:'40px',verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button  ><b>Status</b></button></th>
                                    <th style={{ width:'75px',verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button  ><b>Action</b></button></th>
                                </tr>
                                </thead>
                                <tbody>
                                {bookingList
                                    .slice(pagesVisited, pagesVisited + bookingPerpage)
                                    .map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td style={{verticalAlign:'middle', textAlign:'center', padding:'0px'}}>{key + 1+ pagesVisited}</td>
                                                <td style={{verticalAlign:'middle',width:"50px", padding:'5px 0px', borderRight:"none"}}><img src={item.house.images[0].fileUrl} style={{width:"60px",height:"60px", borderRadius:"50%"}}/></td>
                                                <td className={'text-left'} style={{width:"150px", verticalAlign:'middle', padding:'0px', borderLeft:"none"}}>{item.house.name}</td>
                                                <td style={{verticalAlign:'middle', textAlign:'center', padding:'0px'}}>{formatDate(item.startDate)}</td>
                                                <td style={{verticalAlign:'middle', textAlign:'center', padding:'0px'}}>{formatDate(item.endDate)}</td>
                                                <td style={{verticalAlign:'middle', padding:'0px'}}>{item.total}$</td>
                                                <td style={{verticalAlign:'middle', padding:'6px', textAlign:'left'}}>{item.house.address}</td>
                                                <td style={{verticalAlign:'middle', padding:'0px'}}>{item.bookingStatus}</td>
                                                <td style={{verticalAlign:'middle', textAlign:'center', padding:'0px'}}>
                                                    {(item.bookingStatus === "CHECKED_OUT" && item.review === null) ? (
                                                        <button className="btn btn-success" onClick={() => setReviewBookingId(item.id)}>
                                                            Review
                                                        </button>
                                                    ) : isCancellable(item.startDate) && item.bookingStatus === "BOOKING" ? (
                                                        <button type="button" className="btn btn-danger" onClick={() => handleCancel(item.id)}>Cancel</button>
                                                    ) : (
                                                        <button type="button" className="btn btn-primary">Detail</button>
                                                    )}
                                                </td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                        <PaginationComponent data={bookingList} changeCurentPage={handlePageChange} numberPerpage={bookingPerpage}/>
                    </section>
                </>
            )}
        </>
    );
}
export default BookingHistory;