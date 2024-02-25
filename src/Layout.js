import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/User/Quiz/MangageQuiz";
import Questions from "./components/Admin/Questions/Questions";
import Test2 from "./components/routes/Test2";
import Test1 from "./components/routes/Test1";
import PrivateRoute from "./components/routes/PrivateRoute";
import {Suspense} from "react";

const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404. Not found data with  your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loaing</div>}>
            <Routes>
                <Route path='' element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='users' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    }></Route>
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />}></Route>
                <Route path='admins' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }>
                    <Route path='manage-users' element={<ManageUser />}></Route>
                    <Route path='manage-quizzes' element={<ManageQuiz />}></Route>
                    <Route path='manage-questions' element={<Questions />}></Route>
                    <Route index element={<DashBoard />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/reg' element={<Register />}></Route>
                <Route path='/test' element={<PrivateRoute />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Suspense>
    )
}
export default Layout;