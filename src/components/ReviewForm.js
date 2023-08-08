import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import axios from "axios";
import {useNavigate} from "react-router";
import Swal from "sweetalert2";
import Constants from "../utils/constants";

const ReviewForm = ({ bookingId, onClose, refreshBookingList }) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    let navigator = useNavigate();

    const handleSubmit = () => {
        console.log(`Booking ID: ${bookingId}`);
        console.log(`Rating: ${rating}\nReview: ${content}`);
        if (!bookingId || !rating || !content) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please fill all fields to review!',
            })
            return;
        }
        let data = {
            rating: rating,
            content: content
        }
        axios.post(Constants.BASE_API+`/review/bookings/${bookingId}`, data, config)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Review submitted!',
                    showConfirmButton: false,
                    timer: 1500
                })
                refreshBookingList();
                onClose();
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                })
            })};

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h3 className="mb-4">Your Review</h3>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={50}
                        activeColor="#ffd700"
                    />
                    <div className="form-group">
                        <textarea
                            className="form-control mt-2"
                            placeholder="Write a review"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit Review
                    </button>
                    <button className="btn btn-danger ml-2" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
