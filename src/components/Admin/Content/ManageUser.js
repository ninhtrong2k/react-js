import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import TableUsers from "./TabUsers";
import { getAllUsers } from "../../../services/apiServices";

const ManageUser = (props) => {

    const [showModalCreateUser, setshowModalCreateUser] = useState(false); 

    const [listUsers, setListUser] = useState(
        []
    )

    useEffect(() => {
        fetchListUsers();
    }, []);
    const fetchListUsers = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }


    return (
        <div className="manage-user-container">
            <div className="title">
                ManageUser
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setshowModalCreateUser(true)}>
                        <FcPlus/> Add User
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUsers listUsers={listUsers}/>
                </div>
                    <ModalCreateUser 
                    show={showModalCreateUser}
                    setShow={setshowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    />
            </div>
        </div>
    )
}
export default ManageUser