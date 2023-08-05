import {Header} from "../components/header/Header";
import {Outlet} from "react-router";
import {Footer} from "../components/Footer";
import SearchBar from "../components/search/SearchBar";
import {ParentUsingDatePicker} from "../components/datetime/ParentUsingDatePicker";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {searchAction} from "../components/redux/searchSlice";
import HomePageMenuBar from "../components/header/nav/HomePageMenuBar";

export function HomePage() {
    const dispatch = useDispatch()
    useEffect(() => {
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