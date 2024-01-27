import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import TableUsers from "./TabUsers";
import { getAllUsers , getUsersWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalShowViewUser from "./ModalShowViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USER = 4;
    const [pageCount, setPageCount] = useState(0)

    const [showModalCreateUser, setshowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showViewUser, setShowViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(props);
    const [dataGetUser, setdataGetUser] = useState(props);

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelete] = useState(props);

    const [listUsers, setListUser] = useState(
        []
    )

    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    
    const fetchListUsers = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUsersWithPaginate(page,LIMIT_USER);
        console.log(res);
        if (res.EC === 0) {
            console.log(res.DT)
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages)
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

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        // console.log(user)
        setDataDelete(user);
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
                    {/* <TableUsers
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleShowViewUser={handleShowViewUser}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleShowViewUser={handleShowViewUser}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
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
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}
export default ManageUser