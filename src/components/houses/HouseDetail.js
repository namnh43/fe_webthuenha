import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import MapWithSearch from "../Map";
import OwlCarousel from "react-owl-carousel";
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Reviews from "../Reviews";
import TestDatePicker from "../datetime/test";
import Swal from "sweetalert2";
import StarIcon from "@mui/icons-material/Star";
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import {Link} from "react-router-dom";
import {Footer} from "../Footer";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";

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

    useEffect(() => {
        console.log('get_house_id', id);
        axios.get(`http://localhost:8080/house/` + id).then(res => {
            console.log('get_data', res)
            setHouse(res.data)
            setListImages(res.data.images)
        })
        handleFetchBookingList();
    }, [])

    function calculateDiff(startDate, endDate) {
        if (startDate !== "" && endDate !== "") {
            const oneDay = 24 * 60 * 60 * 1000; // số mili giây trong 1 ngày
            const firstDate = new Date(startDate);
            const secondDate = new Date(endDate);
            setDay(Math.round(Math.abs((firstDate - secondDate) / oneDay)));
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                            <div className="bg-white property-body border-bottom border-top mt-2">
                                <div className="row mb-2 align-items-center border-bottom">
                                    <div className="col-md-9 mt-2">
                                        <h4>
                                            <b>Host {house.user ? house.user.firstName : ''} {house.user ? house.user.lastName : ''}</b>
                                        </h4>
                                        <p>
                                            <BedIcon />{house.totalBedrooms} Bed room . <BathtubIcon />{house.totalBathrooms} Bath room
                                        </p>
                                    </div>
                                    <div className="col-md-3 text-md-right my-4">
                                        <img
                                            src={house.user ? house.user.profileImage : "https://cuongquach.com/wp-content/uploads/2016/05/linux-logo-356x220.png"}
                                            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <h4 className="mt-4">More description of the house</h4>
                                <p>{house.description}</p>
                                <br />
                            </div>
                        </div>
                        <div className="col-4">
                            <div
                                style={{ position: 'sticky', top: '120px', zIndex: '1001', borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
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

                <br/><br/>
            </div>

            <div className="site-section site-section-sm bg-light">
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <div className="site-section-title mb-5">
                                <h2>Related Properties</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="property-entry h-100">
                                <a href="property-details.html" className="property-thumbnail">
                                    <div className="offer-type-wrap">
                                        <span className="offer-type bg-danger">Sale</span>
                                        <span className="offer-type bg-success">Rent</span>
                                    </div>
                                    <img src="images/img_1.jpg" alt="Image" className="img-fluid"/>
                                </a>
                                <div className="p-4 property-body">
                                    <a href="src/components#" className="property-favorite"><span className="icon-heart-o"></span></a>
                                    <h2 className="property-title"><a href="property-details.html">625 S. Berendo St</a>
                                    </h2>
                                    <span className="property-location d-block mb-3"><span
                                        className="property-icon icon-room"></span> 625 S. Berendo St Unit 607 Los Angeles, CA 90005</span>
                                    <strong
                                        className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
                                    <ul className="property-specs-wrap mb-3 mb-lg-0">
                                        <li>
                                            <span className="property-specs">Beds</span>
                                            <span className="property-specs-number">2 <sup>+</sup></span>
                                        </li>
                                        <li>
                                            <span className="property-specs">Baths</span>
                                            <span className="property-specs-number">2</span>
                                        </li>
                                        <li>
                                            <span className="property-specs">SQ FT</span>
                                            <span className="property-specs-number">7,000</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="property-entry h-100">
                                <a href="property-details.html" className="property-thumbnail">
                                    <div className="offer-type-wrap">
                                        <span className="offer-type bg-danger">Sale</span>
                                        <span className="offer-type bg-success">Rent</span>
                                    </div>
                                    <img src="images/img_2.jpg" alt="Image" className="img-fluid"/>
                                </a>
                                <div className="p-4 property-body">
                                    <a href="src/components#" className="property-favorite active"><span
                                        className="icon-heart-o"></span></a>
                                    <h2 className="property-title"><a href="property-details.html">871 Crenshaw Blvd</a>
                                    </h2>
                                    <span className="property-location d-block mb-3"><span
                                        className="property-icon icon-room"></span> 1 New York Ave, Warners Bay, NSW 2282</span>
                                    <strong
                                        className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
                                    <ul className="property-specs-wrap mb-3 mb-lg-0">
                                        <li>
                                            <span className="property-specs">Beds</span>
                                            <span className="property-specs-number">2 <sup>+</sup></span>
                                        </li>
                                        <li>
                                            <span className="property-specs">Baths</span>
                                            <span className="property-specs-number">2</span>
                                        </li>
                                        <li>
                                            <span className="property-specs">SQ FT</span>
                                            <span className="property-specs-number">1,620</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="property-entry h-100">
                                <a href="property-details.html" className="property-thumbnail">
                                    <div className="offer-type-wrap">
                                        <span className="offer-type bg-info">Lease</span>
                                    </div>
                                    <img src="images/img_3.jpg" alt="Image" className="img-fluid"/>
                                </a>
                                <div className="p-4 property-body">
                                    <a href="src/components#" className="property-favorite"><span className="icon-heart-o"></span></a>
                                    <h2 className="property-title"><a href="property-details.html">853 S Lucerne
                                        Blvd</a></h2>
                                    <span className="property-location d-block mb-3"><span
                                        className="property-icon icon-room"></span> 853 S Lucerne Blvd Unit 101 Los Angeles, CA 90005</span>
                                    <strong
                                        className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
                                    <ul className="property-specs-wrap mb-3 mb-lg-0">
                                        <li>
                                            <span className="property-specs">Beds</span>
                                            <span className="property-specs-number">2 <sup>+</sup></span>
                                        </li>
                                        <li>
                                            <span className="property-specs">Baths</span>
                                            <span className="property-specs-number">2</span>
                                        </li>
                                        <li>
                                            <span className="property-specs">SQ FT</span>
                                            <span className="property-specs-number">5,500</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}