import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import {storage} from "../firebase";
import {v4} from "uuid";


function OwnerAddHouseForm() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        console.log('hoho')
        if (imageUpload == null) return;
        console.log('hihi')
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);

    function handleBedroomsRangeChange(event) {
        setBedrooms(event.target.value);
    }

    function handleBathroomsRangeChange(event) {
        setBathrooms(event.target.value);
    }

    useEffect(() => {
        console.log(imageUpload)
    }, [imageUpload])

    useEffect(() => {
        console.log(imageUrls)
    }, [imageUrls])


    return (
        <>
            <Formik
                initialValues={{
                    houseName: '',
                    address: '',
                    numberOfBedrooms: 2,
                    numberOfBathrooms: 1,
                    descriptions: '',
                    price: '',
                    photos: '',
                }}
                enableReinitialize={true}
                onSubmit={values => {
                    uploadFile()
                    console.log(values)
                }}
            >
                <Form>
                    <h1>Add a new house</h1>
                    <div className="form-group">
                        <label>House Name</label>
                        <Field type="text" className="form-control" name="houseName"
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
                        <label className="col-2">Number of bedrooms</label>
                        <Field type="range" className="col-5" value={bedrooms} name="numberOfBedrooms" min="1" max="10"
                               onInput={handleBedroomsRangeChange}/>
                        <output>{bedrooms}</output>
                    </div>
                    <div className="form-group">
                        <label className="col-2">Number of bathrooms</label>
                        <Field type="range" className="col-5" value={bathrooms} name="numberOfBathrooms" min="1" max="5"
                               onInput={handleBathroomsRangeChange}/>
                        <output>{bathrooms}</output>
                    </div>
                    <div className="form-group">
                        <label className="col-2">Descriptions</label>
                        <Field className="form-control" placeholder="Leave descriptions here..." name="descriptions"
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
                        <input type="file" multiple required onChange={(event) => {

                            setImageUpload(event.target.files[0])

                            console.log('haha');
                            uploadFile()
                            listAll(imagesListRef).then((response) => {
                                response.items.forEach((item) => {
                                    getDownloadURL(item).then((url) => {
                                        setImageUrls((prev) => [...prev, url]);
                                    });
                                });
                            });
                        }}/>
                        <Field type="text" className="form-control" name="photos" value={JSON.stringify(imageUrls)}/>
                        <br/>
                        {imageUrls.map((url) => {
                            return <img src={url}/>;
                        })}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Formik>

            {/*<div>*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        onChange={(event) => {*/}
            {/*            setImageUpload(event.target.files[0]);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <button onClick={uploadFile}> Upload Image</button>*/}
            {/*    {imageUrls.map((url) => {*/}
            {/*        return <img src={url} />;*/}
            {/*    })}*/}
            {/*</div>*/}
        </>
    );
}

export default OwnerAddHouseForm;