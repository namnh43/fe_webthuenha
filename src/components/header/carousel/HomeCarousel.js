import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export function HomeCarousel() {
    return (
        <OwlCarousel items={1}
                     className="owl-theme"
                     loop
                     dots={false}
                     autoplay
                     margin={8}>
            <div className="overlay" style={{backgroundImage: `url(images/hero_bg_1.jpg)`}}
                 data-aos="fade" data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
                        <div className="col-md-10">
                            <h1 className="mb-2 mt-3">871 Crenshaw Blvd</h1>
                            <p className="mb-5"><strong
                                className="h2 text-success font-weight-bold">$2,250,500</strong></p>
                            <p><a href="#" className="btn btn-white btn-outline-white py-3 px-5 rounded-0 btn-2">See
                                Details</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overlay" style={{backgroundImage: `url(images/hero_bg_2.jpg)`}}
                 data-aos="fade" data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
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
        </OwlCarousel>
    )
}