import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FaPlus, FaMinusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import _, { create } from 'lodash';
import { type } from '@testing-library/user-event/dist/type';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateAnswerNewForQuiz,
    getQuizWithQA,
    postUpsertQA
} from "../../../services/apiServices";
import { toast } from 'react-toastify';


const QuizQA = (props) => {
    const initQuestions = [
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
    const [questions, setQuestion] = useState(initQuestions)
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([

    ]);
    console.log("selctQuiz", selectedQuiz);
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }
    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetQuizWithQA();
        }
    }, [selectedQuiz])

    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        )
    }
    const fetQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            // convert base 64 to file oj
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                newQA.push(q);
            }
            setQuestion(newQA)
            console.log(">>> check newQA", newQA);
        }
        console.log(">>> check rs", res);
    }
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
    console.log('question', questions, selectedQuiz);
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
    const handleSubmitQuestionForQuiz = async () => {

        // await Promise.all(questions.map(async(question) => {
        //     const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value,question.description,question.imageFile);
        //     await Promise.all(question.answers.map(async(answer) => {
        //         let as = await postCreateAnswerNewForQuiz(
        //             answer.description,answer.isCorrect,q.DT.id
        //         )
        //         console.log('ans',as)
        //     }))
        // }));

        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz");
            return;
        }


        let isValidAnswer = true;
        let indexQuestion = 0; let indexA = 0;
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQuestion = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer${indexA + 1} at Question ${indexQuestion + 1}`)
            return
        }
        let isValidQuestion = true;
        let indexQuestion1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQuestion1 = i;
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty description for Question ${indexQuestion1 + 1}`);
            return;
        }
        // for (const question of questions) {
        //     const q = await postCreateNewQuestionForQuiz(
        //         +selectedQuiz.value, question.description, question.imageFile
        //     )
        //     for (const answer of question.answers) {
        //         await postCreateAnswerNewForQuiz(
        //             answer.description, answer.isCorrect, q.DT.id
        //         )
        //     }
        // }
        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });
        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetQuizWithQA();

        }
        console.log("res question", res);
        // toast.success('Create question and awsers success !');
        // setQuestion(initQuestions);

        // submit question 

        // submit answers
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName,
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
                <div className='col-6 form-group' >
                    <label>Select Quiz</label>
                    <Select
                        defaultdefaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        styles={{
                            // Fixes the overlapping problem of the component
                            menu: provided => ({ ...provided, zIndex: 9999 })
                        }}
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


export default QuizQA;