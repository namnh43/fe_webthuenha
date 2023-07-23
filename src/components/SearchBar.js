import React, {useState} from 'react';
import './searchBar.css';
import axios from "axios";

function SearchBar() {
    const [address, setAddress] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [listSearch, setListSearch] = useState([]);

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
    const handleSearch = () => {
        axios.get(`http://localhost:8080/house/search?address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}&totalBedrooms=${bedrooms}&totalBathrooms=${bathrooms}`, config)
            .then((res) => setListSearch(res.data))
    };

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
                                <button style={{width: '400px'}} type="button" className="btn btn-danger wrn-btn"
                                        onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>

                </table>

            </div>

            {listSearch.length > 0 &&
                <div className="site-section site-section-sm bg-light">
                    <h1>Search Result</h1>
                    <div className="container">
                        <div className="row mb-5">
                            {listSearch.map((item) => {
                                return (
                                    <>
                                        <div className="col-md-6 col-lg-4 mb-4">
                                            <div className="property-entry h-100">
                                                <a href="property-details" className="property-thumbnail">
                                                    <div className="offer-type-wrap">
                                                        <span className="offer-type bg-success">Rent</span>
                                                    </div>
                                                    <img
                                                        src={item.images.length > 0 ? item.images[0].fileUrl : "https://firebasestorage.googleapis.com/v0/b/casemd4-3a742.appspot.com/o/images%2Fstarbucks.jpg?alt=media&token=543189a3-7d56-4647-a834-8d05d6f69969"}
                                                        alt="Image" className="img-fluid"/>
                                                </a>
                                                <div className="p-4 property-body">
                                                    <a href="#" className="property-favorite"><span
                                                        className="icon-heart-o"></span></a>
                                                    <h2 className="property-title"><a
                                                        href="property-details.html">{item.name}</a>
                                                    </h2>
                                                    <span className="property-location d-block mb-3"><span
                                                        className="property-icon icon-room"></span> {item.address}</span>
                                                    <strong
                                                        className="property-price text-primary mb-3 d-block text-success">${item.price}</strong>
                                                    <ul className="property-specs-wrap mb-3 mb-lg-0">
                                                        <li>
                                                            <span className="property-specs">Beds</span>
                                                            <span className="property-specs-number">{item.totalBedrooms}
                                                                <sup>+</sup></span>

                                                        </li>
                                                        <li>
                                                            <span className="property-specs">Baths</span>
                                                            <span
                                                                className="property-specs-number">{item.totalBathrooms}</span>
                                                        </li>
                                                        <li>
                                                            <span className="property-specs">SQ FT</span>
                                                            <span className="property-specs-number">7,000</span>

                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}

export default SearchBar;
