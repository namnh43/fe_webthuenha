export function HomePageCarousel() {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner text-center">
                    <div className="carousel-item active " data-bs-interval="3000">
                        <img src="/images/hero_bg_1.jpg" style={{height:'700px'}} className="d-block w-100" alt="img1"/>
                        <div className="carousel-caption d-flex h-100 align-items-center justify-content-center flex-column">
                            <div className="col-md-10">
                                <h1 className="mb-2 mt-3">625 S. Berendo St</h1>
                                <p className="mb-5"><strong
                                    className="h2 text-success font-weight-bold">$1,000,500</strong></p>
                                <p><a href="#" className="btn btn-white btn-outline-white py-3 px-5 rounded-0 btn-2">See
                                    Details</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="/images/hero_bg_2.jpg" style={{height:'700px'}} className="d-block w-100" alt="img2"/>
                        <div className="carousel-caption d-flex h-100 align-items-center justify-content-center flex-column">
                            <div className="col-md-10">
                                <h1 className="mb-2 mt-3">871 Crenshaw Blvd</h1>
                                <p className="mb-5"><strong
                                    className="h2 text-success font-weight-bold">$2,250,500</strong></p>
                                <p><a href="#" className="btn btn-white btn-outline-white py-3 px-5 rounded-0 btn-2">See
                                    Details</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="/images/hero_bg_3.jpg" style={{height:'700px'}} className="d-block w-100" alt="img3"/>
                        <div className="carousel-caption d-flex h-100 align-items-center justify-content-center flex-column">
                            <div className="col-md-10">
                                <h1 className="mb-2 mt-3">625 S. Berendo St</h1>
                                <p className="mb-5"><strong
                                    className="h2 text-success font-weight-bold">$1,000,500</strong></p>
                                <p><a href="#" className="btn btn-white btn-outline-white py-3 px-5 rounded-0 btn-2">See
                                    Details</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}