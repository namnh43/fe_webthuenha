import React, {useEffect, useState} from "react";
import axios from "axios";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import {useNavigate} from "react-router";
import Tooltip from '@mui/material/Tooltip';

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
            <table className="table table-bordered table-striped table-hover">
                <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Avatar</th>
                    <th className="text-center">Username</th>
                    <th className="text-center">E-mail</th>
                    <th className="text-center">Phone number</th>
                    <th className="text-center">Role</th>
                    <th className="text-center">Created at</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {userList
                    .slice(pagesVisited, pagesVisited + userPerPage)
                    .map((item, index) => {
                        return (<tr key={item.id}>
                            <td className="text-center"><span className="d-inline-block" style={{paddingTop: '1rem'}}>
                                {index + 1 + pagesVisited}</span></td>
                            {
                                item.profileImage ?
                                <td style={{width: '4rem',padding:'2px'}}><img style={{width: '4rem', height: '4rem', borderRadius: '50%'}} src={item.profileImage} /></td>
                                : <td></td>
                            }
                            <td className="text-left pt-10"><span className="d-inline-block"
                                                                  style={{paddingTop: '1rem'}}>
                                {item.username}</span></td>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1rem'}}>
                                {item.email}</span></td>
                            <td className="text-right"><span className="d-inline-block" style={{paddingTop: '1rem'}}>
                                {item.phoneNumber}</span></td>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1rem'}}>
                                {item.role}</span></td>
                            <td className="text-center"><span className="d-inline-block" style={{paddingTop: '1rem'}}>
                                {item.createAt}</span></td>

                            {item.blocked === false ?
                                (<td className="text-center"><span className="d-inline-block"
                                                                 style={{paddingTop: '1rem'}}>
                                <span style={signalLightStyle}></span>Active</span></td>)
                                : (<td className="text-center"><span className="d-inline-block"
                                                                   style={{paddingTop: '1rem'}}>
                                <span style={signalLightStyle}></span>Blocked</span></td>)}

                            <td style={{width: '100px'}} className="text-center">
                                <span className="d-inline-block" style={{paddingTop: '1rem'}}>
                                <Tooltip title="INFO"><button style={{backgroundColor: 'transparent'}} className="mr-3">
                                    <i className="material-icons">&#xe88e;</i></button></Tooltip>
                                    {item.blocked === false ?
                                        (<Tooltip title="INFO"><button style={{backgroundColor: 'transparent'}}>
                                            <i className="material-icons">&#xe897;</i></button></Tooltip>)
                                        : (<Tooltip title="INFO"><button style={{backgroundColor: 'transparent'}}>
                                            <i className="material-icons">&#xe898;</i></button></Tooltip>)}
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