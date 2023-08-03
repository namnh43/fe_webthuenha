import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {HomeCarousel} from "./carousel/HomeCarousel";
import Menubar from "./nav/Menubar";
import {HomePageCarousel} from "./carousel/HomePageCarousel";
import HomePageMenuBar from "./nav/HomePageMenuBar";
import {Outlet, useLocation} from "react-router";
import {useEffect} from "react";

export function Header() {
    //get search params
    const location = useLocation();

    return (
        <div className="position-relative">
            <HomePageCarousel/>
        </div>
    )
}