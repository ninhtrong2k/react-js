import { useState, useEffect } from "react";
import Select from "react-select";
import { getAllQuizForAdmin,getAllUsers } from "../../../services/apiServices";
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        fetchQuiz();
        fetchUser();
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
    const fetchUser = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.username}-${item.email}`
                }
            })
            setListUser(users);
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group' >
                <label>Select Quiz</label>
                <Select
                    defaultdefaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                // className='form-control'
                />
            </div>
            <div className='col-6 form-group' >
                <label>Select USer</label>
                <Select
                    defaultdefaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                // className='form-control'
                />
            </div>
            <div>
                <button className="btn btn-warning mt-3">Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz;