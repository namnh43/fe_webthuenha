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

export function HouseDetail() {
    const [list, setList] = useState([]);
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
            navigate("/login")
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
            axios.post('http://localhost:8080/booking/create', result, config).then((res) => {
                handleFetchBookingList();
                Swal.fire({
                    icon: 'success',
                    title: 'Booking successful!',
                    html: `
                    <div>House: ${result.house.name}</div>
                    <div>Address: ${result.house.address}</div>
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
        } catch (error) {
            console.error('Error occurred while posting result:', error);
            alert('An error occurred. Please try again later.');
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
            setList(res.data.images)
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

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-capitalize mb-0 mt-3"><HomeIcon color="secondary"/> {house.name}</h3>
                        <p className="text-decoration-underline"><LocationOnIcon color="primary"/> {house.address}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            {list.length > 0 &&
                                <OwlCarousel items={1}
                                             className="owl-theme"
                                             loop
                                             dots={true}
                                             autoplay
                                             margin={8}>
                                    {list.map((item) => {
                                        return (
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <a target="_blank" href={item.fileUrl}
                                                   className="image-popup gal-item"><img
                                                    src={item.fileUrl} alt="Image" className="img-fluid vh-100"
                                                    style={{maxHeight: '460px'}}/></a>
                                            </div>
                                        )
                                    })}
                                </OwlCarousel>}
                            <div className="container">
                                <div className="row">
                                    {list.map((item) => {
                                        return (
                                            <div className="col-sm-6 col-md-4 col-lg-3 mb-2 mt-2 ">
                                                <a target="_blank" href={item.fileUrl} className="image-popup gal-item"><img
                                                    src={item.fileUrl} alt="Image" className="img-thumbnail h-100"/></a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col">
                        <div className="bg-white p-4 border rounded">
                            <h5 className="text-black mb-3" style={{ display: 'flex', alignItems: 'center'}}>
                                <b><span style={{fontSize: '24px'}}>${house.price} /</span> night</b>
                                <span style={{ marginLeft: 'auto', fontSize: '15px', paddingTop: '9px'}}>
                <StarIcon style={{ marginBottom: '4px', fontSize: '16px'}}/>
                                    {house.ratingScore} {" - " + house.numberOfReviews + " reviews"}
            </span>
                            </h5>
                            <form action="src/components#" className="">
                                <div style={{width: 'fit-content', margin: 'auto'}}>
                                    <TestDatePicker setStartDate={setStartDate} setEndDate={setEndDate}
                                                    calculateDiff={calculateDiff} listBooking={listBooking}/>
                                </div>
                                <hr/>
                                <div>
                                    {startDate !== "" && endDate !== "" && <div>
                                        <table style={{width: '100%'}}>
                                            <tr>
                                                <td style={{textAlign: 'left'}}>
                                                    ${house.price} x {day} night
                                                </td>
                                                <td style={{textAlign: 'right'}}>${house.price * day}</td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign: 'left'}}>
                                                    Service charge
                                                </td>
                                                <td style={{textAlign: 'right'}}>${house.price * day * 5 / 100}</td>
                                            </tr>
                                        </table>
                                        <hr/>
                                        <table style={{width: '100%'}}>
                                            <tr>
                                                <td style={{textAlign: 'left'}}><b>Total</b></td>
                                                <td style={{textAlign: 'right'}}><b>${house.price * day + house.price * day * 5 / 100}</b></td>
                                            </tr>
                                        </table>
                                    </div>}
                                </div>
                                <button style={{width: '100%', margin: 'auto', fontSize: '18px', height: '50px'}} type="button" className="btn btn-primary mt-2"
                                        onClick={booking}>
                                    {startDate !== "" && endDate !== "" ? "Booking Now" : "Choose date to check home status"}
                                </button>
                            </form>
                        </div>
                        <div className="bg-white border rounded mt-5">
                            {house.address
                                && <div>
                                    <MapWithSearch initialAddress={house.address}/>
                                </div>}
                        </div>
                    </div>

                    <div className="bg-white property-body border-bottom border-left border-right">
                        <div className="row mb-5">
                            <h2>Host {house && house.user ? house.user.firstName : ''} {house && house.user ? house.user.lastName : ''}</h2>
                            <h5><BedIcon/>{house.totalBedrooms} Bed room . <BathtubIcon/>{house.totalBathrooms} Bath room</h5>
                        </div>
                        <h2 className="h4 text-black">More Info</h2>
                        <p>{house.description}</p>
                        <br/>

                    </div>
                </div>

                <br/><br/>

                <Reviews house={house}/>

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