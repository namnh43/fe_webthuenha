import './AdminHostList.css'
import {fetchData} from "../utils/api";
import {useStore} from "react-redux";
import {useEffect, useState} from "react";
export function AdminHostList() {
    const [hosts,setHosts] = useState([]);
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const url = 'http://localhost:8080/admin/list-host'; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                const params = {headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW0iLCJpYXQiOjE2ODk4MjcyMzYsImV4cCI6MTY4OTkxMzYzNn0.PL3u_vAWgqznMeV8_jSA9hqA1F9kghjxauyY9JdsyLo",
                    }}; // Các tham số truyền cho API (nếu cần)
                const fetchedData = await fetchData(url, params);
                setHosts(fetchedData);
            }catch (error) {
                console.log(error)
            }
        }
        fetchDataAsync();
    },[])
    return (
        <>
            {hosts.length <= 0 ? <h1>There no data</h1> :(
                <section className="main">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date Created</th>
                            <th>Phone number</th>
                            <th>Number home</th>
                            <th>Earn money(VND)</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hosts.map((item,key) => {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td><img src="./images/profile/user-1.jpg" alt="" className="avatar"/>{item.username}</td>
                                    <td>04/10/2013</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>10</td>
                                    <td>10000</td>
                                    {item.active ? <td><span className="status text-success">&bull;</span> Active</td> :
                                        <td><span className="status text-danger">&bull;</span> Suspended</td>}
                                    {item.active ? <td><button type="button" className="btn btn-danger">Block</button></td> :
                                        <td><button type="button" className="btn btn-primary">Allow</button></td>}
                                </tr>
                            )
                        })}
                        <tr>
                            <td>4</td>
                            <td><a href="#"><img src="./images/profile/user-1.jpg" alt="" className="avatar"/> Mary
                                Saveley</a></td>
                            <td>06/09/2016</td>
                            <td>123456789</td>
                            <td>10</td>
                            <td>10000</td>
                            <td><span className="status text-success">&bull;</span> Active</td>
                            <td><button type="button" className="btn btn-danger">Block</button></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><a href="#"><img src="./images/profile/user-1.jpg" alt="" className="avatar"/> Martin
                                Sommer</a></td>
                            <td>12/08/2017</td>
                            <td>123456789</td>
                            <td>10</td>
                            <td>10000</td>
                            <td><span className="status text-danger">&bull;</span> Suspended</td>
                            <td><button type="button" className="btn btn-primary">Allow</button></td>
                        </tr>
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