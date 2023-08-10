import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import React, {useEffect} from "react";
import GoogleOAuth2Login from "../components/OAuth2/googleOAuth2";
import Swal from "sweetalert2";
import Constants from "../utils/constants";

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('* Required'),
    password: Yup.string()
        .required('* Required')
});

export function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login";
    },[])

    return (
        <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={values => {
                axios.post(Constants.BASE_API+'/jwt/signin', values)
                    .then((res) => {
                        console.log(res)
                        if (res.data == "") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Log in failed',
                                text: 'User is blocked',
                            })
                            return
                        }
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("currentUser", JSON.stringify(res.data.user))
                        localStorage.setItem("currentUserId", res.data.user.id)
                        localStorage.setItem("currentUserRole", res.data.user.role)
                        localStorage.setItem("currentUserApplyHost", res.data.user.applyHost)
                        console.log(localStorage.getItem("currentUserApplyHost"));
                        if (localStorage.getItem("houseUrl") != null){
                            navigate(localStorage.getItem("houseUrl"));
                            localStorage.removeItem("houseUrl");
                        }
                        else {
                            res.data.user.role === "ADMIN" ? navigate('/admin/hosts') : navigate('/');
                        }
                    })
                    .catch(() => {
                        navigate('/login')
                        Swal.fire({
                            icon: 'error',
                            title: 'Log in failed',
                            text: 'Wrong username or password! Try again.',
                        })
                    })
            }}
        >
            {({ errors, touched }) => (
            <div className="" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
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
                                        <Form className={"mt-5"}>
                                            <div className="mb-4 text-start">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                                <Field type="text" name="username" className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp"/>
                                                {errors.username && touched.username ? (
                                                    <div style={{color: "red", fontSize: 'small'}}>{errors.username}</div>
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
                                            <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div className="form-check">
                                                    <input className="form-check-input primary" type="checkbox" value=""
                                                           id="flexCheckChecked" />
                                                        <label className="form-check-label text-dark"
                                                               htmlFor="flexCheckChecked">
                                                            Remeber me
                                                        </label>
                                                </div>
                                                <a className="text-primary fw-bold" href="./index.html">Forgot Password ?</a>
                                            </div>
                                            <button
                                               className="btn btn-primary w-100 py-8 mb-4 rounded-2">Sign In</button>
                                            <div style={{width: "fit-content", margin: "auto"}}>
                                                <GoogleOAuth2Login/>
                                            </div><br/>
                                            <div className="d-flex align-items-center justify-content-end">
                                                New on us?
                                                <Link className="text-primary fw-bold ms-2"
                                                   to="/register">Create an account</Link>
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