import {Header} from "../components/Header";
import {Outlet} from "react-router";
import {Footer} from "../components/Footer";

export function HomePage() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}