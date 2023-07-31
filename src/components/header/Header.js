import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {HomeCarousel} from "./carousel/HomeCarousel";
import Menubar from "./nav/Menubar";
import {HomePageCarousel} from "./carousel/HomePageCarousel";
import HomePageMenuBar from "./nav/HomePageMenuBar";

export function Header() {
    return (
        <div className="position-relative vh-100">
            <HomePageMenuBar/>
            <HomePageCarousel/>
        </div>
    )
}