import {Header} from "../components/Header";
import {Outlet} from "react-router";
import {Footer} from "../components/Footer";

export function Home() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}