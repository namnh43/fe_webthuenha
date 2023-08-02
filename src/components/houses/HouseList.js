import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHotelRoundedIcon from '@mui/icons-material/LocalHotelRounded';
import BathtubIcon from '@mui/icons-material/Bathtub';
import {ListComponent} from "./ListComponent";
export function HouseList() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/house`, {}).then(res => {
            setList(res.data)
            console.log(res.data)
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
    const topHouse = list
        .sort((a, b) => b.numberOfRented - a.numberOfRented)
        .slice(0, 4);

    return (
        <>
            <div className="bg-light pt-4 pb-4">
                <div className="container">
                    <div className="row">
                        <h1>Top Visited</h1>
                        <ListComponent listHouse={topHouse}/>
                        <h1 className='mt-5'>Popular Houses</h1>
                        <ListComponent listHouse={list}/>
                    </div>
                </div>
            </div>
        </>
    )
}