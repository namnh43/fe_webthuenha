import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import {useNavigate} from "react-router";
import Constants from "../../../utils/constants";


export function AdminUserList() {

    const navigate = useNavigate()

    const [userList, setUserList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [ascending,setAscending] = useState(true);

    //pagination
    const [pagesVisited, setPagesVisited] = useState(0);
    const [userPerPage, setUserPerPage] = useState(5);

    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(Constants.BASE_API+`/user`, config)
            .then((res) => {
                setUserList(res.data.reverse())
                setSearchList(res.data)
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
    function search(){
        const keyword = document.getElementById('name-input').value.trim().toLowerCase();
        const searchFilter = searchList.filter((user) => {
            if (!keyword
                || user.email?.toLowerCase().includes(keyword)
                || user.phoneNumber?.toString().includes(keyword)
                || user.role?.toLowerCase().includes(keyword)
                || user.username?.toLowerCase().includes(keyword)
                || user.createAt?.toString().includes(keyword)
            ) {
                return true;
            }
            return false;
        });
        setUserList(searchFilter);
    }
    function toggleAscending() {
        setAscending(prevAscending => !prevAscending);
    }
    function idClick(){
        toggleAscending()
        const sorted = searchList.sort((a, b) => {
            if (a.id < b.id) {
                return ascending ? -1 : 1;
            } else if (a.id > b.id) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setUserList(sorted);
    }
    function userClick(){
        toggleAscending()
        const sorted = searchList.sort((a, b) => {
            if (a.username < b.username) {
                return ascending ? -1 : 1;
            } else if (a.username > b.username) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setUserList(sorted);
    }
    function emailClick(){
        toggleAscending()
        const sorted = searchList.sort((a, b) => {
            if (a.email < b.email) {
                return ascending ? -1 : 1;
            } else if (a.email > b.email) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setUserList(sorted);
    }
    function phoneClick(){
        toggleAscending()
        const sorted = searchList.sort((a, b) => {
            if (a.phoneNumber < b.phoneNumber) {
                return ascending ? -1 : 1;
            } else if (a.phoneNumber > b.phoneNumber) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setUserList(sorted);
    }
    function roleClick(){
        toggleAscending()
        const sorted = searchList.sort((a, b) => {
            if (a.role < b.role) {
                return ascending ? -1 : 1;
            } else if (a.role > b.role) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
        setUserList(sorted);
    }

    return (<>
        <h2>User List</h2>
        <input onChange={search}  id="name-input" name="name" type="text" placeholder="Enter keyword" required />
        <section className="main">
            <div className='table-container'>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                <tr className={"table-head"}>
                <th className="text-left" style={{width:"50px"}} ><button onClick={idClick}>#</button></th>
                    <th className="text-center"><button >Avata</button></th>
                    <th className="text-left"><button onClick={userClick}>UserName</button></th>
                    <th className="text-left" style={{width:"220px"}}><button onClick={emailClick}>E-mail</button></th>
                    <th className="text-left"><button onClick={phoneClick}>Phone number</button></th>
                    <th className="text-left" style={{width:"80px"}}><button onClick={roleClick}>Role</button></th>
                    <th className="text-left"><button >Created at</button></th>
                    <th className="text-left"><button >Status</button></th>
                    <th className="text-center"><button >Action</button></th>
                </tr>
                </thead>
                <tbody>
                {userList
                    .slice(pagesVisited, pagesVisited + userPerPage)
                    .map((item, index) => {
                        return (<tr key={item.id}>
                            <td style={{width:"50px"}} className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {index + 1 + pagesVisited}</span></td>
                            {
                                item.profileImage &&
                                <td><img src={item.profileImage}
                                         style={{height: '5rem', width: '6rem', borderRadius: '50%'}}/></td>
                            }
                            <td className="text-left"><span className="d-inline-block"
                                                                  style={{paddingTop: '1.5rem'}}>
                                {item.username}</span></td>
                            <td style={{width:"220px"}} className="text-left "><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {item.email}</span></td>
                            <td className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
                                {item.phoneNumber}</span></td>
                            <td style={{width:"80px"}} className="text-left"><span className="d-inline-block" style={{paddingTop: '1.5rem'}}>
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

                            <td className="">
                                <span className="d-inline-block">
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
            </div>
            <div style={{marginLeft:'auto'}}>
                Entries/page &nbsp;
                <select onChange={(event)=>{
                    setUserPerPage(event.target.value);
                }} name="page" style={{border: '1px solid #bdbdbd', borderRadius: '5px', textAlign:'center', height:'40px', width:'60px'}}>
                    <option value="5">---</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <PaginationComponent data={userList} numberPerpage={userPerPage} changeCurentPage={handlePageChange}/>
        </section>
    </>);
}