import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import './pagination.css'

export function PaginationComponent({data,numberPerpage,changeCurentPage}) {
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * numberPerpage;
    const pageCount = Math.ceil(data.length / numberPerpage);
    let [currentDisplayNumber,setCurrentDisplayNumber] = useState(0);

    useEffect(() => {
        setPageNumber(0)
        setCurrentDisplayNumber(data.slice(pageNumber*numberPerpage, pageNumber*numberPerpage + numberPerpage).length);
        changeCurentPage(0)

    },[data])
    const changePage = ({ selected }) => {
        setPageNumber(selected);
        setCurrentDisplayNumber(data.slice(selected*numberPerpage, selected*numberPerpage + numberPerpage).length);
        changeCurentPage(selected * numberPerpage)
    };

    return (
        <div className="clearfix">
            <div className="hint-text">Showing <b>{currentDisplayNumber}</b> out of <b>{data.length}</b> entries</div>
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
    )
}