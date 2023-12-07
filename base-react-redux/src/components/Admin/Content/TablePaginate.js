import React, { useEffect } from 'react';
import { useState } from 'react';
import { getAllUsers } from '../../../services/apiService';
import { Button } from 'bootstrap';
import ReactPaginate from 'react-paginate'
const items = [...Array(33).keys()];



const TablePaginate = (props) => {
    const { listUser, pageCount, fetchListUserWithPaginate, setCurrentPage } = props
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className='btn btn-secondary'
                                            onClick={() => { props.hanldeClickBtnView(item) }}>View</button>
                                        <button className='btn btn-warning mx-3'
                                            onClick={() => { props.hanldeClickBtnUpdate(item) }}>Update</button>
                                        <button className='btn btn-danger'
                                            onClick={() => { props.hanldeClickBtnDelete(item) }}>Delete</button>

                                    </td>
                                </tr>
                            )

                        })}
                    {listUser && listUser.length == 0 &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>

                        </tr>
                    }
                </tbody>
            </table>
            <div className='user-pagination'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}//quay lai trang 1
                />
            </div>

            {/* <PaginatedItems itemsPerPage={4} />, */}
        </>
    );
};

export default TablePaginate;