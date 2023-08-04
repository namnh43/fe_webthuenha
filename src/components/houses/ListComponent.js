import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import BathtubIcon from "@mui/icons-material/Bathtub";
import React from "react";
import {useNavigate} from "react-router";
import "./listHouse.css"
export function ListComponent({listHouse}) {
    const navigate = useNavigate();
    return (
        <>
            {listHouse.map((item) => {
                return (
                    <>
                        <div className="col-md-6 col-lg-3 mb-3 mt-2 card-container"
                             onClick={() => {
                                 const url = 'houses/' + item.id;
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
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    <b className='text-capitalize'>{item.name}</b>
                                                </div>
                                                <div><span style={{ fontSize: 'medium' }}><StarIcon style={{paddingBottom: '3px', fontSize: '19px'}} fontSize="inherit" />{item.ratingScore}</span>
                                                </div>
                                            </div>
                                        </Typography>
                                        <div>
                                            <div>
                                                <span style={{position: 'relative', right: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} className="property-location d-block"><LocationOnIcon style={{fontSize:'19px', paddingBottom:'3px'}} color="error"/>{item.address}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px'}}>
                                                            <span>
                                                                <LocalHotelRoundedIcon fontSize="small" style={{paddingBottom:'3px'}}/>{item.totalBedrooms} &nbsp;
                                                                <BathtubIcon fontSize="small" style={{paddingBottom:'3px'}}/>{item.totalBathrooms}
                                                            </span>
                                                <span
                                                    className="property-price text-primary text-success"><b>${item.price}</b></span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </>
                );
            })}
        </>
    )
}