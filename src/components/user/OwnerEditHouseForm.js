import React, { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router";
import UploadImageField from "../upload";

function OwnerEditHouseForm() {
    const houseId = useParams().houseId;

    const [editedHouse, setEditedHouse] = useState(null);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios
            .get(`http://localhost:8080/house/${houseId}`, config)
            .then((res) => {
                setEditedHouse(res.data);
                setBedrooms(res.data.totalBedrooms);
                setBathrooms(res.data.totalBathrooms);
            });
    }, [houseId]);

    function handleBedroomsRangeChange(event) {
        setBedrooms(event.target.value);
    }

    function handleBathroomsRangeChange(event) {
        setBathrooms(event.target.value);
    }

    const handleSubmit = (values, { setSubmitting }) => {
        setIsSubmitting(true);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        values = { ...values, ...{ images:values.images } };
        values = {
            ...values,
            ...{ user: { id: JSON.parse(localStorage.getItem("currentUser")).id } },
        };

        console.log(values);

        axios
            .put(
                `http://localhost:8080/house/${houseId}/update`,
                { ...editedHouse, ...values },
                config
            )
            .then((response) => {
                alert("House updated successfully!");
                console.log("House updated successfully:", response.data);

                setEditedHouse({ ...editedHouse, ...values });

                setIsSubmitting(false);
                setSubmitting(false);
            })
            .catch((error) => {
                console.error("Error updating house:", error);

                setIsSubmitting(false);
                setSubmitting(false);
            });
    };

    return (
        <>
            {editedHouse !== null && (
                <Formik
                    initialValues={{
                        name: editedHouse.name,
                        address: editedHouse.address,
                        totalBedrooms: bedrooms,
                        totalBathrooms: bathrooms,
                        description: editedHouse.description,
                        price: editedHouse.price,
                        images: editedHouse.images.map(image => image.url),
                    }}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <h1>Edit house</h1>
                            <div className="form-group">
                                <label>House Name</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter house name..."
                                />
                                <small className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Address..."
                                />
                                <small className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Number of bedrooms</label>
                                <Field
                                    type="range"
                                    name="totalBedrooms"
                                    min="1"
                                    max="10"
                                    value={bedrooms}
                                    className="form-control-range col-6 p-0"
                                    onChange={handleBedroomsRangeChange}
                                />
                                <output>{bedrooms}</output>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Number of bathrooms</label>
                                <Field
                                    type="range"
                                    name="totalBathrooms"
                                    min="1"
                                    max="10"
                                    value={bathrooms}
                                    className="form-control-range col-6 p-0"
                                    onChange={handleBathroomsRangeChange}
                                />
                                <output>{bathrooms}</output>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Descriptions</label>
                                <Field
                                    component="textarea"
                                    className="form-control"
                                    placeholder="Leave descriptions here..."
                                    name="description"
                                    style={{ height: "100px" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price (Dollars/night)</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="price"
                                    placeholder="Price..."
                                />
                                <small className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div>
                                <label className="form-label">Your photos</label>
                                <Field
                                    name="images"
                                    as={UploadImageField}
                                    images={editedHouse.images || []}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary mt-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}

export default OwnerEditHouseForm;
