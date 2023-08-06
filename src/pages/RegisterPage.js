import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import React, {useState} from "react";
import {useNavigate} from "react-router";
import Swal from "sweetalert2";

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, '* Username must be longer than 6 characters')
        .max(32, '* Username must not be longer than 32 characters')
        .required('* Required'),
    phoneNumber: Yup.string()
        .matches('^\\+?[0-9]{3}-?[0-9]{6,12}$', '* Invalid phone number')
        .required('* Required'),
    email: Yup.string().email('* Invalid email')
        .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', '* Invalid email')
        .required('* Required'),
    password: Yup.string()
        .min(6, '* Password must be longer than 6 characters')
        .max(32, '* Password must not be longer than 32 characters')
        .required('* Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], '* Password must match')
});

export function RegisterPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');


    return (
        <Formik
            initialValues={{username: '', phoneNumber: '', email: '', password: '', confirmPassword: ''}}
            validationSchema={SignupSchema}
            onSubmit={values => {
                console.log(values)
                axios.post('http://localhost:8080/jwt/signup', values)
                    .then((res) =>{
                        console.log(res.data)
                        if(res.data.code === '201'){
                            setErrorMessage('')
                            Swal.fire({
                                icon: 'success',
                                title: 'Account created successfully!',
                                timer: 1500
                            })
                            navigate('/login')
                        } else {
                            setErrorMessage(res.data.msg)
                        }
                    })
            }}
        >
            {({ errors, touched }) => (
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
                 data-sidebartype="full"
                 data-sidebar-position="fixed" data-header-position="fixed">
                <div
                    className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h1 className="mb-0"><Link to="/"
                                                                   className="text-dark h2 mb-0"><strong>Homeland<span
                                            className="text-danger">.</span></strong></Link></h1>
                                        <p className="text-center">Slogan here</p>

                                        <Form>
                                            <div className="mb-3 text-start">
                                                <label htmlFor="exampleInputtext1"
                                                       className="form-label">Username</label>
                                                <Field type="text" name="username" className="form-control" id="exampleInputtext1"
                                                       aria-describedby="textHelp"/>
                                                {errors.username && touched.username ? (
                                                    <div style={{color: "red", fontSize: 'small'}}>{errors.username}</div>
                                                ) : null}
                                            </div>
                                            <div className="mb-3 text-start">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                                                <Field type="text" name="phoneNumber" className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp"/>
                                                {errors.phoneNumber && touched.phoneNumber ? (
                                                    <div style={{color: "red", fontSize: 'small'}}>{errors.phoneNumber}</div>
                                                ) : null}
                                            </div>
                                            <div className="mb-3 text-start">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email
                                                    Address</label>
                                                <Field type="email" name="email" className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp"/>
                                                {errors.email && touched.email ? (
                                                    <div style={{color: "red", fontSize: 'small'}}>{errors.email}</div>
                                                ) : null}
                                            </div>
                                            <div className="mb-4 text-start">
                                                <label htmlFor="exampleInputPassword1"
                                                       className="form-label">Password</label>
                                                <Field type="password" name="password" className="form-control"
                                                       id="exampleInputPassword1"/>
                                                {errors.password && touched.password ? (
                                                    <div style={{color: "red", fontSize: 'small'}}>{errors.password}</div>
                                                ) : null}
                                            </div>
                                            <div className="mb-4 text-start">
                                                <label htmlFor="exampleInputPassword1"
                                                       className="form-label">Confirm Password</label>
                                                <Field type="password" name="confirmPassword" className="form-control"
                                                       id="exampleInputPassword1"/>
                                                {errors.confirmPassword && touched.confirmPassword ? (
                                                    <div style={{color: "red", fontSize: 'small'}}>{errors.confirmPassword}</div>
                                                ) : null}
                                            </div>
                                            {errorMessage && <p style={{ color: "red", paddingBottom: "10px"}}>{errorMessage}</p>}
                                            <button type="submit"
                                                  className="btn btn-primary w-100 py-8 mb-4 rounded-2" >Sign Up</button>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="mb-0">Already have an Account?</p>
                                                <Link className="text-primary fw-bold ms-2" to="/login">Sign
                                                    In</Link>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </Formik>
    )
}