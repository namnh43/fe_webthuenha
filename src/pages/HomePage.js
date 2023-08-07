import {Header} from "../components/header/Header";
import {Outlet} from "react-router";
import {Footer} from "../components/Footer";
import SearchBar from "../components/search/SearchBar";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {searchAction} from "../components/redux/searchSlice";
import HomePageMenuBar from "../components/header/nav/HomePageMenuBar";
import BookingNotification from "../components/notification/BookingNotification";

export function HomePage() {
    const dispatch = useDispatch()
    useEffect(() => {
        document.title = "Home Page";
        dispatch(searchAction({address:'',minPrice:'',maxPrice:'',startDate:null,endDate:null}))
    },[])
    return (
        <>
            <HomePageMenuBar/>
            <Header/>
            <SearchBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}