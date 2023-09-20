import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/UserProvider';

const initialValue = {
  email: '',
  password: '',
};
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState({});
  const { setloginStatus } = useAuth();

  const validation = () => {
    let error = {};
    if (!user.email) {
      setError({ ...error, email: '@email is required' });
      return false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      setError({ ...error, email: '@enter valid Email' });
      return false;
    }

    // var lowerCase = /[a-z]/g;
    // var upperCase = /[A-Z]/g;
    // var numbers = /[0-9]/g;
    // if (!user.password.match(lowerCase)) {
    //   setError('Password should contains lowercase letters!');
    //   return false;
    // } else if (!user.password.match(upperCase)) {
    //   setError('Password should contain uppercase letters!');
    //   return false;
    // } else if (!user.password.match(numbers)) {
    //   setError('Password should contains numbers also!');
    //   return false;
    // } else if (user.password.length < 10) {
    //   setError('Password length should be more than 10.');
    //   return false;
    // }

    if (!user.password) {
      setError({ ...error, password: '@password is required' });
      return false;
    } else if (user.password.length > 3 && user.password.length < 8) {
      setError({ ...error, password: '@enter 4-7 digit password' });
      return false;
    }
    return true;
  };

  let name, value;
  const postUserData = e => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const submitInfo = e => {
    e.preventDefault();
    let ErrorList = validation();
    if (!validation()) {
      return;
    }
    setError(ErrorList);
    let logindata = {
      email: user.email,
      password: user.password,
    };
    console.log(logindata);
    setloginStatus(true);
    navigate('/');
  };

  return (
    <div style={{ marginLeft: '20rem', width: '100%', height: '100vh' }}>
      <div className="col-md-6 p-5 ">
        <div className="card" style={{ margin: 'auto' }}>
          <div className="card-header">Login </div>
          <div className="card-body">
            <form onSubmit={e => submitInfo(e)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="text" name="email" className="form-control" onChange={e => postUserData(e)} />
                <span style={{ color: 'red' }}>{error.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
                <input type="password" name="password" className="form-control" onChange={e => postUserData(e)} />
                <span style={{ color: 'red' }}>{error.password}</span>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" style={{ marginRight: '500px', margin: 'auto' }}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
