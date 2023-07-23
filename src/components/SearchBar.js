import React, { useState } from 'react';
import './searchBar.css';
import axios from "axios";

function SearchBar() {
    const [address, setAddress] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000000);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
    const handleSearch = () => {
        axios.get(`http://localhost:8080/house/search?address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}&totalBedrooms=${bedrooms}&totalBathrooms=${bathrooms}`, config)
            .then((res) => console.log(res.data))
    };

    return (
        <section className="search-sec" style={{width: 'fit-content', margin: '20px auto'}}>
            <div className="container">
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
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <div style={{width: 'fit-content', margin: 'auto'}}>
                                <button style={{width: '400px'}} type="button" className="btn btn-danger wrn-btn" onClick={handleSearch}>
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
