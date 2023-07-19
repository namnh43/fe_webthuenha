import {Link} from "react-router-dom";

export function RegisterPage() {
    return (
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
                                    <form>
                                        <div className="mb-3 text-start">
                                            <label htmlFor="exampleInputtext1" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="exampleInputtext1"
                                                   aria-describedby="textHelp"/>
                                        </div>
                                        <div className="mb-3 text-start">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email
                                                Address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1"
                                                   aria-describedby="emailHelp"/>
                                        </div>
                                        <div className="mb-4 text-start">
                                            <label htmlFor="exampleInputPassword1"
                                                   className="form-label">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                                        </div>
                                        <Link to="/"
                                           className="btn btn-primary w-100 py-8 mb-4 rounded-2">Sign Up</Link>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <p className="mb-0">Already have an Account?</p>
                                            <Link className="text-primary fw-bold ms-2" to="/login">Sign
                                                In</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}