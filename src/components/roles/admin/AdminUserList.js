import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import {useNavigate} from "react-router";

export function AdminUserList() {

    const navigate = useNavigate()

    const [userList, setUserList] = useState([])

    //pagination
    const [pagesVisited, setPagesVisited] = useState(0);
    const userPerPage = 5;
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/user`, config)
            .then((res) => {
                console.log(res.data)
                setUserList(res.data.reverse())
            });
    }, []);

    const signalLightStyle = {
        display: 'inline-block',
        backgroundColor: '#198754',
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        marginBottom: '2px',
        marginRight: '5px'
    }


    return (<>
        <div className="d-flex justify-content-between">
            <h2>User List</h2>
            {/*<button className="btn btn-light d-flex" style={{paddingTop: '10px'}} onClick={() => navigate('/owner/add-house-form')}>*/}
            {/*    <i className="material-icons">&#xf8eb;</i>*/}
            {/*    <span>Create new</span></button>*/}
        </div>
        <section className="main">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th className="text-left">#</th>
                    <th className="text-left"></th>
                    <th className="text-left">Username</th>
                    <th className="text-left">E-mail</th>
                    <th className="text-left">Phone number</th>
                    <th className="text-left">Address</th>
                    <th className="text-left">Created at</th>
                    <th className="text-left">Action</th>
                    <th className="text-left"></th>
                </tr>
                </thead>
                <tbody>
                {userList
                    .slice(pagesVisited, pagesVisited + userPerPage)
                    .map((item, index) => {
                        return (<tr key={item.id}>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {index + 1 + pagesVisited}</span></td>
                            {
                                item.profileImage &&
                                <td><img src={item.profileImage}
                                         style={{height: '5rem', width: '6rem', borderRadius: '50%'}}/></td>
                            }
                            <td className="text-left pt-10"><span className="d-inline-block"
                                                                  style={{paddingTop: '1.5rem'}}>
                                {item.username}</span></td>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {item.email}</span></td>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {item.phoneNumber}</span></td>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {item.role}</span></td>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {item.createAt}</span></td>

                            {item.blocked === false ?
                                (<td className="text-left"><span className="d-inline-block"
                                                                 style={{paddingTop: '1.5rem'}}>
                                <span style={signalLightStyle}></span>Active</span></td>)
                                : (<td className="text-left"><span className="d-inline-block"
                                                                   style={{paddingTop: '1.5rem'}}>
                                <span style={signalLightStyle}></span>Blocked</span></td>)}

                            <td className="col-2">
                                <span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                <button style={{backgroundColor: 'transparent'}} className="mr-3">
                                    <i className="material-icons">&#xe88e;</i></button>
                                    {item.blocked === false ?
                                        (<button style={{backgroundColor: 'transparent'}}>
                                            <i className="material-icons">&#xe897;</i></button>)
                                        : (<button style={{backgroundColor: 'transparent'}}>
                                            <i className="material-icons">&#xe898;</i></button>)}
                            </span>
                            </td>

                        </tr>)
                    })}

                </tbody>
            </table>
            <PaginationComponent data={userList} numberPerpage={userPerPage} changeCurentPage={handlePageChange}/>

        </section>
    </>);
}