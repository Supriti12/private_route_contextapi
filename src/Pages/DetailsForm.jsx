import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailsForm.css';
import 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../Context/UserProvider';
import { db } from '../Firebase';
import { toast } from 'react-toastify';

const DetailsForm = () => {
  const navigate = useNavigate();
  const { data, setData } = useAuth();
  const initData = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    gender: 'male',
    categories: [],
    education: [{ degree: '', branch: '', college: '' }],
  };
  const [formData, setFormData] = useState(initData);

  console.log('formDatadd', formData);

  const handleChangeForm = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [error, setError] = useState({});
  // const [image, setImage] = useState([]);

  const validation = () => {
    const error = {};
    if (!formData.firstname) {
      setError({ ...error, firstname: '@firstname is required' });
      return false;
    }
    if (!formData.lastname) {
      setError({ ...error, lastname: '@lastname is required' });
      return false;
    }
    if (!formData.email) {
      setError({ ...error, email: '@email is required' });
      return false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      setError({ ...error, email: '@enter valid Email' });
      return false;
    }
    if (!formData.phone) {
      setError({ ...error, phone: '@enter valid phone' });
      return false;
    }
    if (!formData.address) {
      setError({ ...error, address: '@enter valid address' });
      return false;
    }
    if (!formData.gender) {
      setError({ ...error, gender: '@enter valid gender' });
      return false;
    }
    // if (!formData.categories.isrequired) {
    //   setError({ ...error, categories: '@enter valid categories' });
    //   return false;
    // }
    // if (!formData.education.degree.isrequired) {
    //   setError({ ...error, degree: '@enter valid degree' });
    //   return false;
    // }
    return true;
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index][name] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    // console.log("chechkk",name,checked)
    const updatedCategories = checked
      ? [...formData.categories, name]
      : formData.categories.filter(category => category !== name);
    setFormData({ ...formData, categories: updatedCategories });
  };

  const addEducationField = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', branch: '', college: '' }],
    });
  };

  const removeEducationField = index => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let errorlist = validation();
    if (!validation()) {
      toast.error('Please fill all fields');
      return;
    }
    setError(errorlist);
    const docRef = await addDoc(collection(db, 'users'), {
      ...formData,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      categories: formData.categories,
      // education: [
      //   {
      //     degree: formData.education.degree,
      //     branch: formData.education.branch,
      //     college: formData.education.college,
      //   },
      // ],
      // degree: formData.education.degree,
      // branch: formData.education.branch,
      // college: formData.education.college,
    });

    setData([...data, formData]);
    // console.log(data, 'Data');
    navigate('/display');
  };
  console.log(data, 'jhkl');

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="Details-container">
          <div className="general-info">
            <div className="row">
              <div className="col-md-5">
                <label>Firstname:</label>
                <input type="text" name="firstname" value={formData.firstname} onChange={e => handleChangeForm(e)} />
                <span style={{ color: 'yellow' }}>{error.firstname}</span>
              </div>
              <div className="col-md-5">
                <label>Lastname:</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={e => handleChangeForm(e)} />
                <span style={{ color: 'yellow' }}>{error.lastname}</span>
              </div>
            </div>
          </div>
          <div className="general-info">
            <div className="row">
              <div className="col-md-5">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={e => handleChangeForm(e)} />
                <span style={{ color: 'yellow' }}>{error.email}</span>
              </div>
              <div className="col-md-5">
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={e => handleChangeForm(e)} />
                <span style={{ color: 'yellow' }}>{error.phone}</span>
              </div>
            </div>
          </div>
          <div className="general-info">
            <div className="col-md-9" style={{ marginLeft: '12px',paddingTop:"1px",marginBottom:"20px" }}>
              <div className="row">
                {/* <div className="col-ml-12"> */}
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={e => handleChangeForm(e)} />
                <span style={{ color: 'yellow' }}>{error.address}</span>
              </div>
            </div>
            {/* <div className="col-md-5"> */}
            <div className="row">
              <div className="col-md-5">
                <label>Gender:</label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={e => handleChangeForm(e)}
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={e => handleChangeForm(e)}
                  />
                  Female
                </label>
                <span style={{ color: 'yellow' }}>{error.gender}</span>
              </div>
            </div>
            <div className="col-md-5">
              <label>Categories:</label>

              <label>
                <input
                  type="checkbox"
                  name="frontend"
                  checked={formData.categories.includes('frontend')}
                  onChange={handleCheckboxChange}
                />
                Frontend
              </label>
              <label>
                <input
                  type="checkbox"
                  name="backend"
                  checked={formData.categories.includes('backend')}
                  onChange={handleCheckboxChange}
                />
                Backend
              </label>
            </div>
          </div>

          <button type="button" className="submit" onClick={addEducationField}>
            +
          </button>
          {formData.education.map((edu, index) => (
            <div className="Education-Details">
              <label style={{ marginLeft: '12rem', paddingTop: '10px', paddingBottom: '10px' }}>
                Education Details:
              </label>
              <div key={index}>
                <div className="edu">
                  <label>Degree: </label>
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={e => handleInputChange(e, index)}
                    placeholder="Enter your Degree"
                  />
                </div>

                <div className="edu">
                  <label>Branch: </label>
                  <input
                    type="text"
                    name="branch"
                    value={edu.branch}
                    onChange={e => handleInputChange(e, index)}
                    placeholder="Enter your Branch"
                  />
                </div>

                <div className="edu">
                  <label>College: </label>
                  <input
                    type="text"
                    name="college"
                    value={edu.college}
                    onChange={e => handleInputChange(e, index)}
                    placeholder="Enter your College"
                  />
                </div>
              </div>
              {formData.education.length > 1 && (
                <button type="button" className="submit" onClick={() => removeEducationField(index)}>
                  -
                </button>
              )}
              <div style={{ marginLeft: '12rem' }}></div>
            </div>
          ))}
          {/* <label>Image:</label>
          <input type="file" name="image" onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} /> */}

          <div style={{ paddingLeft: '14rem' }}>
            <button className="submit" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
