import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./OwnerHouseList.css"
import {PaginationComponent} from "../../pagination/PaginationComponent";
import Swal from "sweetalert2";
import DateRangePickerComponent from "../../datetime/DateRangePickerComponent";
import {formatDate} from "../../../utils/api";



function OwnerBookingList() {

    const [bookingList, setBookingList] = useState([])
    const [searchBooking, setSearchBooking] = useState([])
    const [selectedRange, setSelectedRange] = useState(['','']);



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
    }

    useEffect(() => {
        axios.get('http://localhost:8080/booking/owner', config)
            .then((res) =>
                setBookingList(res.data.filter(item => item.bookingStatus !== "MAINTENANCE"),
                setSearchBooking(res.data)))
    }, []);

    const checkIn = (item) =>
        Swal.fire({
            title: 'Check in this booking!',
            text: "You won't be able to revert this!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                const formattedDate = () => {

                    let TODAY = new Date()
                    let cd = num => num.toString().padStart(2, 0)
                    return TODAY.getFullYear() + "-" + cd(TODAY.getMonth() + 1) + "-" + cd(TODAY.getDate())
                }
                if (formattedDate() >= item.startDate) {
                    axios.put(`http://localhost:8080/booking/check-in/${item.id}`, null, config)
                        .then(() => axios.get('http://localhost:8080/booking/owner', config)
                            .then((res) => setBookingList(res.data.filter(item => item.bookingStatus !== "MAINTENANCE"))))
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Checked in!',
                            });
                        })
                        .catch(() => {
                            Swal.fire(
                                'Something went wrong!',
                                'You cannot check in this booking.',
                                'warning'
                            );
                        })
                }else {
                    Swal.fire(
                        'Forbidden!',
                        'You must wait until start date on the booking to check in.',
                        'error'
                    );
                }
            }
        })

    const checkOut = (item) => Swal.fire({
        title: 'Check out this booking!',
        text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {

                axios.put(`http://localhost:8080/booking/check-out/${item.id}`, null, config)
                    .then(() => axios.get('http://localhost:8080/booking/owner', config)
                        .then((res) => setBookingList(res.data.filter(item => item.bookingStatus !== "MAINTENANCE"))))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Checked out!',
                        });
                    })
                    .catch(() => {
                        Swal.fire(
                            'Something went wrong!',
                            'You cannot check out this booking.',
                            'warning'
                        );
                    })

        }
    })
    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length === 2)
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'),ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(['',''])
    };
    useEffect(() => {
        search()
    }, [selectedRange]);
    function search() {
        const houseName = document.getElementById('house-name-input').value.trim().toLowerCase();
        const status = document.getElementById('status-select').value;

        const searchFilter = searchBooking.filter((booking) => {
            if (
                (!houseName || booking.house?.name?.toLowerCase().includes(houseName)) &&
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

    return (<>
        <div onChange={search} style={{ display: 'flex', flexWrap: 'wrap' }}>
            <input id="house-name-input" name="house-name" type="text" placeholder="Enter house name" required  />
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
                            <td>{formatDate(item.createAt)}</td>
                            <td>{formatDate(item.startDate)} to {formatDate(item.endDate)}</td>
                            <td>{item.price}/{item.total}</td>
                            <td>{item.bookingStatus}</td>
                            {item.bookingStatus === "BOOKING" && (
                                <td>
                                    <button className="btn btn-primary" onClick={() => checkIn(item)}>Check in</button>
                                </td>
                            )}
                            {item.bookingStatus === "CHECKED_IN" && (
                                <td>
                                    <button className="btn btn-secondary" onClick={() => checkOut(item)}>Check out</button>
                                </td>
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