import React, { useState } from 'react';
import StarIcon from "@mui/icons-material/Star";
import HideSourceIcon from '@mui/icons-material/HideSource';
import axios from "axios";
import Swal from "sweetalert2";
import Constants from "../../utils/constants";
import {formatDate} from "../../utils/api";

const Reviews = ({ house }) => {
    const step = 2;
    const [displayedReviews, setDisplayedReviews] = useState(step);
    const [expandedReviewId, setExpandedReviewId] = useState(null);
    const [hiddenReviews, setHiddenReviews] = useState([]); // Thêm state lưu danh sách review đã ẩn
    const currentUserId = localStorage.getItem('currentUserId');
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    const handleSeeMore = (reviewId) => {
        setExpandedReviewId(reviewId);
    };

    const handleUnSeeMore = () => {
        setExpandedReviewId(null);
    };

    const getTruncatedContent = (content, reviewId) => {
        if (expandedReviewId === reviewId) {
            return content;
        }
        return content.slice(0, 300);
    };

    const handleHideReview = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure to hide this review?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, hide it!'
        });

        if (result.isConfirmed) {
            axios.patch(Constants.BASE_API+`/review/${id}/hide`, null, config)
                .then((res) => {
                    console.log(res);
                    setHiddenReviews((prevHiddenReviews) => [...prevHiddenReviews, id]); // Thêm review đã ẩn vào danh sách
                }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                })
            });
        }
    }

    return (
        <div className="row mb-3">
            <div className="col-12">
                <h4 className={"fw-bold"}>Reviews</h4>
                <StarIcon fontSize="small" className="pb-1"/>
                {house.ratingScore} {" - " + house.numberOfReviews + " reviews"}
                <br/><br />

                <div className="row" style={{ marginLeft: '20px', marginRight: '30px' }}>
                    {house.reviews &&
                        house.reviews
                            .filter((review) => review.reviewStatus === "APPROVED" && !hiddenReviews.includes(review.id)) // Lọc chỉ các review có reviewStatus là "APPROVED" và không nằm trong danh sách đã ẩn
                            .slice(0, displayedReviews)
                            .map((review) => (
                                <div
                                    key={review.id}
                                    className="col-md-6 mb-4 pl-5"
                                    style={{ paddingLeft: '20px', paddingRight: '20px' }}
                                >
                                    <div className="media">
                                        {(currentUserId == house.user.id) && (
                                            <button
                                                style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "20px",
                                                    width: "fit-content",
                                                    height: "20px",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: "white"
                                                }}
                                                className="remove-button"
                                                type="button"
                                                onClick={() => handleHideReview(review.id)}
                                            >
                                                <HideSourceIcon style={{ color: "red", fontSize: "18px" }} />
                                            </button>
                                        )}
                                        <img
                                            src={review.user.profileImage}
                                            alt="User Avatar"
                                            className="mr-3"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                marginTop: '10px'
                                            }}
                                        />
                                        <div className="media-body">
                                            <h5 className="mt-0 mb-1"><b>{review.user.username}</b></h5>
                                            <span style={{ fontSize: '13px' }}>{formatDate(review.createdAt)}</span>
                                            <br />
                                            <span>
                        {[...Array(5)].map((_, index) => (
                            <StarIcon
                                key={index}
                                fontSize="small"
                                style={{
                                    color: index < review.rating ? 'gold' : 'grey'
                                }}
                            />
                        ))}
                      </span>

                                        </div>
                                    </div>
                                    <p style={{
                                        textAlign: 'justify',
                                        textJustify: 'inter-word'
                                    }}>
                                        {getTruncatedContent(review.content, review.id)}
                                        {!expandedReviewId && review.content.length > 300 && (
                                            <button
                                                className="btn-link"
                                                style={{ textDecoration: "none", backgroundColor: "white" }}
                                                onClick={() => handleSeeMore(review.id)}
                                            >
                                                <b>&nbsp;...</b>
                                            </button>
                                        )}
                                        {expandedReviewId === review.id && (
                                            <button
                                                className="btn-link"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "red",
                                                    backgroundColor: "white"
                                                }}
                                                onClick={handleUnSeeMore}
                                            >
                                                <b>&nbsp;x</b>
                                            </button>
                                        )}
                                    </p>
                                </div>
                            ))}
                </div>

                <div style={{ width: 'fit-content', margin: 'auto' }}>
                    {house.reviews && house.reviews.length > displayedReviews && (
                        <button onClick={() => setDisplayedReviews((prev) => prev + step)}
                                className="btn btn-primary mr-3">See More</button>
                    )}

                    {displayedReviews > step && (
                        <button onClick={() => setDisplayedReviews(step)}
                                className="btn btn-success">Hide</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
