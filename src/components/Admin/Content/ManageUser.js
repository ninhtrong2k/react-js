import ModalCreateUser from "./ModalCreateUser"
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
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}
export default ManageUser