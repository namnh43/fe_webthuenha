import HomePageMenuBar from "../nav/HomePageMenuBar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

export function HomePageCarousel() {

    const [top5RentedHouse, setTop5RentedHouse] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/house`)
            .then((res) => {
                const top5House = res.data.sort((h1, h2) => h2.numberOfRented - h1.numberOfRented).slice(0, 4).reverse()
                setTop5RentedHouse(top5House)
            });
    }, []);

    return (
        <>
            {top5RentedHouse.length > 0 && (
                <div className="carousel-inner text-center" style={{ position: 'relative', top: '-65px', marginBottom: '-75px' }}>
                    <OwlCarousel
                        items={1}
                        className="owl-theme"
                        loop
                        dots={false}
                        autoplay
                        autoplayTimeout={4000}
                    >
                        {top5RentedHouse.map((house) => (
                            <div key={house.id}>
                                {house.images.length > 0 ? (
                                    <img src={house.images[0].fileUrl} className="d-block w-100 vh-100" alt="img1" />
                                ) : (
                                    <img src="/images/hero_bg_1.jpg" className="d-block w-100 vh-100" alt="img1" />
                                )}
                                <div
                                    className="carousel-caption d-flex col-3 p-0 align-items-center justify-content-center flex-column"
                                    style={{
                                        backgroundColor: 'rgb(1,1,1,.3)',
                                        position: 'absolute',
                                        top: '300px',
                                        left: '560px',
                                        height: '240px',
                                        width: '3000px',
                                    }}
                                >
                                    <div className="col-12 p-0">
                                        <p className="mt-3 h2 text-light font-weight-bold">{house.name}</p>
                                        <p className="mb-3">
                                            <strong className="h2 text-success font-weight-bold">${house.price}</strong>
                                        </p>
                                        <p>
                                            <Link
                                                to={`houses/${house.id}`}
                                                className="btn btn-white btn-outline-white py-3 px-5 rounded-0 btn-2"
                                            >
                                                See Details
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            )}
        </>
    );
}