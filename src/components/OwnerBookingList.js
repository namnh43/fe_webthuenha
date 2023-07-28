import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./OwnerHouseList.css"

function OwnerBookingList() {

    const [bookingList, setBookingList] = useState([])
    const [pageNumber, setPageNumber] = useState(0);

    const housesPerPage = 5;
    const pagesVisited = pageNumber * housesPerPage;

    const pageCount = Math.ceil(bookingList.length / housesPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/booking/owner', config)
            .then((res) => setBookingList(res.data))
    }, []);

    return (<>
        <h1>Booking List</h1>
        <section className="main">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th className="p-0 m-0"></th>
                    <th>House</th>
                    <th>Booking date</th>
                    <th>Duration</th>
                    <th>Unit/Total Price</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {bookingList
                    .slice(pagesVisited, pagesVisited + housesPerPage)
                    .map((item, key) => {
                        return (<tr>
                            <td>{key + 1 + pagesVisited}</td>
                            {item.house.images.length === 0 ? <td></td> :
                                <td><img src={item.house.images[0].fileUrl} style={{height: '4rem', width: '7rem'}}
                                         alt=""/></td>
                            }

                            <td>{item.house.name}</td>
                            <td>{item.createAt}</td>
                            <td>{item.startDate}/{item.endDate}</td>
                            <td>{item.price}/{item.total}</td>
                            <td>{item.bookingStatus}</td>
                        </tr>)
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
    </>);
}

export default OwnerBookingList;