import React, {useEffect, useState} from 'react';
import './searchBar.css';
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import DateRangePickerComponent from "../datetime/DateRangePickerComponent";
import {useDispatch, useSelector} from "react-redux";
import {searchAction} from "../redux/searchSlice";
import {useNavigate} from "react-router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Swal from "sweetalert2";

function createQueryString(params) {
    let queryString = '';

    for (const key in params) {
        if (params.hasOwnProperty(key) && encodeURIComponent(params[key])) {
            if (queryString !== '') {
                queryString += '&';
            }
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        }
    }

    return queryString;
}
function SearchBar() {
    const [address, setAddress] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedRange, setSelectedRange] = useState(['','']);
    let [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        if (minPrice > maxPrice) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Min price must be less than max price!',
            })
            return;
        }
        // dispatch(searchAction({address:address,minPrice:minPrice?minPrice:0,maxPrice:maxPrice?maxPrice:10000,startDate:selectedRange[0],endDate:selectedRange[1]}))
        const queryString = createQueryString({address:address,minprice:minPrice,maxprice:maxPrice,startdate:selectedRange[0],enddate:selectedRange[1]});
        console.log('query',queryString)
        navigate('/search?'+queryString)
        window.scrollTo(0, 180);
    }

    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length === 2)
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'),ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(['',''])
    };

    useEffect(() => {
        console.log('query search params',searchParams)
        if (searchParams.size > 0) {
            if (searchParams.get('address')) setAddress(searchParams.get('address'))
            if (searchParams.get('minprice')) setMinPrice(searchParams.get('minprice'))
            if (searchParams.get('maxprice')) setMaxPrice(searchParams.get('maxprice'))
            if (searchParams.get('startdate') && searchParams.get('enddate')) setSelectedRange([searchParams.get('startdate'), searchParams.get('enddate')])
        }
    }, [searchParams])

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsSticky(window.pageYOffset >= 60); // Set to true when the scroll position is 60px or more
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="search-sec col-8 m-auto my-5" style={{ position: 'sticky', top: "0px", left: '323px', zIndex: "1000", padding: "12px" }}>
            <div className="row pl-4">
                <div className="col-3 p-1">
                    <input
                        type="text"
                        className="form-control search-slt"
                        id="location"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Location"
                        style={{ height: '42px', border: '1px solid #bdbdbd', borderRadius: '6px' }}
                    />
                </div>
                <div className="col-3 mt-1" style={{padding : '0px',maxWidth: '180px',maxHeight: '42px', display: 'flex', alignItems: 'center', border: '1px solid #bdbdbd', borderRadius: '6px'}}>
                    <input
                        type="text"
                        className="form-control search-slt"
                        id="minPrice"
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min price"
                        style={{border: 'none', padding: '0px', textAlign: 'right'}}
                    />
                    <span style={{fontSize: '25px', color:'grey', margin: '0 5px'}}>-</span>
                    <input
                        type="text"
                        className="form-control search-slt"
                        id="maxPrice"
                        min="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="max price"
                        style={{border: 'none',padding: '0px',  textAlign: 'left' }}
                    />
                </div>
                <div className="col-3 p-1">
                    <DateRangePickerComponent onChange={handleDateRangeChange} inputRange={selectedRange} />
                </div>
                <div className="col-3 p-1">
                    <Button variant="outlined" startIcon={<SearchIcon />} onClick={handleInputChange} style={{ height: '42px', marginLeft: '2px', borderRadius: '6px' }}>
                        Search
                    </Button>
                </div>
            </div>
        </div>


    );
}

export default SearchBar;
