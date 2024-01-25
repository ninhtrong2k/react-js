import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";

const ManageUser = (props) => {
    const [showModalCreateUser, setshowModalCreateUser] = useState(false); 
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
                    Table User
                </div>
                    <ModalCreateUser 
                    show={showModalCreateUser}
                    setShow={setshowModalCreateUser}
                    />
            </div>
        </div>
    )
}
export default ManageUser