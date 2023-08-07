import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import BathtubIcon from "@mui/icons-material/Bathtub";
import {ListComponent} from "../houses/ListComponent";
import {showLoadingAlert} from "../../utils/api";

// Import những thứ cần thiết ở đầu file

export function SearchHouseResult() {
    const [listSearch, setListSearch] = useState([]);
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    let searchQuery = {};

    useEffect(() => {
        const addressQuery = searchParams.get('address') ? searchParams.get('address') : '';
        const minPriceQuery = searchParams.get('minprice') ? searchParams.get('minprice') : 0;
        const maxPriceQuery = searchParams.get('maxprice') ? searchParams.get('maxprice') : 1000000;
        const startDate = searchParams.get('startdate') ? searchParams.get('startdate') : '2023-01-01';
        const endDate = searchParams.get('enddate') ? searchParams.get('enddate') : '2023-01-01';

        axios.get(`http://localhost:8080/house/search?address=${addressQuery}&minPrice=${minPriceQuery}&maxPrice=${maxPriceQuery}&totalBedrooms=${0}&totalBathrooms=${0}&startDate=${startDate}&endDate=${endDate}`)
            .then((res) => {
                setListSearch(res.data);
            });
    }, [searchParams]);

    const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

    useEffect(() => {
        if (listSearch.length <= 0) {
            const timeout = setTimeout(() => {
                setShowNotFoundMessage(true);
            }, 300); // Đợi 0.3 giây trước khi hiển thị thông báo

            return () => clearTimeout(timeout);
        }
    }, [listSearch]);

    return (
        <div className="bg-light pt-3 border-top">
            <div className="container my-1">
                {listSearch.length <= 0 && showNotFoundMessage ? (
                    <h2 className='text-center mb-3'>Not found any results !</h2>
                ) : (
                    <h2 className="my-3">Found {listSearch.length} results!</h2>
                )}
                <div className="row mb-5">
                    {listSearch.length > 0 && <ListComponent listHouse={listSearch} />}
                </div>
            </div>
        </div>
    );
}
