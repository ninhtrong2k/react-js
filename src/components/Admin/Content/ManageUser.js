import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import TableUsers from "./TabUsers";
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalShowViewUser from "./ModalShowViewUser";

const ManageUser = (props) => {

    const [showModalCreateUser, setshowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showViewUser, setShowViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(props);
    const [dataGetUser, setdataGetUser] = useState(props);



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

    const handleShowViewUser = (user) => {
        setShowViewUser(true);
        setdataGetUser(user);
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        // console.log("update user", user);
        setDataUpdate(user);
    }


    const restUpdateData = () => {
        setDataUpdate({});

    }
    const restShowViewData = () => {
        setdataGetUser({});

    }


    return (
        <div className="manage-user-container">
            <div className="title">
                ManageUser
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setshowModalCreateUser(true)}>
                        <FcPlus /> Add User
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUsers
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleShowViewUser={handleShowViewUser}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setshowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}

                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    restUpdateData={restUpdateData}
                />
                <ModalShowViewUser
                    show={showViewUser}
                    setShow={setShowViewUser}
                    dataGetUser={dataGetUser}
                    restShowViewData={restShowViewData}
                />
            </div>
        </div>
    )
}
export default ManageUser