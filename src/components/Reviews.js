import React, {useState} from 'react';
import StarIcon from "@mui/icons-material/Star";
import HideSourceIcon from '@mui/icons-material/HideSource';
import axios from "axios";
import Swal from "sweetalert2";

const Reviews = ({house}) => {
    const step = 2;
    const [displayedReviews, setDisplayedReviews] = useState(step);
    const [expandedReviewId, setExpandedReviewId] = useState(null);
    let currentUserId = localStorage.getItem('currentUserId');
    const handleSeeMore = (reviewId) => {
        setExpandedReviewId(reviewId);
    };

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    const handleUnSeeMore = () => {
        setExpandedReviewId(null);
    };

    const getTruncatedContent = (content, reviewId) => {
        if (expandedReviewId === reviewId) {
            return content;
        }
        return content.slice(0, 300);
    };

    function handleHideReview(id) {
        axios.patch(`http://localhost:8080/review/${id}/hide`, null, config)
            .then((res) => {

            })
    }

    return (
        <div className="row">
            <div className="col-12">
                <h2>Reviews</h2>
                <StarIcon fontSize="small"/>
                {house.ratingScore + " - " + house.numberOfReviews + " reviews"}
                <br/><br/>

                <div className="row" style={{marginLeft: '40px', marginRight: '50px'}}>
                    {house.reviews && house.reviews.slice(0, displayedReviews).map((review) => (
                        <div key={review.id} className="col-md-6 mb-4">
                            <div className="media">
                                {(currentUserId == house.user.id) &&
                                <button
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "30px",
                                        width: "fit-content",
                                        height: "20px",
                                        border: "none",
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "7px",
                                    }}
                                    className="remove-button"
                                    type="button"
                                    onClick={() => handleHideReview(review.id)}
                                >
                                <HideSourceIcon style={{color: "red"}}/>
                                </button>}
                                <img src={review.user.profileImage} alt="User Avatar" className="mr-3"
                                     style={{width: '50px', height: '50px', borderRadius: '50%', marginTop: '10px'}}/>
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1">{review.user.username}</h5>
                                    <span style={{fontSize: '13px'}}>{review.createdAt}</span>
                                    <br/>
                                    <span>
                    {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} fontSize="small"
                                  style={{color: index < review.rating ? 'gold' : 'grey'}}/>
                    ))}
                  </span>
                                    <p>
                                        {getTruncatedContent(review.content, review.id)}
                                        {!expandedReviewId && review.content.length > 300 && (
                                            <button className="btn-link" style={{textDecoration: "none"}}
                                                    onClick={() => handleSeeMore(review.id)}><b>&nbsp;...</b></button>
                                        )}
                                        {expandedReviewId === review.id && (
                                            <button className="btn-link" style={{textDecoration: "none", color: "red"}}
                                                    onClick={handleUnSeeMore}><b>&nbsp;x</b></button>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{width: 'fit-content', margin: 'auto'}}>
                    {house.reviews && house.reviews.length > displayedReviews && (
                        <button onClick={() => setDisplayedReviews((prev) => prev + step)}
                                className="btn btn-outline-primary mr-3">See More</button>
                    )}

                    {displayedReviews > step && (
                        <button onClick={() => setDisplayedReviews(step)}
                                className="btn btn-outline-success">Hide</button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Reviews;
