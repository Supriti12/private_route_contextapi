// import React, { useState } from 'react';
// import './DetailsForm.css';
// import { Link } from 'react-router-dom';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../Firebase';

// const DetailsForm = () => {
//   // const [formdata, setFormdata] = useState({ degree: '', college: '', branch: '' });
//   const [formarray, setFormarray] = useState([{ degree: '', college: '', branch: '' }]);
//   const initialvalues = {
//     firstname: '',
//     lastname: '',
//     email: '',
//     phone: '',
//     address: '',
//     // degree: '',
//     // college: '',
//     // branch: '',
//     gender: '',
//     catagory: '',
//   };
//   const [user, setUser] = useState(initialvalues);
//   const [error, setError] = useState('');

//   let name, value;
//   const postUserData = e => {
//     name = e.target.name;
//     value = e.target.value;
//     setUser({ ...user, [name]: value });
//   };

//   // console.log('formdata', formarray);
//   let handleChange = (i, e) => {
//     let newFormdata = [...formarray];
//     newFormdata[i][e.target.name] = e.target.value;
//     setFormarray(newFormdata);
//   };

//   const addFormFields = () => {
//     setFormarray([...formarray, { degree: '', college: '', branch: '' }]);
//   };

//   // let handleSubmit = e => {
//   //   e.preventDefault();
//   //   alert(JSON.stringify(formarray));
//   // };

//   let removeFormFields = i => {
//     let newFormValues = [...formarray];
//     newFormValues.splice(i, 1);
//     setFormarray(newFormValues);
//   };
//   console.log(user);

//   const submitInfo = async e => {
//     e.preventDefault();
//     const docRef = await addDoc(collection(db, 'users'), {});
//   };

//   console.log('formarray', formarray);
//   return (
//     <div style={{ marginLeft: '20rem', width: '100%', height: '100vh' }}>
//       <form>
//         <div className="Details-container">
//           <div className="General-Details">
//             <div>
//               <label>FirstName:</label>
//               <input
//                 type="text"
//                 placeholder="Enter your First Name"
//                 onChange={e => postUserData(e)}
//                 autoFocus
//                 name=""
//               />

//               <label>LastName:</label>
//               <input type="text" placeholder="Enter your Last name" onChange={e => postUserData(e)} />
//             </div>
//             <div>
//               <label>Email:</label>
//               <input type="email" placeholder="Enter your Email" onChange={e => postUserData(e)} />
//               <label>Phone:</label>
//               <input type="number" placeholder="Enter your Number" onChange={e => postUserData(e)} />
//             </div>
//             <div>
//               <label>Address:</label>
//               <textarea type="address" placeholder="Enter your Address" onChange={e => postUserData(e)} />
//             </div>
//             <div>
//               <label>Gender:</label>
//               <input type="radio" value="Male" name="gender" checked /> Male
//               <input type="radio" value="Female" name="gender" /> Female
//               <input type="radio" value="Other" name="gender" /> Other
//             </div>
//             <div>
//               <label>Technology Catagory:</label>
//               <input type="checkbox" value="Backend" name="catagory" onChange={e => postUserData(e)} />
//               Backend
//               <input type="checkbox" value="Frontend" name="catagory" onChange={e => postUserData(e)} />
//               Frontend
//             </div>
//           </div>

//           {formarray?.map((data, index) => {
//             return (
//               <>
//                 <div className="Education-Details" key={index}>
//                   <div>
//                     <label>Degree:</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your degree"
//                       name={`degree_${index}`}
//                       value={data.degree}
//                       onChange={e => {
//                         setFormarray(prev => {
//                           console.log(prev);
//                           prev[index].degree = e.target.value;

//                           return JSON.parse(JSON.stringify(prev));
//                         });
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label>College:</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your College name"
//                       name="college"
//                       // value={data.college}
//                       onChange={e => {
//                         setFormarray(prev => {
//                           console.log(prev);
//                           prev[index].college = e.target.value;

//                           return prev;
//                         });
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label>Branch:</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your Branch name"
//                       name="branch"
//                       // value={data.branch}
//                       onChange={e => {
//                         setFormarray(prev => {
//                           console.log(prev);
//                           prev[index].branch = e.target.value;

//                           return prev;
//                         });
//                       }}
//                     />
//                   </div>
//                   <div>
//                     {/* <button className="button add" type="button" onClick={() => addFormFields()}>
//                       +
//                     </button> */}
//                     {index ? (
//                       <button type="button" className="button remove" onClick={() => removeFormFields(index)}>
//                         -
//                       </button>
//                     ) : null}
//                     {/* <button className="button remove" type="button" onClick={() => removeFormFields()}>
//                       -
//                     </button> */}
//                   </div>
//                 </div>
//               </>
//             );
//           })}
//           <button className="button add" type="button" onClick={() => addFormFields()}>
//             +
//           </button>
//         </div>
//         <div>
//           <button type="submit" onClick={submitInfo} className="btn btn-success">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DetailsForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailsForm.css';
import 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../Context/UserProvider';
import { db } from '../Firebase';

const DetailsForm = () => {
  const navigate = useNavigate();
  const { data, setData } = useAuth();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    gender: 'male',
    categories: [],
    education: [{ degree: '', branch: '', college: '' }],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index][name] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
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
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={e => setFormData({ ...formData, firstname: e.target.value })}
                />
              </div>
              <div className="col-md-5">
                <label>Lastname:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={e => setFormData({ ...formData, lastname: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="general-info">
            <div className="row">
              <div className="col-md-5">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="col-md-5">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="general-info">
            <div className="row">
              <div className="col-ml-12">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="row">
                <label>Gender:</label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  />
                  Female
                </label>
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
          {/* </div> */}

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
