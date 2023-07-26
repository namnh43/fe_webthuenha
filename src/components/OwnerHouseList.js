import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./OwnerHouseList.css"
import {useNavigate} from "react-router";

function OwnerHouseList() {

    const navigate = useNavigate()

    const [houseList, setHouseList] = useState([])

    const [pageNumber, setPageNumber] = useState(0);

    const housesPerPage = 5;
    const pagesVisited = pageNumber * housesPerPage;

    const pageCount = Math.ceil(houseList.length / housesPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };


    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/house/host/${localStorage.getItem('currentUserId')}`, config)
            .then((res) => setHouseList(res.data))
    }, []);


    return (
        <>
            <h1>House List</h1>
            <section className="main">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Address</th>
                        <th>Sale</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {houseList
                        .slice(pagesVisited, pagesVisited + housesPerPage)
                        .map((item, key) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.address}</td>
                                    <td>add later</td>
                                    <td>{item.status}</td>
                                    <td><i className="material-icons">&#xe88e;</i></td>
                                    <td><i className="material-icons"
                                    onClick={() => {
                                        const config = {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem('token')}`
                                            }
                                        }

                                        axios.delete(`http://localhost:8080/house/delete/${item.id}`,config)
                                            .then(() => axios.get('http://localhost:8080/house', config)
                                                .then(res => setHouseList(res.data)))
                                    }}>&#xe872;</i></td>
                                    <td><i className="material-icons"
                                           onClick={() => navigate(`/owner/edit-house-form/${item.id}`)}
                                    >&#xe3c9;</i></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
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

            </section>
        </>
    );
}

export default OwnerHouseList;