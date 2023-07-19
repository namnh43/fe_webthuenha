import React from 'react';
import {Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    phone: Yup.number().typeError('Must be a number').required('Required'),
    email: Yup.string().email('Invalid email').matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(32, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function SignUpForm() {
    return (
        <>
            <Formik
                initialValues={{username: '', phone: '', email: '', password: '', confirmPassword: ''}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    axios.post('http://localhost:8080/jwt/signup', values)
                }}
            >
                {({ errors, touched }) => (
                <Form>
                    <h1>Sign up Form</h1>
                    <Field type="text" name="username" placeholder="Username..."/>
                    {errors.username && touched.username ? (
                        <div>{errors.username}</div>
                    ) : null}
                    <Field type="text" name="phone" placeholder="Phone..."/>
                    {errors.phone && touched.phone ? (
                        <div>{errors.phone}</div>
                    ) : null}
                    <Field type="email" name="email" placeholder="Email..."/>
                    {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                    ) : null}
                    <Field type="password" name="password" placeholder="Password..."/>
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                    ) : null}
                    <Field type="password" name="confirmPassword" placeholder="Confirm Password..."/>
                    {errors.confirmPassword && touched.confirmPassword ? (
                        <div>{errors.confirmPassword}</div>
                    ) : null}
                    <button>Submit</button>
                </Form>)}
            </Formik>
        </>
    );
}

export default SignUpForm;