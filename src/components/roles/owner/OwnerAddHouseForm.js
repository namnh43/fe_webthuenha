import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import UploadImageField from "../../upload";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import Constants from "../../../utils/constants";

const HouseSchema = Yup.object().shape({
    name: Yup.string().required('* Required'),
    price: Yup.number()
        .min(0, '* Price must be greater than 0')
        .max(1000000000, '* Too high price')
        .required('* Required')
});

function OwnerAddHouseForm() {

    const navigation = useNavigate();

    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);
    const [houseName, setHouseName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState([]);

    const [submittedValues, setSubmittedValues] = useState(null);

    function handleBedroomsRangeChange(event) {
        setBedrooms(event.target.value);
    }

    function handleBathroomsRangeChange(event) {
        setBathrooms(event.target.value);
    }

    function handleHouseNameChange(event) {
        setHouseName(event.target.value);
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handlePriceChange(event) {
        setPrice(event.target.value);
    }

    const handleFormSubmit = (values) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        axios
            .post(
                `${Constants.BASE_API}/house`,
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
                    name: houseName,
                    address: address,
                    totalBedrooms: bedrooms,
                    totalBathrooms: bathrooms,
                    description: description,
                    price: price,
                    images: image,
                }}
                validationSchema={HouseSchema}
                enableReinitialize={true}
                onSubmit={(values) => setSubmittedValues(values)}
            >
                {({isSubmitting, values, errors, touched}) => (
                    <Form>
                        <h2>Add a new house</h2>
                        <div className="d-flex">
                            <div className="col-6 p-0">
                                <div className="form-group" style={{height: 72}}>
                                    <label htmlFor={'houseName'}>House Name <span className={'text-danger'}>*</span></label>
                                    <Field type="text" className="form-control" id={'houseName'} name="name"
                                           value={houseName} onChange={handleHouseNameChange}
                                           placeholder="Enter house name..."/>
                                    {errors.name && touched.name ? (
                                        <small className="form-text text-danger">{errors.name}</small>
                                    ) : null}
                                </div>
                                <div className="form-group h-8" style={{height: 72}}>
                                    <label htmlFor={'house-address'}>Address</label>
                                    <Field type="text" className="form-control" id={'house-address'} name="address"
                                           value={address} onChange={handleAddressChange}
                                           placeholder="Address..."/>
                                    {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone*/}
                                    {/*    else.</small>*/}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formControlRange">Descriptions</label>
                                    <Field component="textarea" className="form-control"
                                           placeholder="Leave descriptions here..." name="description"
                                           value={description} onChange={handleDescriptionChange}
                                           style={{height: '120px'}}/>
                                </div>
                            </div>

                            <div className="col-5 pl-5">
                                <div className="form-group">
                                    <label htmlFor="formControlRange">Number of bedrooms</label>
                                    <Field component="select" name="totalBedrooms" value={bedrooms}
                                           className="form-control" onChange={handleBedroomsRangeChange}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Field>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formControlRange">Number of bathrooms</label>
                                    <Field component="select" name="totalBedrooms" value={bathrooms}
                                           className="form-control" onChange={handleBathroomsRangeChange}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Field>
                                </div>

                                <div className="form-group">
                                    <label>Price (Dollars/night) <span className={'text-danger'}>*</span></label>
                                    <Field type="text" className="form-control" name="price" placeholder="Price..."
                                           value={price} onChange={handlePriceChange}/>
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
                            disabled={isSubmitting || Object.keys(errors).length > 0}
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