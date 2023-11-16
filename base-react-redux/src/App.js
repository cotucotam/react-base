import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponents from './components/MyComponents';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div>
        Test Link
        <div>
          <button>
            <Link to="/users">Go to Users</Link>
          </button>
          <button>
            <Link to="/admin">Go to Admin</Link>
          </button>
        </div>
      </div>
    </div>
  )
}


export default App;
