import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';

const ReviewForm = ({ bookingId, onClose }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        console.log(`Booking ID: ${bookingId}`);
        console.log(`Rating: ${rating}\nReview: ${review}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h3 className="mb-4">Write Your Review</h3>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={50}
                        activeColor="#ffd700"
                    />
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Write a review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
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
