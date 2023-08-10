import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import Swal from "sweetalert2";
import DateRangePickerComponent from "../../datetime/DateRangePickerComponent";
import {formatDate} from "../../../utils/api";
import Constants from "../../../utils/constants";

import '../../scroll/scroll.css';


function OwnerBookingList() {

    const [bookingList, setBookingList] = useState([])
    const [searchBooking, setSearchBooking] = useState([])
    const [selectedRange, setSelectedRange] = useState(['', '']);


    //pagination
    const [pagesVisited, setPagesVisited] = useState(0);
    const [bookingPerpage, setBookingPerpage] = useState(5);
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(Constants.BASE_API + '/booking/owner', config)
            .then((res) => {
                setBookingList(res.data.filter(item => item.bookingStatus !== "MAINTENANCE"))
                setSearchBooking(res.data.filter(item => item.bookingStatus !== "MAINTENANCE"))
            })
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
                    axios.put(`${Constants.BASE_API}/booking/check-in/${item.id}`, null, config)
                        .then(() => axios.get(`${Constants.BASE_API}/booking/owner`, config)
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
                } else {
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

            axios.put(`${Constants.BASE_API}/booking/check-out/${item.id}`, null, config)
                .then(() => axios.get(`${Constants.BASE_API}/booking/owner`, config)
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
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'), ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(['', ''])
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

    return (<>

        <h2 className={'my-3'}>Booking List</h2>

        <div className={'row my-0'} onChange={search}>
            <div className="col-4 form-group">
                <input className={'form-control'} id="house-name-input" name="house-name" type="text"
                       placeholder="Enter house name" style={{height: '41.6px'}}/>
            </div>
            <div className="col-2 form-group">
                <select className={'form-control'} style={{height: '41.6px'}} id="status-select" name="status">
                    <option value="">-- Select status --</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="BOOKING">BOOKING</option>
                    <option value="CHECKED_IN">CHECKED_IN</option>
                    <option value="CHECKED_OUT">CHECKED_OUT</option>
                </select>
            </div>
            <div className="col-4">
                <DateRangePickerComponent id="date-range-picker" onChange={handleDateRangeChange}/>
            </div>
            <div className={'form-group col-2 d-flex'}>
                <label htmlFor="" className={'d-inline-block mb-0 mr-2 pt-2'}>Entries/page</label>
                <select onChange={(event) => {
                    setBookingPerpage(event.target.value);
                }} name="page" className={'form-control d-inline-block'} style={{height: '41.6px'}}>
                    {/*<option value="5">---</option>*/}
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>

        <section className="main">
            <div className="table-container mb-3">
                <table className="table table-bordered table-hover"
                       style={{verticalAlign: 'middle', textAlign: 'center'}}>
                    <thead>
                    <tr className={'table-head'}>
                        <th style={{
                            width: '20px',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            padding: '10px'
                        }}>#
                        </th>
                        <th style={{
                            width: '80px',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            padding: '0px',
                            fontWeight: 'bold'
                        }}>House
                        </th>
                        <th style={{
                            width: '40px',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            padding: '0px',
                            fontWeight: 'bold'
                        }}>Booking date
                        </th>
                        <th style={{
                            width: '40px',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            padding: '0px',
                            fontWeight: 'bold'
                        }}>Duration
                        </th>
                        <th style={{
                            width: '40px',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            padding: '0px',
                            fontWeight: 'bold'
                        }}>Unit/Total Price
                        </th>
                        <th style={{
                            width: '40px',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            padding: '0px',
                            fontWeight: 'bold'
                        }}>Status
                        </th>
                        <th style={{
                            width: '40px',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            padding: '0px',
                            fontWeight: 'bold'
                        }}>Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingList
                        .slice(pagesVisited, pagesVisited + bookingPerpage)
                        .map((item, key) => {
                            return (<tr>
                                <td style={{
                                    verticalAlign: 'middle',
                                    textAlign: 'center',
                                    padding: '0px'
                                }}>{key + 1 + pagesVisited}</td>
                                <td className={'text-left'} style={{
                                    width: "150px",
                                    verticalAlign: 'middle',
                                    borderLeft: "none"
                                }}>{item.house.name}</td>
                                <td style={{verticalAlign: 'middle', padding: '0px'}}>{formatDate(item.createAt)}</td>
                                <td style={{
                                    verticalAlign: 'middle',
                                    padding: '6px',
                                }}>{formatDate(item.startDate)} to {formatDate(item.endDate)}</td>
                                <td style={{verticalAlign: 'middle', padding: '0px'}}>{item.price} / {item.total}</td>
                                <td style={{verticalAlign: 'middle', padding: '0px'}}>{item.bookingStatus}</td>
                                {item.bookingStatus === "BOOKING" && (
                                    <td style={{verticalAlign: 'middle', padding: '0px'}}>
                                        <button className="btn btn-primary" onClick={() => checkIn(item)}>Check in
                                        </button>
                                    </td>
                                )}
                                {item.bookingStatus === "CHECKED_IN" && (
                                    <td style={{verticalAlign: 'middle', padding: '0px'}}>
                                        <button className="btn btn-secondary" onClick={() => checkOut(item)}>Check out
                                        </button>
                                    </td>
                                )}
                                {item.bookingStatus === "CANCELLED" && (
                                    <td style={{verticalAlign: 'middle', padding: '0px'}}></td>
                                )}
                                {item.bookingStatus === "CHECKED_OUT" && (
                                    <td style={{verticalAlign: 'middle', padding: '0px'}}></td>
                                )}
                            </tr>)
                        })}

                    </tbody>
                </table>
            </div>
            <PaginationComponent data={bookingList} changeCurentPage={handlePageChange} numberPerpage={bookingPerpage}/>

        </section>
    </>);
}

export default OwnerBookingList;