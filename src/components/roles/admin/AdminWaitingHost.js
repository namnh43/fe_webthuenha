import React, {useEffect, useState} from "react";
import {fetchData,postData} from "../../../utils/api";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import UserProfileDialog from "../../dialog/UserProfileDialog";
import RuleIcon from '@mui/icons-material/Rule';
import IconButton from '@mui/material/IconButton';
import {PaginationComponent} from "../../pagination/PaginationComponent";
import '../../scroll/scroll.css'
import Constants from "../../../utils/constants";

export function AdminWaitingHost() {
    const [hosts, setHosts] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [ascending,setAscending] = useState(true);

    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const [hostsPerPage,setHostsPerPage] = useState(5);

    const handlePageChange = (value) => {
        setPagesVisited(value)
    }


    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [currentUserId,setCurrentUserId] = useState(null);
    const handleProfileEdit = (id) => {
        setCurrentUserId(id);
        setOpenProfileDialog(true);
    }
    const handleCloseProfileDialog = (event,reason) => {
        setOpenProfileDialog(false);
    }
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const url = Constants.BASE_API+'/admin/apply-host'; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                const params = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }; // Các tham số truyền cho API (nếu cần)
                const fetchedData = await fetchData(url, params);
                setHosts(fetchedData);
                setSearchList(fetchedData);
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataAsync();
    }, [])
    const handleAction = (id) => {
        Swal.fire({
            input: 'textarea',
            inputLabel: 'Message',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Approve',
            denyButtonText: 'Deny',
        }).then(data => {
            if (data.isConfirmed || data.isDenied) {
                const url = data.isConfirmed ? Constants.BASE_API+'/admin/accept-host/' + id :
                    Constants.BASE_API+'/admin/reject-host/' + id;
                console.log('url ', url);
                const msg = {msg: data.value};
                const params = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };

                // Hiển thị thông báo chờ đợi
                Swal.fire({
                    title: "Please wait...",
                    text: "Sending request...",
                    icon: "info",
                    showCancelButton: false,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    },
                });

                postData(url, msg, params)
                    .then((data) => {
                        // Xoá item từ danh sách
                        const newList = hosts.filter((item) => item.id !== id);
                        setHosts(newList);

                        // Đóng thông báo chờ đợi khi thành công
                        Swal.fire({
                            title: "Success",
                            text: "Action completed successfully.",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                    })
                    .catch((error) => {
                        // Xử lý lỗi và đóng thông báo chờ đợi khi có lỗi
                        Swal.fire({
                            title: "Error",
                            text: "Failed to complete action.",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    });
            }
        }).catch((err) => {
            console.log(err)
        });
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
        setHosts(searchFilter);
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
        setHosts(sorted);
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
        setHosts(sorted);
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
        setHosts(sorted);
    }

    return (
        <>
            <section className="main">
                <h2 className="mb-3">Waiting confirmation hosts</h2>
                <input onChange={search}  id="name-input" name="name" type="text" placeholder="Enter keyword" required />
                <table className="table table-striped table-hover">
                    <thead>
                    <tr className={"table-head"}>
                        <th><button onClick={idClick}>#</button></th>
                        <th><button onClick={userClick}>UserName</button></th>
                        <th><button >Created at</button></th>
                        <th><button onClick={phoneClick}>Phone number</button></th>
                        <th><button >Action</button></th>
                    </tr>
                    </thead>
                    {hosts.length <= 0 ? (
                        <tbody><tr><td colSpan={5}>There no data</td></tr></tbody>
                    ) : (
                    <tbody>
                    {hosts.slice(pagesVisited, pagesVisited + hostsPerPage).map((item,key) => {
                        return (
                            <tr>
                                <td>{key + 1 + pagesVisited}</td>
                                <td><img src="./images/profile/user-1.jpg" alt=""
                                         className="avatar"/>{item.username}</td>
                                <td>04/10/2013</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                    <Tooltip title="info"><InfoIcon onClick={() => handleProfileEdit(item.id)}/></Tooltip>
                                    <IconButton title='confirm' color='inherit'><RuleIcon onClick={() => handleAction(item.id)}/></IconButton>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                    )}
                </table>
                <div style={{marginLeft:'auto'}}>
                    Entries/page &nbsp;
                    <select onChange={(event)=>{
                        setHostsPerPage(event.target.value);
                    }} name="page" style={{border: '1px solid #bdbdbd', borderRadius: '5px', textAlign:'center', height:'40px', width:'60px'}}>
                        <option value="5">---</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <PaginationComponent data={hosts} numberPerpage={hostsPerPage} changeCurentPage={handlePageChange}/>
            </section>
            <UserProfileDialog open={openProfileDialog} onClose={handleCloseProfileDialog} id={currentUserId}/>
        </>
    )
}