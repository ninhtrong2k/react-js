import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
// const items = [...Array(33).keys()];


const TableUserPaginate = (props) => {
  // const [pageCount, setPageCount] = useState(0);
  const { listUsers , pageCount } = props;

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {

    props.fetchListUsersWithPaginate(+event.selected  + 1);
    console.log('page',+event.selected  + 1)
    props.setCurrenPage(+event.selected  + 1);
    console.log(`User requested page ${+event.selected  + 1} `);
  };
  return (
    <>
      <table className="table table-hover  table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">UserName</th>
            <th scope="col">Enail</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => props.handleShowViewUser(item)}>View</button>
                    <button className="btn btn-warning mx-3 " onClick={() => props.handleClickBtnUpdate(item)}>Update</button>
                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(item)} >Delete</button>

                  </td>
                </tr>
              );
            })
          }
          {listUsers && listUsers.length === 0 && <tr><td colSpan={'4'} >Not found data</td></tr>}

        </tbody>
      </table>
      <div className="user-paginantion">
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
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
        forcePage={props.currenPage - 1}
      />
      </div>
    </>
  )
}
export default TableUserPaginate;
