import ModalCreateUser from "./ModalCreateUser";
// import { FaCirclePlus } from "./react-icons/fa6";

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                ManageUser
            </div>
            <div className="user-content">
                <div>
                    <button>
                        Add User
                    </button>
                </div>
                <div>
                    Table User
                </div>
                    <ModalCreateUser />
            </div>
        </div>
    )
}
export default ManageUser