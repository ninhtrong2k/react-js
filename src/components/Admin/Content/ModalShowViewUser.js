import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';




const ModalShowViewUser   = (props) => {
        const { show, setShow, dataGetUser ,restShowViewData } = props;
        const handleClose = () => {
            setShow(false)
            setEmail("");
            setPassword("");
            setUserName("");
            setRole("ADMIN");
            setImage("");
            setPreviewImage("");
            restShowViewData();
        };

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUserName] = useState("");
        const [role, setRole] = useState("USER");
        const [image, setImage] = useState("");
        const [previewImage, setPreviewImage] = useState("");

        useEffect(() => {
            if(!_.isEmpty(dataGetUser)){
                setEmail(dataGetUser.email);
                setUserName(dataGetUser.username);
                setRole(dataGetUser.role);
                setImage("");
                if(dataGetUser.image){
                    setPreviewImage(`data:image/jpeg;base64,${dataGetUser.image}`);
                }
            }
        },[dataGetUser]);

        const handleUpLoadImage = (event) => {
            if (event.target && event.target.files && event.target.files[0]) {
                setPreviewImage(URL.createObjectURL(event.target.files[0]));
                setImage(event.target.files[0]);
            } else {
                setPreviewImage("");
            }
        }

        // console.log("check data", dataGetUser);
        return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    size='xl'
                    backdrop="static"
                    className='modal-add-user'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Show a User : {username}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email"
                                    className="form-control"
                                    disabled
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input type="password"
                                    disabled
                                    className="form-control"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    autocomplete="current-password"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Usser Name</label>
                                <input type="text"
                                    disabled
                                    className="form-control"
                                    value={username}
                                    onChange={(event) => setUserName(event.target.value)}
                                />

                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Role</label>
                                <select className="form-select" disabled value={role} onChange={(event) => setRole(event.target.value)}>
                                    <option defaultValue="option1" value="USER">User</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                            <div className='col-md-12'>
                                <label className='form-label label-upload' htmlFor='labelUpload'>
                                    <FcPlus /> Upload File Image
                                </label>
                                <input type='file'
                                    id='labelUpload'
                                    hidden
                                    onChange={(event) => handleUpLoadImage(event)}

                                />
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span>Preview Image</span>
                                }
                                {/* <label className="form-label">Img</label> */}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

export default ModalShowViewUser    ;