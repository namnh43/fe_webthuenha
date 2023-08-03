import HomePageMenuBar from "../nav/HomePageMenuBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function HomePageCarousel() {

    const [top5RentedHouse, setTop5RentedHouse] = useState([])

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/house`, {})
            .then((res) => {
                const top5House = res.data.sort((h1, h2) => h2.numberOfRented - h1.numberOfRented).slice(0, 4).reverse()
                setTop5RentedHouse(top5House)
            });
    }, []);

    return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{zIndex: '0'}} data-bs-ride="carousel">
                <HomePageMenuBar/>
                <div className="carousel-inner text-center" style={{position: 'relative', top: '-65px', marginBottom: '-75px',zIndex: '-1'}}>
                    {top5RentedHouse && top5RentedHouse.map((house, key) =>
                        (<div className="carousel-item active"  data-bs-interval="2000">
                            {house.images.length > 0 ? (<img src={house.images[0].fileUrl}  className="d-block w-100 vh-100" alt="img1"/>)
                                :(<img src="/images/hero_bg_1.jpg"  className="d-block w-100 vh-100" alt="img1"/>)}
                            <div className="carousel-caption d-flex col-3 p-0 align-items-center justify-content-center flex-column"
                            style={{backgroundColor: 'rgb(1,1,1,.5)', position: 'absolute', top: '300px', left: '560px', height: '180px', width: '3000px'}}>
                                <div className="col-12 p-0">
                                    <p className="mt-3 h2 text-light font-weight-bold">{house.name}</p>
                                    <p className="mb-3"><strong
                                        className="h2 text-success font-weight-bold">${house.price}</strong></p>
                                    <p><Link to={`houses/${house.id}/detail`} className="btn btn-white btn-outline-white py-3 px-5 rounded-0 btn-2">See
                                        Details</Link></p>
                                </div>
                            </div>
                        </div>))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev" style={{zIndex: '-1'}}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="next" style={{zIndex: '-1'}}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
    )
}