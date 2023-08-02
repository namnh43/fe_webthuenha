import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from "@mui/icons-material/LocationOn";
export function HouseList() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/house`, {}).then(res => {
            setList(res.data)
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
    const top4House = list
        .sort((a, b) => b.numberOfRented - a.numberOfRented)
        .slice(0, 4);

    return (
        <>
            <div className="site-section site-section-sm bg-light">
                <div className="container">
                    <div className="row mb-5">
                        <h1>Top Visited</h1>
                        {top4House.map((item) => {
                            return (
                                <>
                                    <div className="col-md-6 col-lg-3 mb-4"
                                         onClick={() => {
                                             const url = 'houses/' + item.id + '/detail';
                                             navigate(url)
                                         }}>
                                        <Card sx={{borderRadius:'6px'}}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={item.images.length > 0 ? item.images[0].fileUrl
                                                        : "https://firebasestorage.googleapis.com/v0/b/casemd4-3a742.appspot.com/o/images%2Fstarbucks.jpg?alt=media&token=543189a3-7d56-4647-a834-8d05d6f69969"}
                                                    alt="house image"
                                                />
                                                <CardContent style={{padding:'8px'}}>
                                                    <Typography gutterBottom variant="h6" component="div" style={{ lineHeight: '1', marginBottom: '1px'}}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div className="text-capitalize">{item.name}</div>
                                                            <div><span style={{ fontSize: 'medium'}}><StarIcon style={{paddingBottom:'3px', fontSize:'19px'}} fontSize="inherit" />{item.ratingScore}</span></div>
                                                        </div>
                                                    </Typography>
                                                    <div>
                                                        <div>
                                                            <span style={{position: 'relative', right: '3px'}} className="property-location d-block"><LocationOnIcon style={{fontSize:'19px'}} color="primary"/>{item.address}</span>
                                                        </div>
                                                        <div>
                                                            <strong
                                                                className="property-price text-primary d-block text-success">${item.price}</strong>/night
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </>
                            );
                        })}
                        <h1>Popular Houses</h1>
                        {list.map((item) => {
                            return (
                                <>
                                    <div className="col-md-6 col-lg-3 mb-3"
                                         onClick={() => {
                                             const url = 'houses/' + item.id + '/detail';
                                             navigate(url)
                                         }}>
                                        <Card sx={{borderRadius:'6px'}}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={item.images.length > 0 ? item.images[0].fileUrl
                                                        : "https://firebasestorage.googleapis.com/v0/b/casemd4-3a742.appspot.com/o/images%2Fstarbucks.jpg?alt=media&token=543189a3-7d56-4647-a834-8d05d6f69969"}
                                                    alt="house image"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div className="text-capitalize">{item.name}</div>
                                                            <div><span style={{ fontSize: 'medium' }}><StarIcon style={{paddingBottom:'3px', fontSize:'19px'}} fontSize="inherit" />{item.ratingScore}</span></div>
                                                        </div>
                                                    </Typography>
                                                    <div>
                                                        <div>
                                                            <span style={{position: 'relative', right: '3px'}} className="property-location d-block"><LocationOnIcon style={{fontSize:'19px'}} color="primary"/>{item.address}</span>
                                                        </div>
                                                        <div>
                                                            <strong
                                                                className="property-price text-primary d-block text-success">${item.price}</strong>
                                                        </div>
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
        </>
    )
}