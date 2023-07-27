import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {HomeCarousel} from "./carousel/HomeCarousel";
import Menubar from "./nav/Menubar";
import {HomePageCarousel} from "./carousel/HomePageCarousel";

export function Header() {
    return (
        <>
            <Menubar/>
            <HomePageCarousel/>
        </>
    )
}