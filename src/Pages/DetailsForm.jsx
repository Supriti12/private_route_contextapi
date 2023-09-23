import React, { useState } from 'react';
import './DetailsForm.css';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const DetailsForm = () => {
  // const [formdata, setFormdata] = useState({ degree: '', college: '', branch: '' });
  const [formarray, setFormarray] = useState([{ degree: '', college: '', branch: '' }]);
  const initialvalues = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    // degree: '',
    // college: '',
    // branch: '',
    gender: '',
    catagory: '',
  };
  const [user, setUser] = useState(initialvalues);
  const [error, setError] = useState('');

  let name, value;
  const postUserData = e => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // console.log('formdata', formarray);
  let handleChange = (i, e) => {
    let newFormdata = [...formarray];
    newFormdata[i][e.target.name] = e.target.value;
    setFormarray(newFormdata);
  };

  const addFormFields = () => {
    setFormarray([...formarray, { degree: '', college: '', branch: '' }]);
  };

  // let handleSubmit = e => {
  //   e.preventDefault();
  //   alert(JSON.stringify(formarray));
  // };

  let removeFormFields = i => {
    let newFormValues = [...formarray];
    newFormValues.splice(i, 1);
    setFormarray(newFormValues);
  };
  console.log(user);

  const submitInfo = async e => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'users'), {});
  };

  console.log('formarray', formarray);
  return (
    <div style={{ marginLeft: '20rem', width: '100%', height: '100vh' }}>
      <form>
        <div className="Details-container">
          <div className="General-Details">
            <div>
              <label>FirstName:</label>
              <input
                type="text"
                placeholder="Enter your First Name"
                onChange={e => postUserData(e)}
                autoFocus
                name=""
              />

              <label>LastName:</label>
              <input type="text" placeholder="Enter your Last name" onChange={e => postUserData(e)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" placeholder="Enter your Email" onChange={e => postUserData(e)} />
              <label>Phone:</label>
              <input type="number" placeholder="Enter your Number" onChange={e => postUserData(e)} />
            </div>
            <div>
              <label>Address:</label>
              <textarea type="address" placeholder="Enter your Address" onChange={e => postUserData(e)} />
            </div>
            <div>
              <label>Gender:</label>
              <input type="radio" value="Male" name="gender" checked /> Male
              <input type="radio" value="Female" name="gender" /> Female
              <input type="radio" value="Other" name="gender" /> Other
            </div>
            <div>
              <label>Technology Catagory:</label>
              <input type="checkbox" value="Backend" name="catagory" onChange={e => postUserData(e)} />
              Backend
              <input type="checkbox" value="Frontend" name="catagory" onChange={e => postUserData(e)} />
              Frontend
            </div>
          </div>

          {formarray?.map((data, index) => {
            return (
              <>
                <div className="Education-Details" key={index}>
                  <div>
                    <label>Degree:</label>
                    <input
                      type="text"
                      placeholder="Enter your degree"
                      name={`degree_${index}`}
                      // value={data.degree}
                      onChange={e => {
                        setFormarray(prev => {
                          console.log(prev);
                          prev[index].degree = e.target.value;

                          return prev;
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label>College:</label>
                    <input
                      type="text"
                      placeholder="Enter your College name"
                      name="college"
                      // value={data.college}
                      onChange={e => {
                        setFormarray(prev => {
                          console.log(prev);
                          prev[index].college = e.target.value;

                          return prev;
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label>Branch:</label>
                    <input
                      type="text"
                      placeholder="Enter your Branch name"
                      name="branch"
                      // value={data.branch}
                      onChange={e => {
                        setFormarray(prev => {
                          console.log(prev);
                          prev[index].branch = e.target.value;

                          return prev;
                        });
                      }}
                    />
                  </div>
                  <div>
                    {/* <button className="button add" type="button" onClick={() => addFormFields()}>
                      +
                    </button> */}
                    {index ? (
                      <button type="button" className="button remove" onClick={() => removeFormFields(index)}>
                        -
                      </button>
                    ) : null}
                    {/* <button className="button remove" type="button" onClick={() => removeFormFields()}>
                      -
                    </button> */}
                  </div>
                </div>
              </>
            );
          })}
          <button className="button add" type="button" onClick={() => addFormFields()}>
            +
          </button>
        </div>
        <div>
          <button type="submit" onClick={submitInfo} className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
