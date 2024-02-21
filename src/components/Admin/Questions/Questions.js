import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FaPlus, FaMinusCircle } from "react-icons/fa";


const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    // className='form-control'
                    />
                </div>
                <div className='mt-3'>
                    Add Questions
                </div>
                <div>
                    <div className='questions-content'>
                        <div className="form-floating description">
                            <input type="password" className="form-control" placeholder="Password" />
                            <label for="floatingPassword">Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Update Image</label>
                            <input type={'file'} hidden />
                            <span>0 File is upload</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <AiOutlinePlusCircle className='icon-add' />
                            </span>
                            <span>
                                <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                    <div className='answers-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name">
                            <input type="password" className="form-control" placeholder="Password" />
                            <label for="floatingPassword">Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <FaPlus className='icon-add' />
                            </span>
                            <span>
                                <FaMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;