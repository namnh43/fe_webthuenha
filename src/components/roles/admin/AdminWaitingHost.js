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

export function AdminWaitingHost() {
    const [hosts, setHosts] = useState([]);
    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const hostsPerPage = 2;
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
                const url = 'http://localhost:8080/admin/apply-host'; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                const params = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }; // Các tham số truyền cho API (nếu cần)
                const fetchedData = await fetchData(url, params);
                setHosts(fetchedData);
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
                const url = data.isConfirmed ?  'http://localhost:8080/admin/accept-host/' + id :
                    'http://localhost:8080/admin/reject-host/' + id;
                console.log('url ',url)
                const msg = {msg:data.value};
                const params = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }; // Các tham số truyền cho API (nếu cần)
                postData(url, msg, params ).then(data => {
                    //remove item from list
                    const newList = hosts.filter((item) => {
                        return item.id != id;
                    })
                    setHosts(newList);
                })
            }
        }).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <section className="main">
                <h2 className="mb-3">Waiting confirmation hosts</h2>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date Created</th>
                        <th>Phone number</th>
                        <th>Action</th>
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
                <PaginationComponent data={hosts} numberPerpage={hostsPerPage} changeCurentPage={handlePageChange}/>
            </section>
            <UserProfileDialog open={openProfileDialog} onClose={handleCloseProfileDialog} id={currentUserId}/>
        </>
    )
}