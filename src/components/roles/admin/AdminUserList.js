import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {PaginationComponent} from "../../pagination/PaginationComponent";
import {useNavigate} from "react-router";
import Constants from "../../../utils/constants";
import '../../scroll/scroll.css';
import CircleIcon from "@mui/icons-material/Circle";


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
        <h2 className={'my-3'}>User List</h2>
        <div className={'mt-2 mb-4'} style={{ display: 'flex', flexWrap: 'wrap' }}>
            <input onChange={search} style={{border: '1px solid #bdbdbd', borderRadius: '5px', paddingLeft: '8px'}} id="name-input" name="name" type="text" placeholder="Enter keyword" required />
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
                    <option value="50">50</option>
                </select>
            </div>
        </div>
        <section className="main">
            <div className='table-container mb-3'>
            <table className="table table-bordered table-hover">
                <thead>
                <tr className={"table-head"}>
                    <th style={{ width:'20px',verticalAlign:'middle', textAlign:'center',padding:'10px'}} ><button onClick={idClick}>#</button></th>
                    <th style={{width:'270px',verticalAlign:'middle', textAlign:'center',padding:'4px'}} colSpan="2" ><button onClick={userClick}>Username</button></th>
                    <th style={{width:'240px',verticalAlign:'middle', textAlign:'center',padding:'4px'}}><button onClick={emailClick}>E-mail</button></th>
                    <th style={{verticalAlign:'middle', textAlign:'center',padding:'6px'}}><button onClick={phoneClick}>Phone number</button></th>
                    <th style={{width:'95px',verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button onClick={roleClick}>Role</button></th>
                    <th style={{width:'90px',verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button >Created at</button></th>
                    <th style={{verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button >Status</button></th>
                    <th style={{width:'110px',verticalAlign:'middle', textAlign:'center',padding:'0px'}}><button >Action</button></th>
                </tr>
                </thead>
                <tbody>
                {userList
                    .slice(pagesVisited, pagesVisited + userPerPage)
                    .map((item, index) => {
                        return (<tr key={item.id}>
                            <td style={{verticalAlign:'middle', textAlign:'center', padding:'0px'}}>{index + 1 + pagesVisited}</td>
                            <td style={{verticalAlign:'middle',width:"50px", padding:'5px 5px', borderRight:"none"}}><img src={item.profileImage} style={{width:"60px",height:"60px", borderRadius:"50%"}}/></td>
                            <td className="text-left" style={{ verticalAlign:'middle', padding:'0px', borderLeft:"none"}}>{item.username}</td>
                            <td className="text-left" style={{verticalAlign:'middle', padding:'0px'}}>{item.email}</td>
                            <td className="text-left" style={{verticalAlign:'middle', padding:'6px'}}>
                                {item.phoneNumber}</td>
                            <td style={{width:"80px"}} className="text-left"><span className="d-inline-block" style={{paddingTop: '0'}}>
                                {item.role}</span></td>
                            <td className="text-left">
                                {item.createAt}</td>

                            {item.blocked === false ?
                                <td><span className="status text-success" ><CircleIcon style={{paddingBottom: '2px'}} fontSize="15px"/></span> Active</td> :

                                 <td><span className="status text-danger"><CircleIcon style={{paddingBottom: '2px'}} fontSize="15px"/></span> Blocked</td>
                            }

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
            <PaginationComponent data={userList} numberPerpage={userPerPage} changeCurentPage={handlePageChange}/>
        </section>
    </>);
}