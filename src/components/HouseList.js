import React, {useEffect, useState} from "react";
import axios from "axios";

export function HouseList() {
    const [list,setList]=useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8080/house`, {
        }).then(res=>{
            console.log(res.data)
            setList(res.data)
        })
    },[])
    return(
        <>
            <div className="site-section site-section-sm bg-light">
                <h1>Houses List</h1>

                <div className="container">
                                 <div className="row mb-5">
                {list.map((item) => {
                    return (
                        <>
                            <div className="col-md-6 col-lg-4 mb-4">
                                                         <div className="property-entry h-100">
                                                             <a href="property-details" className="property-thumbnail">
                                                                 <div className="offer-type-wrap">
                                                                     <span className="offer-type bg-success">Rent</span>
                                                                 </div>
                                                                 <img src={item.images.length > 0 ? item.images[0].fileUrl : "https://firebasestorage.googleapis.com/v0/b/casemd4-3a742.appspot.com/o/images%2Fstarbucks.jpg?alt=media&token=543189a3-7d56-4647-a834-8d05d6f69969"} alt="Image" className="img-fluid"/>
                                                             </a>
                                                             <div className="p-4 property-body">
                                                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
                                                                 <h2 className="property-title"><a href="property-details.html">{item.name}</a>
                                                                 </h2>
                                                                 <span className="property-location d-block mb-3"><span
                                                                     className="property-icon icon-room"></span> {item.address}</span>
                                                                 <strong
                                                                     className="property-price text-primary mb-3 d-block text-success">${item.price}</strong>
                                                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
                                                                     <li>
                                                                         <span className="property-specs">Beds</span>
                                                                         <span className="property-specs-number">{item.totalBedrooms} <sup>+</sup></span>

                                                                     </li>
                                                                     <li>
                                                                         <span className="property-specs">Baths</span>
                                                                         <span className="property-specs-number">{item.totalBathrooms}</span>
                                                                     </li>
                                                                     <li>
                                                                         <span className="property-specs">SQ FT</span>
                                                                         <span className="property-specs-number">7,000</span>

                                                                     </li>
                                                                 </ul>
                                                             </div>
                                                         </div>
                                                     </div>
                        </>
                    );
                })}
                                 </div>
                             </div>
            </div>
        </>
    )
    // return (
    //     <>
    //         <div className="site-section site-section-sm bg-light">
    //             <div className="container">
    //                 <div className="row mb-5">
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_1.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">625 S. Berendo St</a>
    //                                 </h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 625 S. Berendo St Unit 607 Los Angeles, CA 90005</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">7,000</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_2.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite active"><span
    //                                     className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">871 Crenshaw Blvd</a>
    //                                 </h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 1 New York Ave, Warners Bay, NSW 2282</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">1,620</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_3.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">853 S Lucerne
    //                                     Blvd</a></h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 853 S Lucerne Blvd Unit 101 Los Angeles, CA 90005</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">5,500</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_4.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">625 S. Berendo St</a>
    //                                 </h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 625 S. Berendo St Unit 607 Los Angeles, CA 90005</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">7,000</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_5.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">871 Crenshaw Blvd</a>
    //                                 </h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 1 New York Ave, Warners Bay, NSW 2282</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">1,620</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_6.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">853 S Lucerne
    //                                     Blvd</a></h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 853 S Lucerne Blvd Unit 101 Los Angeles, CA 90005</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">5,500</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_7.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">625 S. Berendo St</a>
    //                                 </h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 625 S. Berendo St Unit 607 Los Angeles, CA 90005</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">7,000</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_8.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">871 Crenshaw Blvd</a>
    //                                 </h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 1 New York Ave, Warners Bay, NSW 2282</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">1,620</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 col-lg-4 mb-4">
    //                         <div className="property-entry h-100">
    //                             <a href="property-details.html" className="property-thumbnail">
    //                                 <div className="offer-type-wrap">
    //                                     <span className="offer-type bg-success">Rent</span>
    //                                 </div>
    //                                 <img src="images/img_1.jpg" alt="Image" className="img-fluid"/>
    //                             </a>
    //                             <div className="p-4 property-body">
    //                                 <a href="#" className="property-favorite"><span className="icon-heart-o"></span></a>
    //                                 <h2 className="property-title"><a href="property-details.html">853 S Lucerne
    //                                     Blvd</a></h2>
    //                                 <span className="property-location d-block mb-3"><span
    //                                     className="property-icon icon-room"></span> 853 S Lucerne Blvd Unit 101 Los Angeles, CA 90005</span>
    //                                 <strong
    //                                     className="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
    //                                 <ul className="property-specs-wrap mb-3 mb-lg-0">
    //                                     <li>
    //                                         <span className="property-specs">Beds</span>
    //                                         <span className="property-specs-number">2 <sup>+</sup></span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">Baths</span>
    //                                         <span className="property-specs-number">2</span>
    //
    //                                     </li>
    //                                     <li>
    //                                         <span className="property-specs">SQ FT</span>
    //                                         <span className="property-specs-number">5,500</span>
    //
    //                                     </li>
    //                                 </ul>
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="row">
    //                     <div className="col-md-12 text-center">
    //                         <div className="site-pagination">
    //                             <a href="#" className="active">1</a>
    //                             <a href="#">2</a>
    //                             <a href="#">3</a>
    //                             <a href="#">4</a>
    //                             <a href="#">5</a>
    //                             <span>...</span>
    //                             <a href="#">10</a>
    //                         </div>
    //                     </div>
    //                 </div>
    //
    //             </div>
    //         </div>
    //     </>
    // )
}