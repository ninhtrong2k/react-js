import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FaPlus, FaMinusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { type } from '@testing-library/user-event/dist/type';
import Lightbox from "react-awesome-lightbox";


const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestion] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title : '',
        url: ''
    })
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
            setQuestion([...questions, newQuestion]);

        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);

            // Lọc bằng hàm fiter ví dụ id truyền vào là 1 , trong mảng cũng có thằng đó là 1 thì loại bỏ nó đi 
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestion(questionsClone);
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        console.log(answerId);
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestion(questionsClone);

        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            // Lọc fiter dữ lại cái id khác với cái id bạn truyền vào 
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestion(questionsClone);
        }
    }
    console.log('question', questions);
    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestion(questionsClone);
            }
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestion(questionsClone);
        }
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            })
            setQuestion(questionsClone);
        }
    }
    const handleSubmitQuestionForQuiz = () => {
        console.log(questions)
    }
    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if(index > -1){
            setDataImagePreview({
                url:URL.createObjectURL(questionsClone[index].imageFile), 
                title:questionsClone[index].imageName, 
            })
            setIsPreviewImage(true);
        }
    }
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz</label>
                    <Select
                        defaultdefaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    // className='form-control'
                    />
                </div>
                <div className='mt-3'>
                    Add Questions
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Password"
                                            defaultValue={question.description}
                                            onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Questions {index + 1} 's Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`} className='label-upload'>Update Image</label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            type={'file'}
                                            hidden
                                        />
                                        <span>
                                            {question.imageName ?
                                                <span onClick={() => handlePreviewImage(question.id)} > {question.imageName}</span>
                                                : '0 File is upload'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <AiOutlinePlusCircle className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <AiOutlineMinusCircle className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                    return (
                                        <div key={answer.id} className='answers-content'>
                                            <input
                                                className="form-check-input iscorrect"
                                                type="checkbox"
                                                checked={answer.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input
                                                    defaultValue={answer.description}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                />
                                                <label htmlFor="floatingPassword">Answer {index + 1}</label>
                                            </div>
                                            <div className='btn-group'>
                                                <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                    <FaPlus className='icon-add' />
                                                </span>
                                                {question.answers.length > 1 &&
                                                    <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                        <FaMinusCircle className='icon-remove' />
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-warning'>
                            Save Questions
                        </button>
                    </div>
                }
                                                {isPreviewImage === true &&
                                    <Lightbox
                                        image={dataImagePreview.url}
                                        title={dataImagePreview.title}
                                        onClose={() => setIsPreviewImage(false)}
                                    ></Lightbox>
                                }
            </div>
        </div>
    )
}


export default Questions;