import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import UploadImageField from "./upload";
import {useNavigate} from "react-router";
import * as Yup from "yup";

const HouseSchema = Yup.object().shape({
    price: Yup.number()
        .min(0, '* Price must be greater than 0')
        .max(1000000000, '* Too high price')
        .required('* Required')
});
function OwnerAddHouseForm() {

    const navigation = useNavigate();

    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);
    const [submittedValues, setSubmittedValues] = useState(null);

    function handleBedroomsRangeChange(event) {
        setBedrooms(event.target.value);
    }

    function handleBathroomsRangeChange(event) {
        setBathrooms(event.target.value);
    }

    const handleFormSubmit = (values) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        axios
            .post(
                `http://localhost:8080/house`,
                values,
                config
            )
            .then((res) => {
                alert("Added House");
                navigation("/owner");
            })
            .finally(() => {
            });
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                    totalBedrooms: bedrooms,
                    totalBathrooms: bathrooms,
                    description: '',
                    price: '',
                    images: [],
                }}
                validationSchema={HouseSchema}
                enableReinitialize={true}
                onSubmit={(values)=> setSubmittedValues(values)}
            >
                {({ isSubmitting, values, errors, touched }) => (
                <Form>
                    <h1>Add a new house</h1>
                    <div className="d-flex">
                        <div className="col-6 p-0">
                            <div className="form-group" style={{height: 72}}>
                                <label>House Name</label>
                                <Field type="text" className="form-control" name="name"
                                       placeholder="Enter house name..."/>
                                {/*<small className="form-text text-muted">We'll never share your email with anyone*/}
                                {/*    else.</small>*/}
                            </div>
                            <div className="form-group h-8"  style={{height: 72}}>
                                <label>Address</label>
                                <Field type="text" className="form-control" name="address"
                                       placeholder="Address..."/>
                                {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone*/}
                                {/*    else.</small>*/}
                            </div>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Descriptions</label>
                                <Field component="textarea" className="form-control"
                                       placeholder="Leave descriptions here..." name="description"
                                       style={{height: '120px'}}/>
                            </div>
                        </div>

                        <div className="col-5 pl-5">
                            <div className="form-group">
                                <label htmlFor="formControlRange">Number of bedrooms</label>
                                <Field type="range" name="totalBedrooms" min="1" max="10"
                                       value={bedrooms} className="form-control-range p-0"
                                       onChange={handleBedroomsRangeChange}/>
                                <output>{bedrooms}</output>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Number of bathrooms</label>
                                <Field type="range" name="totalBathrooms" min="1" max="10"
                                       value={bathrooms} className="form-control-range p-0"
                                       onChange={handleBathroomsRangeChange}/>
                                <output>{bathrooms}</output>
                            </div>

                            <div className="form-group">
                                <label>Price (Dollars/night)</label>
                                <Field type="text" className="form-control" name="price" placeholder="Price..."/>
                                {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone*/}
                                {/*    else.</small>*/}
                                {errors.price && touched.price ? (
                                    <div style={{color: "red", fontSize: 'small'}}>{errors.price}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="form-group mr-3">
                            <label className="form-label">Upload your photos</label>
                            <Field
                                name="images"
                                as={UploadImageField}
                                values={submittedValues}
                                images={values.images}
                                handleFormSubmit={handleFormSubmit}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{alignSelf: 'right'}}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Add New House"}
                    </button>
                </Form>
                )}
            </Formik>
        </>
    );
}

export default OwnerAddHouseForm;