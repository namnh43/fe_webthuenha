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
    // const searchQuery = useSelector((state) => {
    //     return state.search.searchQuery;
    // });

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        // dispatch(searchAction({address:address,minPrice:minPrice?minPrice:0,maxPrice:maxPrice?maxPrice:10000,startDate:selectedRange[0],endDate:selectedRange[1]}))
        const queryString = createQueryString({address:address,minprice:minPrice,maxprice:maxPrice,startdate:selectedRange[0],enddate:selectedRange[1]});
        console.log('query',queryString)
        navigate('/search?'+queryString)
    }

    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length === 2)
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'),ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(null)
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

    return (
        <section>
            <Grid container spacing={2}>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <div className="search-sec">
                        <table >
                            <tbody >
                            <tr>
                                <td colSpan={2}>
                                    <input
                                        type="text"
                                        className="form-control search-slt"
                                        id="location"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Location"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control search-slt"
                                        id="minPrice"
                                        min="0"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="Min Price($)"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control search-slt"
                                        id="maxPrice"
                                        min="0"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Max Price($)"
                                    />
                                </td>
                                <td>
                                        <DateRangePickerComponent onChange={handleDateRangeChange} inputRange={selectedRange}/>
                                </td>
                                <td>
                                    <Button variant="outlined" startIcon={<SearchIcon />}
                                        onClick={handleInputChange}
                                    >
                                        Search
                                    </Button>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>

                </Grid>
            </Grid>
        </section>
    );
}

export default SearchBar;
