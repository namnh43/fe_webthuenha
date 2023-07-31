import {Header} from "../components/header/Header";
import SearchBar from "../components/search/SearchBar";
import {Outlet} from "react-router";
import {Footer} from "../components/Footer";
import {SearchHouseResult} from "../components/search/SearchHouseResult";
import Menubar from "../components/header/nav/Menubar";
import {Divider} from "@mui/material";

export function SearchResultPage() {
    return (
        <>
            <Menubar/>
            <Divider/>
            <SearchBar/>
            <SearchHouseResult/>
            <Footer/>
        </>
    )
}