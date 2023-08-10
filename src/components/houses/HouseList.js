import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {ListComponent} from "./ListComponent";
import Constants from "../../utils/constants";
export function HouseList() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${Constants.BASE_API}/house/latest`, {}).then(res => {
            setList(res.data);
        })
        //get search params
        const searchParams = new URLSearchParams(window.location.search);
        console.log('query params',searchParams)
        const address = searchParams.get('address');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

    }, [])
    const topHouse = [...list]
        .sort((a, b) => b.numberOfRented - a.numberOfRented)
        .slice(0, 4);

    return (
        <>
            <div className="bg-light pt-4 pb-4 border-top">
                <div className="container">
                    <h2 className={'mt-3'}><b>Top Rented</b></h2>
                    <div className="row">
                        <ListComponent listHouse={topHouse}/>
                    </div>
                    <h2 className='mt-5'><b>Popular Houses</b></h2>
                    <div className="row">
                        <ListComponent listHouse={list}/>
                    </div>
                </div>
            </div>
        </>
    )
}