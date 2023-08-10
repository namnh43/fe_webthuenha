import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {HomePageCarousel} from "./carousel/HomePageCarousel";
import {Outlet, useLocation} from "react-router";

export function Header() {

    return (
        <div className="position-relative">
            <HomePageCarousel/>
        </div>
    )
}