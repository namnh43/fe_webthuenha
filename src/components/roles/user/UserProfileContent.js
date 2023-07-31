import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {initializeApp} from "firebase/app";
import {useNavigate} from "react-router";

export function UserProfile() {
    const navigator =  useNavigate();
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [showForm, setShowForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    const firebaseConfig = {
        apiKey: "AIzaSyBoTj1_SNijRYo4DGugLqnCKWOy2pF7hWk",
        authDomain: "casemd4-3a742.firebaseapp.com",
        projectId: "casemd4-3a742",
        storageBucket: "casemd4-3a742.appspot.com",
        messagingSenderId: "149528641745",
        appId: "1:149528641745:web:852427a18e21880305c5f0",
        measurementId: "G-HKY5QFR16C"
    };

    const storage = getStorage(initializeApp(firebaseConfig));

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    const [user, setUser] = useState({});
    useEffect(() => {
        setUser({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
            role: currentUser.role,
            password: currentUser.password,
            profileImage: currentUser.profileImage,
        });
    }, []);

    function changePassword() {
        setShowForm(!showForm);
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(file);
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    async function uploadFileToFirebase() {
        if (selectedFile) {
            try {
                const storageRef = ref(storage, "md6/" + selectedFile.name);
                const snapshot = await uploadBytes(storageRef, selectedFile);
                const downloadURL = await getDownloadURL(snapshot.ref);
                console.log("File uploaded successfully. Download URL:", downloadURL);
                return downloadURL;
            } catch (error) {
                throw error;
            }
        }
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div className="container emp-profile" style={{height: '700px'}}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img style={{width: "400px", border: "2px solid #ccc"}}
                                 src={selectedImage || user.profileImage}
                            />
                            <div>
                                <label htmlFor="fileInput" className="btn btn-success">Change Avatar</label>
                                <input type="file" id="fileInput" onChange={handleImageChange}/>
                            </div>
                            <button className="btn btn-warning" onClick={changePassword}>
                                Change password
                            </button>
                            <br/><br/>
                            <Formik initialValues={
                                {
                                    currentPassword: "",
                                    newPassword: "",
                                }
                            }
                                    onSubmit={(values) => {
                                        if (values.newPassword.length < 6) {
                                            alert("Password is too short");
                                            return;
                                        }
                                        if (values.newPassword.length > 32) {
                                            alert("Password is too long");
                                            return;
                                        }
                                        console.log(values)
                                        axios.post(`http://localhost:8080/user/change-password`, values, config).then((res) => {
                                            alert(res.data);
                                        }).catch((error) => {
                                            console.log(error)
                                        });
                                    }
                                    }
                                    enableReinitialize={true}>
                                {showForm && <Form>
                                    Current password
                                    <Field className="form-control" name={"currentPassword"}></Field><br/>
                                    New Password
                                    <Field className="form-control" name={"newPassword"}></Field><br/>
                                    <button className="btn btn-outline-primary">Update</button>
                                </Form>}
                            </Formik>
                        </div>
                    </div>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-4">
                        <div>
                            <Formik initialValues={
                                {
                                    firstName: currentUser.firstName,
                                    lastName: currentUser.lastName,
                                    email: currentUser.email,
                                    phoneNumber: currentUser.phoneNumber,
                                }
                            }
                                    onSubmit={(values) => {
                                        if (values.firstName === "" || values.lastName === "") {
                                            alert("name cannot empty")
                                            return
                                        }
                                        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(values.email)) {
                                            alert('Please enter a valid Gmail address');
                                            return;
                                        }
                                        if (!/^\d{10}$/.test(values.phoneNumber)) {
                                            alert('Please enter a valid 10-digit phone number');
                                        }
                                        uploadFileToFirebase().then((url) => {
                                            axios.put(`http://localhost:8080/user/current`, {
                                                ...values,
                                                profileImage: url
                                            }, config).then((res) => {
                                                localStorage.setItem("currentUser", JSON.stringify(res.data))
                                                alert("update success");
                                                navigator("/user");
                                            }).catch((error) => {
                                                if (error.response && error.response.status === 401) {
                                                    alert('email or phoneNumber already exist');
                                                } else {
                                                    console.error('Error occurred while posting result:', error);
                                                    alert('An error occurred. Please try again later.');
                                                }
                                            })
                                        } )
                                    }
                                    }
                                    enableReinitialize={true}>
                                <Form>
                                    UserName<br/>
                                    <input className="form-control" readOnly={true} value={currentUser.username}/><br/>
                                    FirstName<br/>
                                    <Field className="form-control" name={"firstName"}></Field><br/>
                                    LastName<br/>
                                    <Field className="form-control" name={"lastName"}></Field><br/>
                                    Email<br/>
                                    <Field className="form-control" name={"email"}></Field><br/>
                                    PhoneNumber<br/>
                                    <Field className="form-control" name={"phoneNumber"}></Field><br/>
                                    <button className="btn btn-primary">Update</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}