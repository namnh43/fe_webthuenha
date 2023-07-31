import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router";

export function SearchHouseResult() {
    const [listSearch, setListSearch] = useState([]);
    const navigate = useNavigate();
    const searchQuery = useSelector((state) => {
        console.log(state.search.searchQuery)
        return state.search.searchQuery;
    });
    useEffect(() => {
        axios.get(`http://localhost:8080/house/search?address=${searchQuery.address}&minPrice=${searchQuery.minPrice}&maxPrice=${searchQuery.maxPrice}&totalBedrooms=${searchQuery.bedrooms}&totalBathrooms=${searchQuery.bathrooms}&startDate=${searchQuery.startDate}&endDate=${searchQuery.endDate}`)
            .then((res) => {
                if (res.data.length == 0) alert("Not Found Any House")
                setListSearch(res.data)
            })
    },[searchQuery])
    return (
        <>
            {listSearch.length <= 0 ? <h3>Not found results</h3> :
                <div className="bg-light pt-3">
                    {/*<h3 className='mb-2'>Search Result</h3>*/}
                    <div className="container">
                        <div className="row mb-5">
                            {listSearch.map((item) => {
                                return (
                                    <>
                                        <div className="col-md-6 col-lg-4 mb-4">
                                            <Card
                                                onClick={() => {
                                                    const url = '/houses/' + item.id + '/detail';
                                                    navigate(url)
                                                }}
                                            >
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="300"
                                                        image={item.images.length > 0 ? item.images[0].fileUrl
                                                            : "https://firebasestorage.googleapis.com/v0/b/casemd4-3a742.appspot.com/o/images%2Fstarbucks.jpg?alt=media&token=543189a3-7d56-4647-a834-8d05d6f69969"}
                                                        alt="house image"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            <div className="text-capitalize">{item.name}</div>
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                                            species, ranging across all continents except Antarctica
                                                        </Typography>
                                                        <div className="p-4 property-body">
                                                            <div className="row">
                                                                <div className="col">
                                                                <span className="property-location d-block mb-3"><span
                                                                    className="property-icon icon-room"></span> {item.address}</span>
                                                                </div>
                                                                <div className="col text-right">
                                                                    <strong
                                                                        className="property-price text-primary mb-3 d-block text-success">${item.price}</strong>
                                                                </div>
                                                            </div>
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
                                                            </ul>
                                                        </div>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}