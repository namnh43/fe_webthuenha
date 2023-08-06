import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./BookingList.css";
import DateRangePickerComponent from "../../datetime/DateRangePickerComponent";
import ReviewForm from "../../ReviewForm";
import '../../scroll/scroll.css';
import {formatDate} from "../../../utils/api";
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';

import DataTable from 'react-data-table-component';


function BookingHistory() {
    const [bookingList, setBookingList] = useState([]);
    const [selectedRange, setSelectedRange] = useState(['','']);
    const [searchBooking, setSearchBooking] = useState([]);
    const [reviewBookingId, setReviewBookingId] = useState(null);


    const handleCloseReviewForm = () => {
        setReviewBookingId(null);
    };


    const columns = [
        {
            name: 'id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: '',
            selector: row => row.house.images[0].fileUrl,
            cell:(row) => <img src={row.house.images[0].fileUrl} style={{width:"80px",height:"80px", borderRadius:"50%"}}/>,
        },
        {
            name: 'Start Date',
            selector: row => row.startDate,
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row => row.endDate,
            sortable: true,
        },
        {
            name: 'House Name',
            selector: row => row.house.name,
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.house.address,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.bookingStatus,
            cell:(row) => <button id={row.ID}>{row.bookingStatus}</button>,
        },
        {
            name: '',
            cell:(row) => (
                (row.bookingStatus === "CHECKED_OUT" && row.review === null) ? (
                <td  style={{verticalAlign:'middle'}}>
                    <button className="btn btn-success" onClick={() => setReviewBookingId(row.id)}>
                        Review
                    </button>
                </td>
            ) : isCancellable(row.startDate) && row.bookingStatus === "BOOKING" ? (
                <td style={{verticalAlign:'middle'}}>
                    <button type="button" className="btn btn-danger" onClick={() => handleCancel(row.id)}>Cancel</button>
                </td>
            ) : (
                <td style={{verticalAlign:'middle'}}>
                    <button type="button" className="btn btn-primary">Detail</button>
                </td>
            )),
        },
    ];

    const handleButtonClick = (e, id) => {
        e.preventDefault();
        console.log("Row Id", id);
    };

    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length === 2)
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'),ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(['',''])
    };


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


    useEffect(() => {
        console.log('line 68');
        refreshBookingList();
    }, []);
    useEffect(() => {
        console.log('line 72');
        search()
    }, [selectedRange]);

    const refreshBookingList = () => {
        console.log('line 77');
        axios.get(`http://localhost:8080/user/list-booking`, config)
            .then((res) => {
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
       let status = document.getElementById("status-select").value;
            console.log('105');
            const searchFilter = searchBooking.filter((booking) => {
                return (!status || booking.bookingStatus === status) &&
                    (selectedRange[0] === "" ||
                        ((selectedRange[1] >= booking.startDate && booking.startDate >= selectedRange[0]) ||
                            (selectedRange[0] <= booking.endDate && booking.endDate <= selectedRange[1])) || (selectedRange[0] > booking.startDate && selectedRange[1] < booking.endDate)
                    );

            });
            setBookingList(searchFilter);


    }
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(bookingList.length);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentData = bookingList.slice(startIndex, endIndex);

    useEffect(() => {
        setTotalRows(bookingList.length);
    }, [bookingList]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePerRowsChange = (perPage) => {
        setPerPage(perPage);
        setCurrentPage(1);
    };
    const customStyles = {
        tableWrapper: {
            maxHeight: '400px', // Chiều cao tối đa của DataTable
            overflowY: 'scroll', // Hiển thị thanh cuộn khi vượt quá chiều cao
        },
    };

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
                        <div  style={customStyles.tableWrapper}>
                        <DataTable
                            columns={columns}
                            data={currentData}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            paginationDefaultPage={currentPage}
                            paginationPerPage={perPage}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}
                        />
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default BookingHistory;
