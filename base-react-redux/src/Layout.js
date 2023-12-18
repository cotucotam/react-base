import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Users from './components/Users/Users';
import Admin from './components/Admin/Admin';
import Homepage from './components/Home/Homepage';
import ManageUser from './components/Admin/ManageUser';
import DashBoard from './components/Admin/DashBoard';
import Login from './Auth/Login';
import App from './App';
import Register from './Auth/Register';
import ListQuiz from './components/Users/ListQuiz';
import DetailQuiz from './components/Users/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
const NotFound = () => {
    return (
        <div className='alert alert-danger container mt-3 '>
            404 Not Found
        </div>
    )
}
const Layout = (props) => {
    return (
        <>

            <Routes>
                <Route path='/' element={<App />}>

                    <Route index element={<Homepage />}></Route>
                    <Route path='users' element={<ListQuiz />}></Route>
                    <Route path='/quiz/:id' element={<DetailQuiz />}></Route>


                </Route>
                <Route path='admin' element={<Admin />}>
                    <Route index element={<DashBoard />}></Route>
                    <Route path='manage-user' element={<ManageUser />}></Route>
                    <Route path='manage-quiz' element={<ManageQuiz />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>


        </>
    );
};

export default Layout;