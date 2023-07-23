import {Header} from "../components/Header";
import {Outlet} from "react-router";
import {Footer} from "../components/Footer";
import SearchBar from "../components/SearchBar";

export function HomePage() {
    return (
        <>
            <Header/>
            <SearchBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}