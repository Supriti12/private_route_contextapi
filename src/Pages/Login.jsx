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
  const { setloginStatus } = useAuth();

  let name, value;
  const postUserData = e => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const submitInfo = e => {
    e.preventDefault();
    let logindata = {
      email: user.email,
      password: user.password,
    };
    console.log(logindata);
    setloginStatus(true);
    navigate('/');
  };

  return (
    <div style={{ marginLeft: '400px' }}>
      <div className="col-md-7 mt-5">
        <div className="card">
          <div className="card-header">Login </div>
          <div className="card-body">
            <form onSubmit={e => submitInfo(e)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" name="email" className="form-control" onChange={e => postUserData(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
                <input type="password" name="password" className="form-control" onChange={e => postUserData(e)} />
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
