import {Header} from "../components/header/Header";
import {Outlet} from "react-router";
import {Footer} from "../components/Footer";
import SearchBar from "../components/search/SearchBar";
import {ParentUsingDatePicker} from "../components/datetime/ParentUsingDatePicker";

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