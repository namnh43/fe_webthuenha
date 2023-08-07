import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import MapWithSearch from "../Map";
import OwlCarousel from "react-owl-carousel";
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Reviews from "./Reviews";
import TestDatePicker from "../datetime/test";
import Swal from "sweetalert2";
import StarIcon from "@mui/icons-material/Star";
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import {Link} from "react-router-dom";
import {Footer} from "../Footer";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import {capitalizeFirstLetter} from "../../utils/api";
import HouseDescription from "./HouseDescription";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import SockJS from "sockjs-client";
import Constants from "../../utils/constants";
import Stomp from "stompjs";

export function HouseDetail() {
    const [listImages, setListImages] = useState([]);
    const [house, setHouse] = useState({});
    const {id} = useParams()
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [day, setDay] = useState(0);
    const navigate = useNavigate();
    const [listBooking, setListBooking] = useState([]);

    let result = {
        startDate: "",
        endDate: "",
        price: house.price,
        total: house.price * day + house.price * day * 5 / 100,
        house: {
            id: id
        }
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log('get_house_id', id);
        axios.get(`http://localhost:8080/house/` + id).then(res => {
            console.log('get_data', res)
            setHouse(res.data)
            document.title = capitalizeFirstLetter(res.data.name);
            setListImages(res.data.images)
        })
        handleFetchBookingList();
    }, [])

    function booking() {
        if (localStorage.getItem("currentUser") == null) {
            localStorage.setItem("houseUrl",`/houses/${house.id}`);
            Swal.fire({
                title: 'You need to login first!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login")
                }
            })
            return;
        }
        if (startDate === "" || endDate === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select booking date',
            })
            return;
        }
        result = {
            startDate: startDate,
            endDate: endDate,
            price: house.price,
            total: house.price * day + house.price * day * 5 / 100,
            house: {
                id: house.id
            }
        };
        postResult();
    }

    function postResult() {
        try {
            console.log('post_result', result);
            Swal.fire({
                title: 'Booking house',
                text: "Are you sure you want to book this house ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3B71CA',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, book it!'
            }).then((confirm) => {
                if (confirm.isConfirmed) {
                    axios.post('http://localhost:8080/booking/create', result, config).then((res) => {
                        handleFetchBookingList();
                        console.log(res.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Booking successful!',
                            html: `
                    <div>House: ${house.name}</div>
                    <div>Address: ${house.address}</div>
                    <div>Start Date: ${result.startDate}</div>
                    <div>End Date: ${result.endDate}</div>
                    <div>Price: ${result.price}</div>
                    <div>Total: ${result.total}</div>
                    `,
                            footer: '<a href="/user/booking-history">Click here to see booking list</a>'
                        });
                    }).catch((error) => {
                        if (error.response && error.response.status === 400) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error...',
                                text: 'This house is already booked!',
                            })
                        } else {
                            console.error('Error occurred while posting result:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error...',
                                text: 'An error occurred. Please try again later.',
                            })
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error occurred while posting result:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'An error occurred. Please try again later.',
            })
        }
    }

    const handleFetchBookingList = () => {
        axios.get(`http://localhost:8080/booking/house/` + id).then(res => {
            setListBooking(res.data)
        })
    }

    function calculateDiff(startDate, endDate) {
        if (startDate !== "" && endDate !== "") {
            const oneDay = 24 * 60 * 60 * 1000; // số mili giây trong 1 ngày
            const firstDate = new Date(startDate);
            const secondDate = new Date(endDate);
            setDay(Math.round(Math.abs((firstDate - secondDate) / oneDay)));
        }
    }

    const [showFullDescription, setShowFullDescription] = useState(false);

    const MAX_DESCRIPTION_LENGTH = 600;

    const toggleDescription = () => {
        setShowFullDescription((prev) => !prev);
    };

    return (
        <>
            <div className="container col-10">
                <div className="row">
                    <div className="col-12 mt-1">
                        <h3 className="text-capitalize mb-0 mt-3 text-black"><HomeIcon style={{paddingBottom: '5px', fontSize: '40px'}} color="primary"/>{house.name}</h3>
                        <p style={{fontSize: '17px'}} className="mb-0">&nbsp;<LocationOnIcon style={{paddingBottom: '5px', fontSize: '30px'}} color="error"/>{house.address}</p>
                        <p style={{fontSize: '15px', marginTop: '0px'}}>&nbsp; <LocalHotelRoundedIcon/> {house.totalBedrooms} Bed room &nbsp;  &nbsp;<BathtubIcon/> {house.totalBathrooms} Bath room</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-1">
                        <div className="col-8">
                            <div className="row">
                                {listImages.length > 0 && (
                                    <OwlCarousel
                                        items={1}
                                        className="owl-theme"
                                        loop
                                        dots={true}
                                        autoplay
                                    >
                                        {listImages.map((item) => {
                                            return (
                                                <div key={item.id} className="col-sm-12 col-md-12 col-lg-12 p-0 rounded">
                                                    <a target="_blank" href={item.fileUrl} className="">
                                                        <img
                                                            src={item.fileUrl}
                                                            alt="Image"
                                                            className=""
                                                            style={{ maxHeight: '460px', width: '100%' }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src =
                                                                    'https://a0.muscache.com/im/pictures/d3b2b902-6143-46e1-90fc-f6eee6f66e42.jpg?im_w=1200';
                                                            }}
                                                        />
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </OwlCarousel>
                                )}
                                <div className="container">
                                    <div className="row">
                                        {listImages.map((item) => {
                                            return (
                                                <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4 mt-0">
                                                    <a target="_blank" href={item.fileUrl} className="image-popup gal-item" rel="noreferrer">
                                                        <img
                                                            style={{ maxHeight: '120px', width: '100%' }}
                                                            src={item.fileUrl}
                                                            alt="Image"
                                                            className="img-thumbnail h-100"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src =
                                                                    'https://a0.muscache.com/im/pictures/d3b2b902-6143-46e1-90fc-f6eee6f66e42.jpg?im_w=1200';
                                                            }}
                                                        />
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border-bottom border-top mt-2">
                                <div className="row mb-2 align-items-center border-bottom">
                                    <div className="col-9 mt-2">
                                        <h4>
                                            <b>Host {house.user ? house.user.firstName : ''} {house.user ? house.user.lastName : ''}</b>
                                        </h4>
                                        <p>
                                            <BedIcon />{house.totalBedrooms} Bed room . <BathtubIcon />{house.totalBathrooms} Bath room
                                        </p>
                                    </div>
                                    <div className="col-3 text-md-right my-4">
                                        <img
                                            src={house.user ? house.user.profileImage : "https://cuongquach.com/wp-content/uploads/2016/05/linux-logo-356x220.png"}
                                            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <HouseDescription houseDescription={house.description}/>
                                <br />
                            </div>
                        </div>
                        <div className="col-4">
                            <div
                                style={{ position: 'sticky', top: '100px', zIndex: '1001', borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
                                className="bg-white p-4 border mb-2 borde"
                            >
                                <h5 className="text-black mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                    <b>
                                        <span style={{ fontSize: '24px' }}>${house.price} /</span> night
                                    </b>
                                    <span style={{ marginLeft: 'auto', fontSize: '15px', paddingTop: '9px' }}><StarIcon style={{ marginBottom: '4px', fontSize: '16px' }} />
                                        {house.ratingScore} {' - ' + house.numberOfReviews + ' reviews'}</span>
                                </h5>
                                <form action="src/components#" className="">
                                    <div style={{ width: 'fit-content', margin: 'auto' }}>
                                        <TestDatePicker setStartDate={setStartDate} setEndDate={setEndDate} calculateDiff={calculateDiff} listBooking={listBooking} />
                                    </div>
                                    <hr />
                                    <div>
                                        {startDate !== '' && endDate !== '' && (
                                            <div>
                                                <table style={{ width: '100%' }}>
                                                    <tr>
                                                        <td style={{ textAlign: 'left' }}>${house.price} x {day} night</td>
                                                        <td style={{ textAlign: 'right' }}>${house.price * day}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'left' }}>Service charge</td>
                                                        <td style={{ textAlign: 'right' }}>${(house.price * day * 5) / 100}</td>
                                                    </tr>
                                                </table>
                                                <hr />
                                                <table style={{ width: '100%' }}>
                                                    <tr>
                                                        <td style={{ textAlign: 'left' }}>
                                                            <b>Total</b>
                                                        </td>
                                                        <td style={{ textAlign: 'right' }}>
                                                            <b>${house.price * day + (house.price * day * 5) / 100}</b>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        style={{ width: '100%', margin: 'auto', fontSize: '16px', height: '50px' }}
                                        type="button"
                                        className="p-0 btn btn-primary mt-2"
                                        onClick={booking}
                                    >
                                        {startDate !== '' && endDate !== '' ? 'Booking Now' : 'Choose date to check home status'}
                                    </button>
                                </form>
                            </div>
                            <div className="mb-3">
                                <div className="bg-white mt-4 mb-3">
                                    {house.address && (
                                        <div>
                                            <MapWithSearch initialAddress={house.address} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <br/>
                    <Reviews house={house}/>

                </div>

                <br/>
            </div>

            <Footer/>
        </>
    )
}