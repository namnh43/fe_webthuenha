import React, {useEffect, useState} from "react";
import {fetchData,postData} from "../utils/api";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

export function AdminWaitingHost() {
    const [hosts, setHosts] = useState([]);
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const housesPerPage = 5;
    const pagesVisited = pageNumber * housesPerPage;
    const pageCount = Math.ceil(hosts.length / housesPerPage);
    let [currentDisplayNumber,setCurrentDisplayNumber] = useState(0);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
        setCurrentDisplayNumber(hosts.slice(selected*housesPerPage, selected*housesPerPage + housesPerPage).length);
    };
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
                //set current pagination
                setCurrentDisplayNumber(fetchedData.slice(pageNumber*housesPerPage, pageNumber*housesPerPage + housesPerPage).length);
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
        <>{hosts.length <= 0 ? <h1>There no data</h1> : (
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
                    <tbody>
                    {hosts.slice(pagesVisited, pagesVisited + housesPerPage).map((item,key) => {
                        return (
                            <tr>
                                <td>{key}</td>
                                <td><img src="./images/profile/user-1.jpg" alt=""
                                         className="avatar"/>{item.username}</td>
                                <td>04/10/2013</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                    <a href="#" className="settings" title="Settings" id="drop2"
                                       data-bs-toggle="dropdown" data-toggle="tooltip"><i
                                        className="material-icons text-dark-light">&#xE8B8;</i></a>
                                    <div
                                        className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                                        aria-labelledby="drop2">
                                        <div className="message-body">
                                            <a
                                               className="d-flex align-items-center gap-2 dropdown-item">
                                                <i className="ti ti-user fs-6"></i>
                                                <p className="mb-0 ">View
                                                    Profile</p>
                                            </a>
                                            <a  onClick={() => handleAction(item.id)}
                                               className="d-flex align-items-center gap-2 dropdown-item">
                                                <i className="ti ti-analyze fs-6"></i>
                                                <p className="mb-0 ">Duyệt yêu
                                                    cầu</p>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className="clearfix">
                    <div className="hint-text">Showing <b>{currentDisplayNumber}</b> out of <b>{hosts.length}</b> entries</div>
                    <ul className="pagination">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </ul>
                </div>
            </section>)
        }
        </>
    )
}