import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import MapWithSearch from "./Map";
import OwlCarousel from "react-owl-carousel";

export function HouseDetail() {
    const [list, setList] = useState([""]);
    const [house, setHouse] = useState([]);
    const {id} = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8080/house/` + id, {}).then(res => {
            console.log(res.data)
            setHouse(res.data)
            setList(res.data.images)
        })
    }, [])
    return (
        <>
            <div className="site-section site-section-sm">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div>
                                {/*<div className="slide-one-item home-slider owl-carousel">*/}
                                <div>
                                    <img src={list[0].fileUrl} alt="Image" className="img-fluid"/>
                                </div>
                            </div>
                            <div className="bg-white property-body border-bottom border-left border-right">
                                <div className="row mb-5">
                                    <div className="col-md-6">
                                        <strong className="text-success h1 mb-3">${house.price}</strong>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="property-specs-wrap mb-3 mb-lg-0 float-lg-right">
                                            <li>
                                                <span className="property-specs">Beds</span>
                                                <span className="property-specs-number">{house.totalBedrooms}
                                                    <sup>+</sup></span>
                                            </li>
                                            <li>
                                                <span className="property-specs">Baths</span>
                                                <span className="property-specs-number">{house.totalBathrooms}</span>
                                            </li>
                                            <li>
                                                <span className="property-specs">SQ FT</span>
                                                <span className="property-specs-number">7,000</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
                                        <span className="d-inline-block text-black mb-0 caption-text">Home Type</span>
                                        <strong className="d-block">Condo</strong>
                                    </div>
                                    <div className="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
                                        <span className="d-inline-block text-black mb-0 caption-text">Year Built</span>
                                        <strong className="d-block">2018</strong>
                                    </div>
                                    <div className="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
                                        <span className="d-inline-block text-black mb-0 caption-text">Price/Sqft</span>
                                        <strong className="d-block">$520</strong>
                                    </div>
                                </div>
                                <h2 className="h4 text-black">More Info</h2>
                                <p>{house.description}</p>
                                <div className="row mt-5">
                                    <div className="col-12">
                                        <h2 className="h4 text-black mb-3">Gallery</h2>
                                    </div>
                                    <OwlCarousel items={1}
                                                 className="owl-theme"
                                                 loop
                                                 dots={true}
                                                 autoplay
                                                 margin={8}>
                                        {list.map((item) => {
                                            return (
                                                <div className="col-sm-12 col-md-12 col-lg-12">
                                                    <a target="_blank" href={item.fileUrl} className="image-popup gal-item"><img
                                                        src={item.fileUrl} alt="Image" className="img-fluid"/></a>
                                                </div>
                                            )
                                        })}
                                    </OwlCarousel>
                                    {list.map((item) => {
                                        return (
                                            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 mt-2">
                                                <a target="_blank" href={item.fileUrl} className="image-popup gal-item"><img
                                                    src={item.fileUrl} alt="Image" className="img-fluid"/></a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            {house.address
                                && <div>
                                    <MapWithSearch initialAddress={house.address}/>
                                </div>}
                            <br/><br/>
                            <div className="bg-white widget border rounded">
                                <h3 className="h4 text-black widget-title mb-3">Contact Agent</h3>
                                <form action="#" className="form-contact-agent">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea name="message" id="message" cols="30" rows="5"
                                                  className="form-control"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Send Message" className="btn btn-primary"/>
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