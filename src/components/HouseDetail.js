import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import MapWithSearch from "./Map";
import OwlCarousel from "react-owl-carousel";
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function HouseDetail() {
    const [list, setList] = useState([]);
    const [house, setHouse] = useState({});
    const {id} = useParams()
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [day, setDay] = useState(0);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    function handleStartDateChange(event) {
        if (new Date(event.target.value) < Date.now()) {
            alert("startDate invalid")
            return;
        }
        setStartDate(event.target.value);
        calculateDiff(event.target.value, endDate)
    }

    function handleEndDateChange(event) {
        if (new Date(event.target.value) < Date.now()) {
            alert("endDate invalid")
            return;
        }
        setEndDate(event.target.value);
        calculateDiff(startDate, event.target.value)
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
            alert("invite you enter Date")
            return
        }
        setResult({
            startDate: startDate,
            endDate: endDate,
            price: house.price,
            total: house.price * day + house.price * day * 5 / 100,
            house: {
                id: house.id
            }
        });
    }

    useEffect(() => {
        console.log('result', result)
        if (result === null) return
        postResult()
    }, [result])

    function postResult() {
        try {
            console.log('post_result', result);
            axios.post('http://localhost:8080/booking/create', result, config).then((res) => {
                alert('success');
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert('This day has been placed');
                } else {
                    console.error('Error occurred while posting result:', error);
                    alert('An error occurred. Please try again later.');
                }
            });
        } catch (error) {
            console.error('Error occurred while posting result:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    useEffect(() => {
        console.log('get_house_id', id);
        axios.get(`http://localhost:8080/house/` + id).then(res => {
            console.log('get_data', res)
            setHouse(res.data)
            setList(res.data.images)
        })
    }, [])

    function calculateDiff(startDate, endDate) {
        if (startDate !== "" && endDate !== "") {
            if (new Date(startDate) >= new Date(endDate)) {
                alert("Date invalid")
                setEndDate("")
            } else {
                const oneDay = 24 * 60 * 60 * 1000; // số mili giây trong 1 ngày
                const firstDate = new Date(startDate);
                const secondDate = new Date(endDate);
                setDay(Math.round(Math.abs((firstDate - secondDate) / oneDay)));
            }
        }
    }
    return (
        <>
            <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-capitalize mb-0 mt-3"> <HomeIcon color="secondary" /> {house.name}</h3>
                            <p className="text-decoration-underline"><LocationOnIcon color="primary" /> {house.address}</p>
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
                                                        src={item.fileUrl} alt="Image" className="img-fluid"/></a>
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
                            <div className="bg-white p-3 border rounded">
                                <h3 className="h4 text-black  mb-3 ">Price ${house.price}/Night</h3>
                                <form action="#" className="">
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="Booking">Booking Date</label>
                                            <input type="Date" id="Booking" className="form-control" value={startDate}
                                                   onChange={handleStartDateChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="EndDate">End Date</label>
                                            <input type="Date" id="EndDate" className="form-control" value={endDate}
                                                   onChange={handleEndDateChange}/>
                                        </div>
                                    </div>
                                    <div>
                                        {startDate !== "" && endDate !== "" && <div>
                                            <tr>
                                                <td>
                                                    ${house.price} X {day} Day :
                                                </td>
                                                <td>${house.price * day}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Service charge :
                                                </td>
                                                <td>${house.price * day * 5 / 100}</td>
                                            </tr>
                                            <tr>
                                                <th>Total money :</th>
                                                <th>${house.price * day + house.price * day * 5 / 100}</th>
                                            </tr>
                                        </div>}
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <input type="button" value="Booking" className="btn btn-primary"
                                               onClick={booking}/>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-white widget border rounded mt-5">
                                <h3 className="h4 text-black widget-title mb-3">Featured Properties</h3>
                                <p>Address detail</p>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><a href="#">1 Madison Street</a></li>
                                    <li className="mb-2"><a href="#">42 Barington Drive</a></li>
                                    <li className="mb-2"><a href="#">87 Alton Road</a></li>
                                    <li className="mb-2"><a href="#">14 Brooketon Drive</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white property-body border-bottom border-left border-right">
                            <div className="row mb-5">
                                <h2>Host  {house && house.user ? house.user.firstName: ''} {house && house.user ? house.user.lastName : ''}</h2>
                                <h5>{house.totalBedrooms} Bed room . {house.totalBathrooms} Bath room</h5>
                            </div>
                            <h2 className="h4 text-black">More Info</h2>
                            <p>{house.description}</p>
                            <br/>
                            {house.address
                                && <div >
                                    <MapWithSearch initialAddress={house.address}/>
                                </div>}
                        </div>

                    </div>
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
                                    <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
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
                                    <a href="#" className="property-favorite active"><span
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
                                    <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
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