import { useState } from "react";
import "./ManageQuiz.scss";
import Select from 'react-select';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null)

    const handleChangeFile = (event) => {

    }
    return (
        <div className="quiz-container">
            <div className="title">
                ManageQuizzes
            </div>
            <hr></hr>
            <div className="add-new">


                <form action="/action_page.php">
                    <fieldset className="border rounded-3 p-3"  >
                        <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="your quiz name ..."
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label>Name</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="desc ..."
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label>Desc</label>
                        </div>
                        <div className="my-3">
                            <Select
                                value={type}
                                // onChange={this.handleChange}
                                options={options}
                                placeholder={'Quiz type ...'}
                            />
                        </div>
                        <div className="more-actions form-group">
                            <label className="mb-1">Update Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(event) => handleChangeFile(event)}
                            />
                        </div>
                    </fieldset>
                </form>

            </div>
            <div className="list-detail">
                Table
            </div>
        </div>
    )
}
export default ManageQuiz;