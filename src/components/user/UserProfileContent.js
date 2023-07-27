import React, {useEffect, useState} from "react";
import "./Profile.css";
import {Field, Form, Formik} from "formik";
import axios from "axios";

export function UserProfile() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [showForm, setShowForm] = useState(false);
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
    const [user, setUser] = useState({});
    useEffect(() => {
            setUser({
                firstName:currentUser.firstName,
                lastName:currentUser.lastName,
                email:currentUser.email,
                phoneNumber:currentUser.phoneNumber,
                role:currentUser.role,
                password:currentUser.password,
                profileImage:currentUser.profileImage
            });
    }, [])
    function changePassword(){
        setShowForm(!showForm);
    }
    return (
        <div>
            <h1>User Profile</h1>
            <div className="container emp-profile" style={{height:'700px'}}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img
                                    src={user.profileImage}
                                    alt=""
                                />
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" name="file" />
                                </div>
                                <button onClick={changePassword} >Change password</button>

                                <Formik initialValues={
                                    {
                                        currentPassword:"",
                                        newPassword:"",
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
                                            axios.post(`http://localhost:8080/user/change-password`,values,config).then((res) => {
                                                alert(res.data);
                                            }).catch((error) => {
                                                console.log(error)
                                            });
                                        }
                                        }
                                        enableReinitialize={true}>
                                    {showForm && <Form >
                                        Current password<br/>
                                        <Field name={"currentPassword"}></Field><br/><br/>
                                        New Password<br/>
                                        <Field name={"newPassword"}></Field><br/><br/>
                                        <button >Change Password</button>
                                    </Form>}
                                </Formik>
                            </div>
                        </div>
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-2">
                            <div>
                                <Formik initialValues={
                                    { firstName:currentUser.firstName,
                                        lastName:currentUser.lastName,
                                        email:currentUser.email,
                                        phoneNumber:currentUser.phoneNumber,
                                    }
                                }
                                        onSubmit={(values) => {
                                           if (values.firstName === "" || values.lastName === ""){
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
                                            axios.put(`http://localhost:8080/user/current`,values,config).then((res) => {
                                                localStorage.setItem("currentUser", JSON.stringify(res.data))
                                                alert("update success")
                                            }).catch((error) => {
                                                if (error.response && error.response.status === 401) {
                                                    alert('email or phoneNumber already exist');
                                                } else {
                                                    console.error('Error occurred while posting result:', error);
                                                    alert('An error occurred. Please try again later.');
                                                }
                                            });
                                        }
                                        }
                                        enableReinitialize={true}>
                                    <Form>
                                        firstName<br/>
                                        <Field name={"firstName"}></Field><br/><br/>
                                        lastName<br/>
                                        <Field name={"lastName"}></Field><br/><br/>
                                        email<br/>
                                        <Field  name={"email"}></Field><br/><br/>
                                        phoneNumber<br/>
                                        <Field  name={"phoneNumber"}></Field><br/><br/>
                                        <button >Edit</button>
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