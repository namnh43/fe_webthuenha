import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import UploadImageField from "./upload";

function OwnerAddHouseForm() {


    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);

    function handleBedroomsRangeChange(event) {
        setBedrooms(event.target.value);
    }

    function handleBathroomsRangeChange(event) {
        setBathrooms(event.target.value);
    }


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
                enableReinitialize={true}
                onSubmit={values => {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                    console.log(values);
                    axios.post(`http://localhost:8080/house/create/${JSON.parse(localStorage.getItem('currentUser')).id}`,
                        values,
                        config)
                }}
            >
                <Form>
                    <h1>Add a new house</h1>
                    <div className="form-group">
                        <label>House Name</label>
                        <Field type="text" className="form-control" name="name"
                               placeholder="Enter house name..."/>
                        <small className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <Field type="text" className="form-control" name="address"
                               placeholder="Address..."/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Number of bedrooms</label>
                        <Field type="range" name="totalBedrooms" min="1" max="10"
                               value={bedrooms} className="form-control-range col-6 p-0"
                               onChange={handleBedroomsRangeChange}/>
                        <output>{bedrooms}</output>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Number of bathrooms</label>
                        <Field type="range" name="totalBathrooms" min="1" max="10"
                               value={bathrooms} className="form-control-range col-6 p-0"
                               onChange={handleBathroomsRangeChange}/>
                        <output>{bathrooms}</output>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Descriptions</label>
                        <Field component="textarea" className="form-control"
                               placeholder="Leave descriptions here..." name="description"
                               style={{height: '100px'}}/>
                    </div>
                    <div className="form-group">
                        <label>Price (Dollars/night)</label>
                        <Field type="text" className="form-control" name="price" placeholder="Price..."/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div>
                        <label className="form-label">Upload your photos</label>
                        <Field name="images" as={UploadImageField} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </Form>
            </Formik>
        </>
    );
}

export default OwnerAddHouseForm;