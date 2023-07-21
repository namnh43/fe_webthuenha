import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./OwnerHouseList.css"

function OwnerHouseList() {

    const[houseList, setHouseList] = useState([])

    const [pageNumber, setPageNumber] = useState(0);

    const housesPerPage = 5;
    const pagesVisited = pageNumber * housesPerPage;

    const pageCount = Math.ceil(houseList.length / housesPerPage);

    const changePage = ({ selected }) => {
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {houseList
                        .slice(pagesVisited, pagesVisited + housesPerPage)
                        .map((item,key) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                {/*<td><img src="" alt="" className="avatar"/>{item.name}</td>*/}
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.address}</td>
                                <td>add later</td>
                                <td>{item.status}</td>
                                {/*{item.active ? <td><span className="status text-success">&bull;</span> Active</td> :*/}
                                {/*    <td><span className="status text-danger">&bull;</span> Suspended</td>}*/}
                                {item.active ? <td><button type="button" className="btn btn-danger">Block</button></td> :
                                    <td><button type="button" className="btn btn-primary">Allow</button></td>}
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