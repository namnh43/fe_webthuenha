import {useEffect, useState} from "react";
import {fetchData,postData} from "../utils/api";
import Swal from "sweetalert2";

export function AdminWaitingHost() {
    const [hosts, setHosts] = useState([]);
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const url = 'http://localhost:8080/admin/apply-host'; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                const params = {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW0iLCJpYXQiOjE2ODk4MjcyMzYsImV4cCI6MTY4OTkxMzYzNn0.PL3u_vAWgqznMeV8_jSA9hqA1F9kghjxauyY9JdsyLo",
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
                postData(url, msg).then(data => {
                    //remove item from list
                    const newList = hosts.filter((item) => {
                        return item.id != id;
                    })
                    setHosts(newList);
                })
            }
            return 'dismiss';
        }).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>{hosts.length <= 0 ? <h1>There no data</h1> : (
            <section className="main">
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
                    {hosts.map((item, key) => {
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
                                        className="material-icons">&#xE8B8;</i></a>
                                    <div
                                        className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                                        aria-labelledby="drop2">
                                        <div className="message-body">
                                            <a href="javascript:void(0)"
                                               className="d-flex align-items-center gap-2 dropdown-item">
                                                <i className="ti ti-user fs-6"></i>
                                                <p className="mb-0 ">View
                                                    Profile</p>
                                            </a>
                                            <a href="javascript:void(0)" onClick={() => handleAction(item.id)}
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
                    <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul className="pagination">
                        <li className="page-item disabled"><a href="#">Previous</a></li>
                        <li className="page-item"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                        <li className="page-item active"><a href="#" className="page-link">3</a></li>
                        <li className="page-item"><a href="#" className="page-link">4</a></li>
                        <li className="page-item"><a href="#" className="page-link">5</a></li>
                        <li className="page-item"><a href="#" className="page-link">Next</a></li>
                    </ul>
                </div>
            </section>)
        }
        </>
    )
}