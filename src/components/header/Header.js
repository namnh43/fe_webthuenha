import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {HomeCarousel} from "./carousel/HomeCarousel";
import {Navbar} from "./nav/Navbar";

export function Header() {
    return (
        <>
            <Navbar/>
            <HomeCarousel/>
        </>
    )
}