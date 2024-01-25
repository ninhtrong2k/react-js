import { useEffect } from "react";
import { useState } from "react";
const TableUsers = (props) => {
    // const [listUsers, setListUser] = useState(
    //     []
    // )
    const {listUsers} = props;

    console.log("render view");
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
                                        <button className="btn btn-secondary">View</button>
                                        <button className="btn btn-warning mx-3">Update</button>
                                        <button className="btn btn-danger">Delete</button>

                                    </td>
                                </tr>
                            );
                        })
                    }
                    {listUsers && listUsers.length === 0 && <tr><td colSpan={'4'} >Not found data</td></tr>}

                </tbody>
            </table>
        </>
    )
}
export default TableUsers;
