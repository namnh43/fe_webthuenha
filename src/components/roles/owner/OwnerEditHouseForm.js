import React, { useEffect, useState } from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router";
import UploadImageField from "../../upload";
import Swal from "sweetalert2";
import Constants from "../../../utils/constants";

function OwnerEditHouseForm() {
    const navigate = useNavigate();
    const houseId = useParams().houseId;

    const [editedHouse, setEditedHouse] = useState(null);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [submittedValues, setSubmittedValues] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios
            .get(Constants.BASE_API+`/house/${houseId}`, config)
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

    const handleSubmit = (values) => {

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
                Constants.BASE_API+`/house/${houseId}`,
                { ...editedHouse, ...values },
                config
            )
            .then((response) => {
                Swal.fire({
                    title: "Success",
                    text: "House added successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                console.log("House updated successfully:", response.data);

                setEditedHouse({...editedHouse, ...values});
                navigate('/owner')
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong, please try again later",
                    icon: "error",
                    confirmButtonText: "OK",
                })

            })
            .finally(() => {
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
                    onSubmit={(values)=> setSubmittedValues(values)}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <h2 className={'my-3'}>Edit house</h2>
                            <div className="d-flex">
                                <div className="col-6 p-0">
                                    <div className="form-group" style={{height: 72}}>
                                        <label>House Name</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Enter house name..."
                                        />
                                    </div>
                                    <div className="form-group" style={{height: 72}}>
                                        <label>Address</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="Address..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="formControlRange">Descriptions</label>
                                        <Field
                                            component="textarea"
                                            className="form-control"
                                            placeholder="Leave descriptions here..."
                                            name="description"
                                            style={{height: '120px'}}
                                        />
                                    </div>
                                </div>

                                <div className="col-5 pl-5">
                                    <div className="form-group">
                                        <label htmlFor="formControlRange">Number of bedrooms</label>
                                        <Field as="select" name="totalBedrooms" value={bedrooms}
                                               onChange={handleBedroomsRangeChange} className="form-control">
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="formControlRange">Number of bathrooms</label>
                                        <Field as="select" name="totalBathrooms" value={bathrooms}
                                               onChange={handleBathroomsRangeChange} className="form-control">
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <label>Price (Dollars/night)</label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            placeholder="Price..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Your photos</label>
                                <Field
                                    name="images"
                                    as={UploadImageField}
                                    values={submittedValues}
                                    images={editedHouse.images || []}
                                    handleFormSubmit={handleSubmit}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary mt-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Save"}
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}

export default OwnerEditHouseForm;
