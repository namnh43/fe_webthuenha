import React, {useEffect, useState} from 'react';
import './searchBar.css';
import axios from "axios";
import {Link} from "react-router-dom";
import DateRangePickerComponent from "../datetime/DateRangePickerComponent";
import {useDispatch, useSelector} from "react-redux";
import {searchAction} from "../redux/searchSlice";
import {useNavigate} from "react-router";

function SearchBar() {
    const [address, setAddress] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000000);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [selectedRange, setSelectedRange] = useState(['2023-01-01','2023-01-01']);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        dispatch(searchAction({bathrooms:bathrooms,bedrooms:bedrooms,address:address,minPrice:minPrice,maxPrice:maxPrice,startDate:selectedRange[0],endDate:selectedRange[1]}))
        navigate("/houses/search")
    }

    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length === 2)
            setSelectedRange([ranges[0].toLocaleDateString('en-CA'),ranges[1].toLocaleDateString('en-CA')]);
        else
            setSelectedRange(['2023-01-01','2023-01-01'])
    };
    useEffect(() => {
        selectedRange.map((item) => {
            console.log(item) //for testting
        })
    },[selectedRange])

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
    // const handleSearch = () => {
    //     console.log(bathrooms, bedrooms, address, minPrice, maxPrice,selectedRange);
    //     axios.get(`http://localhost:8080/house/search?address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}&totalBedrooms=${bedrooms}&totalBathrooms=${bathrooms}&startDate=${selectedRange[0]}&endDate=${selectedRange[1]}`, config)
    //         .then((res) => {
    //             if (res.data.length == 0) alert("Not Found Any House")
    //             setListSearch(res.data)
    //         })
    // };

    return (
        <section className="search-sec">
            <div className="container"  style={{width: 'fit-content', margin: '20px auto'}}>
                <table>
                    <tbody>
                    <tr>
                        <th style={{paddingRight: '150px'}}><label htmlFor="location">Location</label>
                        </th>
                        <th>
                            <label htmlFor="minPrice">Min Price</label>
                        </th>
                        <th>
                            <label htmlFor="maxPrice">Max Price</label>
                        </th>
                        <th>
                            <label htmlFor="bathrooms">Pick time</label>
                        </th>
                        <th>
                            <label htmlFor="bedrooms">Bedrooms</label>
                        </th>
                        <th>
                            <label htmlFor="bathrooms">Bathrooms</label>
                        </th>

                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control search-slt"
                                id="location"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter the location"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                className="form-control search-slt"
                                id="minPrice"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="Min Price"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                className="form-control search-slt"
                                id="maxPrice"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="Max Price"
                            />
                        </td>
                        <td>
                            <DateRangePickerComponent
                                onChange={handleDateRangeChange} />
                        </td>
                        <td>
                            <select
                                className="form-control search-slt"
                                id="bedrooms"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                            >
                                <option value={0}>Select</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </td>
                        <td>
                            <select
                                className="form-control search-slt"
                                id="bathrooms"
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                            >
                                <option value={0}>Select</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <td colSpan='5'>
                            <div style={{width: 'fit-content', margin: 'auto'}}>
                                <button style={{width: '400px'}} type="button" className="btn btn-primary wrn-btn"
                                        onClick={handleInputChange}>
                                    Search
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default SearchBar;
