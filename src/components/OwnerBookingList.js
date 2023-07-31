import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./OwnerHouseList.css"
import {PaginationComponent} from "./pagination/PaginationComponent";

function OwnerBookingList() {

    const [bookingList, setBookingList] = useState([])

    //pagination
    const [pagesVisited,setPagesVisited] = useState(0);
    const bookingPerpage = 2;
    const handlePageChange = (value) => {
        setPagesVisited(value)
    }

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
                    .slice(pagesVisited, pagesVisited + bookingPerpage)
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
            <PaginationComponent data={bookingList} changeCurentPage={handlePageChange} numberPerpage={bookingPerpage}/>

        </section>
    </>);
}

export default OwnerBookingList;