import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {HomeCarousel} from "./carousel/HomeCarousel";
import Menubar from "./nav/Menubar";

export function Header() {
    return (
        <>
            <Menubar/>
            <HomeCarousel/>
        </>
    )
}