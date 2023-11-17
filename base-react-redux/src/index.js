import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Users from './components/Users/Users';
import Admin from './components/Admin/Admin';
import Homepage from './components/Home/Homepage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>

          <Route index element={<Homepage />}></Route>
          <Route path='users' element={<Users />}></Route>
          <Route path='admin' element={<Admin />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
