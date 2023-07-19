import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

export function LoginPage() {
    const navigage = useNavigate();
    return (
        <>
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
                                        <h1 className="mb-0"><a href="index.html"
                                                                className="text-dark h2 mb-0"><strong>Homeland<span
                                            className="text-danger">.</span></strong></a></h1>
                                        <p className="text-center">Slogan here</p>
                                        <form className={"mt-5"}>
                                            <div className="mb-4 text-start">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp"/>
                                            </div>
                                            <div className="mb-4 text-start">
                                                <label htmlFor="exampleInputPassword1"
                                                       className="form-label">Password</label>
                                                <input type="password" className="form-control"
                                                       id="exampleInputPassword1"/>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div className="form-check">
                                                    <input className="form-check-input primary" type="checkbox" value=""
                                                           id="flexCheckChecked" />
                                                        <label className="form-check-label text-dark"
                                                               htmlFor="flexCheckChecked">
                                                            Remeber this Device
                                                        </label>
                                                </div>
                                                <a className="text-primary fw-bold" href="./index.html">Forgot Password
                                                    ?</a>
                                            </div>
                                            <Link to="/"
                                               className="btn btn-primary w-100 py-8 mb-4 rounded-2">Sign In</Link>
                                            <div className="d-flex align-items-center justify-content-end">
                                                New on us?
                                                <Link className="text-primary fw-bold ms-2"
                                                   to="/register">Create an account</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}