import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { putUpdateUser } from '../../../services/apiServices';
import _ from 'lodash';




const ModalUpdateUser
    = (props) => {
        const { show, setShow, dataUpdate } = props;
        // const [show, setShow] = useState(false);

        const handleClose = () => {
            setShow(false)
            setEmail("");
            setPassword("");
            setUserName("");
            setRole("ADMIN");
            setImage("");
            setPreviewImage("");
            props.restUpdateData();
        };
        const handleShow = () => setShow(true);

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUserName] = useState("");
        const [role, setRole] = useState("USER");
        const [image, setImage] = useState("");
        const [previewImage, setPreviewImage] = useState("");

        useEffect(() => {
            console.log("effct",dataUpdate );
            if(!_.isEmpty(dataUpdate)){
                setEmail(dataUpdate.email);
                setUserName(dataUpdate.username);
                setRole(dataUpdate.role);
                setImage("");
                if(dataUpdate.image){
                    setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
                }
            }
        },[dataUpdate]);

        const handleUpLoadImage = (event) => {
            if (event.target && event.target.files && event.target.files[0]) {
                setPreviewImage(URL.createObjectURL(event.target.files[0]));
                setImage(event.target.files[0]);
            } else {
                setPreviewImage("");
            }
            // console.log("upload files", event.target.files[0]);
        }

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        const handleSubmitCreateUser = async () => {
            // let data = {
            //     email: email,
            //     password: password,
            //     username: username,
            //     role: role,
            //     userImage: image,
            // }
            // console.log(data)
            const isValidateEmail = validateEmail(email);
            if (!isValidateEmail) {
                toast.error("Invalid email");
                return;

            }
            // const FormData = require('form-data');
            let data = await putUpdateUser(dataUpdate.id, username, role, image);
            // console.log("comboden",data)
            if (data && data.EC === 0) {
                toast.success(data.EM);
                handleClose();
                await props.fetchListUsers();
            };
            if (data && data.EC !== 0) {
                toast.error(data.EM)
            }

        }

        console.log("check data", dataUpdate);
        return (
            <>
                {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

                <Modal
                    show={show}
                    onHide={handleClose}
                    size='xl'
                    backdrop="static"
                    className='modal-add-user'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update a User</Modal.Title>
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
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input type="password"
                                    disabled
                                    className="form-control"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Usser Name</label>
                                <input type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(event) => setUserName(event.target.value)}
                                />

                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Role</label>
                                <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                    <option selected value="USER">User</option>
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
                        <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

export default ModalUpdateUser
    ;