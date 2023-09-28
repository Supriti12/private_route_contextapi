import React, { useState } from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/UserProvider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

 const initialvalues={
  name:"",
  email:"",
  password:"",
  date:''
 }

const Contact = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user,setUser]=useState(initialvalues)
  const {contactUser,setContactUser}=useAuth()
  const navigate=useNavigate();

  const day = moment().format('MMMM DD YYYY');
  const time = moment().format('HH mm ss');


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setUser(initialvalues)
  }

  const postUserData=(e)=>{
    let name,value;
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value})
  }

  const SubmitInfo=(e)=>{
    e.preventDefault()
    let data={
      name:user.name,
      email:user.email,
      password:user.password,
      date:user.date
    }
     setContactUser([...contactUser, user]);
     setIsOpen(false);
     setUser(initialvalues);
    // console.log(data)
    
  }
  const card = (
    <>
      {contactUser?.map(users => {
        return (
          <>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                {users.name}
              </Typography>
              <Typography variant="h6" component="div">
                {users.email}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {users.password}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {users.date}
              </Typography>
            </CardContent>
            <div>
              <p> Today's date is {day} </p>
              <p> The time is {time} </p>
            </div>
          </>
        );
      })}
    </>
  );
  return (
    <>
      <button className="button" onClick={openModal}>
        Open Modal
      </button>

      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h2 ref={_subtitle => (subtitle = _subtitle)} style={{ marginLeft: '3rem' }}>
            Hello User
          </h2>

          <button className="button" onClick={closeModal}>
            close
          </button>
        </div>

        <form onSubmit={SubmitInfo}>
          <div className="general-info" style={{ paddingTop: '2rem' }}>
            <div>
              <label>Name:</label>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={e => postUserData(e)}
            />
          </div>
          <div className="general-info">
            <div>
              <label>Email:</label>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={e => postUserData(e)}
            />
          </div>
          <div className="general-info">
            <div>
              <label>Password:</label>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={e => postUserData(e)}
            />
          </div>
          <div className="general-info">
            <div>
              <label>Date:</label>
            </div>
            <input
              type="date"
              name="date"
              placeholder="Enter your date"
              value={user.date}
              onChange={e => postUserData(e)}
            />
           {/* moment().format('MMMM Do YYYY, h:mm:ss a') */}
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Contact

